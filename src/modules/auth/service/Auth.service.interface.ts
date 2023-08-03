import { UserModel } from 'src/modules/user/model/User.model';
import { ChangePasswordDto, ForgotPasswordDto, RegisterDto, ResetPasswordDto } from '../dto/auth.dto';
import { Transaction } from 'sequelize/types/transaction';

export interface IAuthService {
  register(payload: RegisterDto, transaction?: Transaction): Promise<UserModel>;

  login(username: string, password: string): Promise<any>;

  forgotPassword(payload: ForgotPasswordDto): Promise<string>;

  resetPassword(payload: ResetPasswordDto): Promise<string>;

  changePassword(userId: string, payload: ChangePasswordDto): Promise<string>;
}

export const IAuthService = Symbol('IAuthService');
