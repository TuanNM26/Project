import { Injectable } from '@nestjs/common';
import { IWalletRepository } from './Wallet.interface.repository';
import { InjectModel } from '@nestjs/sequelize';
import { WalletModel } from '../model/Wallet.model';
import { Transaction } from 'sequelize/types/transaction';
import { WalletUpdateDto } from '../dto/Wallet.dto';

@Injectable()
export class WalletRepositoryImplementation implements IWalletRepository {
  constructor(
    @InjectModel(WalletModel)
    private wallet: typeof WalletModel,
  ) {}

  async create(user_id: string, transaction?: Transaction): Promise<WalletModel> {
    return this.wallet.create({ user_id }, { transaction });
  }

  async update(
    wallet_id: string,
    payload: WalletUpdateDto,
    transaction?: Transaction,
  ): Promise<[affectedCount: number]> {
    return this.wallet.update(payload, { where: { id: wallet_id }, transaction });
  }

  async getById(id: string): Promise<WalletModel> {
    return this.wallet.findOne({ where: { id } });
  }

  async getList(): Promise<WalletModel[]> {
    return this.wallet.findAll({ where: { is_deleted: false } });
  }

  async getDetailByCondition(condition: any): Promise<WalletModel> {
    return this.wallet.findOne({ where: { ...condition, is_deleted: false } });
  }
}
