import { UserRegisterDto } from '../dto/User.dto';
import { UserModel } from '../model/User.model';
import { Transaction } from 'sequelize/types/transaction';

export interface IUserRepository {
  create(user: UserRegisterDto, transaction?: Transaction): Promise<UserModel>;

  findAll(): Promise<UserModel[]>;

  findById(id: string): Promise<UserModel>;

  update(condition: any, dataUpdate: any): Promise<[affectedCount: number]>;

  findUserWithCondition(condition: any): Promise<UserModel>;
}

export const IUserRepository = Symbol('IUserRepository');
