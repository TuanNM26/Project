import { Inject, Injectable } from '@nestjs/common';
import { IWalletService } from './Wallet.interface.service';
import { IWalletRepository } from '../repository/Wallet.interface.repository';
import { WalletModel } from '../model/Wallet.model';
import { WalletUpdateDto } from '../dto/Wallet.dto';

@Injectable()
export class WalletServiceImplementation implements IWalletService {
  constructor(@Inject(IWalletRepository) private walletRepository: IWalletRepository) {}

  async createWallet() {
    return null;
  }

  async getDetailWallet(id: string) {
    return this.walletRepository.getById(id);
  }

  async getListWallet(): Promise<WalletModel[]> {
    return this.walletRepository.getList();
  }

  async updateWallet(wallet_id: string, payload: WalletUpdateDto): Promise<[affectedCount: number]> {
    return this.walletRepository.update(wallet_id, payload);
  }
}
