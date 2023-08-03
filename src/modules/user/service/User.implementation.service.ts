import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './User.interface.service';
import { IUserRepository } from '../repository/User.interface.repository';
import { UserModel } from '../model/User.model';
import { UserRegisterDto, UserUpdateDto } from '../dto/User.dto';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';

@Injectable()
export class UserServiceImplementation implements IUserService {
  constructor(@Inject(IUserRepository) private userRepository: IUserRepository) {}

  async getAll(): Promise<UserModel[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getDetailUser(id: string): Promise<UserModel> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BaseError(ERROR_CODE.USER_NOT_FOUND, STATUS_CODE.BAD_REQUEST);
    }
    return user;
  }

  async updateUser(id: string, dataUpdate: UserUpdateDto): Promise<string> {
    const affectedCount = await this.userRepository.update({ id }, dataUpdate);
    if (Object.keys(dataUpdate).length === 0) {
      throw new BaseError(ERROR_CODE.INVALID_DATA_UPDATE, STATUS_CODE.BAD_REQUEST);
    }
    if (affectedCount[0] === 0) {
      throw new BaseError(ERROR_CODE.UPDATE_USER_FAIL, STATUS_CODE.BAD_REQUEST);
    }
    return 'Update user info success';
  }

  async createNewUser(payload: UserRegisterDto): Promise<UserModel> {
    const { phone_number } = payload;
    const validPhone = phone_number.length <= 12 || !phone_number.startsWith('0');
    if (!validPhone) {
      throw new BaseError(ERROR_CODE.INVALID_PHONE, STATUS_CODE.BAD_REQUEST);
    }
    const expectedUser = await this.userRepository.create(payload);
    if (!expectedUser) {
      throw new BaseError(ERROR_CODE.CANNOT_CREATE_USER, STATUS_CODE.BAD_REQUEST);
    }
    return expectedUser;
  }
}
