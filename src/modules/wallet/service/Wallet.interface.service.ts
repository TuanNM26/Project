import { WalletModel } from '../model/Wallet.model';
import { WalletUpdateDto } from '../dto/Wallet.dto';

export interface IWalletService {
  createWallet();

  getDetailWallet(id: string);

  getListWallet(): Promise<WalletModel[]>;

  updateWallet(wallet_id: string, payload: WalletUpdateDto): Promise<[affectedCount: number]>;
}

export const IWalletService = Symbol('IWalletService');
