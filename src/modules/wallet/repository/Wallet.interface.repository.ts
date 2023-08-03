import { WalletModel } from '../model/Wallet.model';
import { Transaction } from 'sequelize/types/transaction';
import { WalletUpdateDto } from '../dto/Wallet.dto';

export interface IWalletRepository {
  create(user_id: string, transaction?: Transaction): Promise<WalletModel>;

  getList(): Promise<WalletModel[]>;

  getById(id: string): Promise<WalletModel>;

  update(wallet_id: string, payload: WalletUpdateDto, transaction?: Transaction): Promise<[affectedCount: number]>;

  getDetailByCondition(condition: any): Promise<WalletModel>;
}

export const IWalletRepository = Symbol('IWalletRepository');
