import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './Auth.service.interface';
import { IUserRepository } from 'src/modules/user/repository/User.interface.repository';
import { UserRegisterDto } from 'src/modules/user/dto/User.dto';
import { Op } from 'sequelize';
import { comparePassword, hashingPassword, verifyPhoneNumber } from '../../../common/utils';
import { UserModel } from 'src/modules/user/model/User.model';
import { JwtService } from '@nestjs/jwt';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';
import { IWalletRepository } from '../../wallet/repository/Wallet.interface.repository';
import { Transaction } from 'sequelize/types/transaction';
import { ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto } from '../dto/auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { IRedisService } from '../../redis/service/redis.service.interface';
import { EXP_TIME_TOKEN_FORGOT_PASSWORD } from '../enum/Auth.enum';
import { getKeyRedisByType } from '../../../common/redis.util';
import { TypeOfKey } from '../../redis/enum/redis.enum';
import { IEmailService } from '../../email/service/Email.service.interface';
import * as process from 'process';

@Injectable()
export class AuthServiceImplementation implements IAuthService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IWalletRepository)
    private readonly walletRepository: IWalletRepository,
    @Inject(IRedisService)
    private readonly redisService: IRedisService,
    @Inject(IEmailService)
    private readonly emailService: IEmailService,
    private jwtService: JwtService,
  ) {}

  async register(payload: UserRegisterDto, transaction?: Transaction): Promise<UserModel> {
    const { username, phone_number, password, email } = payload;
    const { isExistedPhoneNumber, isExistedUsername, isExistedEmail } = await this.checkUserExisted(
      username,
      email,
      phone_number,
    );
    if (isExistedPhoneNumber && isExistedUsername && isExistedEmail) {
      throw new BaseError(ERROR_CODE.EXISTED_USER, STATUS_CODE.BAD_REQUEST);
    }
    if (isExistedPhoneNumber) {
      throw new BaseError(ERROR_CODE.EXISTED_PHONE, STATUS_CODE.BAD_REQUEST);
    }
    if (isExistedUsername) {
      throw new BaseError(ERROR_CODE.EXISTED_USERNAME, STATUS_CODE.BAD_REQUEST);
    }
    if (isExistedEmail) {
      throw new BaseError(ERROR_CODE.EXISTED_EMAIL, STATUS_CODE.BAD_REQUEST);
    }

    const isValidPhoneNumber = verifyPhoneNumber(phone_number);
    if (!isValidPhoneNumber) {
      throw new BaseError(ERROR_CODE.INVALID_PHONE, STATUS_CODE.BAD_REQUEST);
    }

    const hashedPassword = await hashingPassword(password);
    payload.password = hashedPassword;

    const expectedUser = await this.userRepository.create(payload, transaction);
    if (!expectedUser) {
      throw new BaseError(ERROR_CODE.CANNOT_CREATE_USER, STATUS_CODE.BAD_REQUEST);
    }

    const expectedWallet = await this.walletRepository.create(expectedUser.id, transaction);
    if (!expectedWallet) {
      throw new BaseError(ERROR_CODE.CANNOT_CREATE_WALLET, STATUS_CODE.BAD_REQUEST);
    }

    await transaction.commit();

    return expectedUser;
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findUserWithCondition({ username });
    if (!user) {
      throw new BaseError(ERROR_CODE.USER_NOT_FOUND, STATUS_CODE.UNAUTHORIZED, 'Invalid username');
    }
    const { password: passwordHashed, email } = user;
    const isMatchPassword = await comparePassword(password, passwordHashed);
    if (!isMatchPassword) {
      throw new BaseError(ERROR_CODE.INVALID_PASSWORD, STATUS_CODE.UNAUTHORIZED);
    }

    const payload = { username: user.username, email, role: user.role, id: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async checkUserExisted(username: string, email: string, phone_number: string): Promise<any> {
    let isExistedPhoneNumber = false;
    let isExistedEmail = false;
    let isExistedUsername = false;

    const condition = {
      [Op.or]: [{ username }, { email }, { phone_number }],
    };
    const user = await this.userRepository.findUserWithCondition(condition);
    if (!user) {
      return { isExistedPhoneNumber, isExistedUsername, isExistedEmail };
    }

    if (user.phone_number === phone_number) {
      isExistedPhoneNumber = true;
    }
    if (user.username === username) {
      isExistedUsername = true;
    }
    if (user.email === email) {
      isExistedEmail = true;
    }
    return { isExistedPhoneNumber, isExistedUsername, isExistedEmail };
  }

  async forgotPassword(payload: ForgotPasswordDto): Promise<string> {
    const { email } = payload;
    const userByEmail = await this.userRepository.findUserWithCondition({ email });
    if (!userByEmail) {
      throw new BaseError(ERROR_CODE.USER_NOT_FOUND, STATUS_CODE.BAD_REQUEST);
    }
    const keyOfRedis = getKeyRedisByType(TypeOfKey.FORGOT_PASSWORD, userByEmail.id);
    const valueByKey = await this.redisService.getValueByKey(keyOfRedis);
    if (valueByKey) {
      throw new BaseError(ERROR_CODE.REQUEST_IN_PROGRESS, STATUS_CODE.BAD_REQUEST);
    }
    const tokenForgotPassword = uuidv4();
    const valueKey = {
      email: userByEmail.email,
      token: tokenForgotPassword,
    };
    await this.redisService.setKeyWithExpiration(keyOfRedis, valueKey, EXP_TIME_TOKEN_FORGOT_PASSWORD);
    const emailMessage = {
      to: email,
      subject: 'Forgot password',
      html: `<a href='${process.env.HOST_FRONT_END}/reset-password/${userByEmail.id}?token=${tokenForgotPassword}'>Reset Password</a>`,
    };
    await this.emailService.sendEmail(emailMessage);
    return 'Forgot password success. New password will send to your email';
  }

  async resetPassword(payload: ResetPasswordDto): Promise<string> {
    const { userId, token, newPassword } = payload;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BaseError(ERROR_CODE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const keyOfRedis = getKeyRedisByType(TypeOfKey.FORGOT_PASSWORD, userId);
    const valueByKey = await this.redisService.getValueByKey(keyOfRedis);
    if (!valueByKey) {
      throw new BaseError(ERROR_CODE.RESET_PASSWORD_INVALID_TOKEN, STATUS_CODE.BAD_REQUEST);
    }
    const objValue = JSON.parse(valueByKey);
    if (token !== objValue.token) {
      throw new BaseError(ERROR_CODE.RESET_PASSWORD_INVALID_TOKEN, STATUS_CODE.BAD_REQUEST);
    }
    const hashedPassword = await hashingPassword(newPassword);
    const affectedCount = await this.userRepository.update({ id: userId }, { password: hashedPassword });
    if (affectedCount[0] === 0) {
      throw new BaseError(ERROR_CODE.UPDATE_USER_FAIL, STATUS_CODE.BAD_REQUEST);
    }
    await this.redisService.deleteKey(keyOfRedis);
    return 'Reset password success!';
  }

  async changePassword(userId: string, payload: ChangePasswordDto): Promise<string> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BaseError(ERROR_CODE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const { currentPassword, newPassword } = payload;
    const isMatchPassword = await comparePassword(currentPassword, user.password);
    if (!isMatchPassword) {
      throw new BaseError(ERROR_CODE.INVALID_PASSWORD, STATUS_CODE.UNAUTHORIZED);
    }

    const hashedPassword = await hashingPassword(newPassword);
    const affectedCount = await this.userRepository.update({ id: userId }, { password: hashedPassword });
    if (affectedCount[0] === 0) {
      throw new BaseError(ERROR_CODE.UPDATE_USER_FAIL, STATUS_CODE.BAD_REQUEST);
    }
    return 'Update password success!';
  }
}
