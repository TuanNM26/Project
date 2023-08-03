import { UserModel } from '../model/User.model';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './User.interface.repository';
import { InjectModel } from '@nestjs/sequelize';
import { UserRegisterDto } from '../dto/User.dto';
import { Transaction } from 'sequelize/types/transaction';
import { WalletModel } from '../../wallet/model/Wallet.model';

@Injectable()
export class UserRepositoryImplementation implements IUserRepository {
  constructor(
    @InjectModel(UserModel)
    private user: typeof UserModel,
  ) {}

  async create(user: UserRegisterDto, transaction?: Transaction): Promise<UserModel> {
    return this.user.create(user, { transaction });
  }

  async findAll(): Promise<UserModel[]> {
    return this.user.findAll({ where: { is_deleted: false } });
  }

  async findById(id: string): Promise<UserModel> {
    // SELECT * from users where id = id
    return this.user.findOne({ where: { id }, include: WalletModel });
  }

  async update(condition: any, dataUpdate: any): Promise<[affectedCount: number]> {
    return this.user.update(dataUpdate, { where: condition });
  }

  async findUserWithCondition(condition: any): Promise<UserModel> {
    return this.user.findOne({ where: condition });
  }
}
