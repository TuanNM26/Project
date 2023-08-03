import { UserModel } from '../model/User.model';
import { UserRegisterDto } from '../dto/User.dto';

export interface IUserService {
  getAll(): Promise<UserModel[]>;

  getDetailUser(id: string): Promise<UserModel>;

  updateUser(id: string, dataUpdate: any): Promise<string>;

  createNewUser(payload: UserRegisterDto): Promise<UserModel>;
}

export const IUserService = Symbol('IUserService');
