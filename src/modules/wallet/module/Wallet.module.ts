import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletModel } from '../model/Wallet.model';
import { IWalletRepository } from '../repository/Wallet.interface.repository';
import { WalletRepositoryImplementation } from '../repository/Wallet.implementation.repository';
import { IWalletService } from '../service/Wallet.interface.service';
import { WalletServiceImplementation } from '../service/Wallet.implementation.service';
import { WalletController } from '../controller/Wallet.controller';

@Module({
  imports: [SequelizeModule.forFeature([WalletModel])],
  providers: [
    {
      provide: IWalletRepository,
      useClass: WalletRepositoryImplementation,
    },
    {
      provide: IWalletService,
      useClass: WalletServiceImplementation,
    },
  ],
  controllers: [WalletController],
  exports: [IWalletService, IWalletRepository],
})
export class WalletModule {}
