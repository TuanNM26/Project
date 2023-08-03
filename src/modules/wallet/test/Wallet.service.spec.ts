import { Test, TestingModule } from '@nestjs/testing';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';
import { IWalletService } from '../service/Wallet.interface.service';
import { IWalletRepository } from '../repository/Wallet.interface.repository';
import { WalletServiceImplementation } from '../service/Wallet.implementation.service';

const manyWallet = [
  {
    id: '3d7b6063-347f-4332-8492-41dccb78adca',
    user_id: 'ca584e5e-f747-4830-add4-cb42646d9319',
    current_balance: '0',
    previous_balance: '0',
    created_at: '2023-06-26T10:23:35.000Z',
    updated_at: '2023-06-26T10:23:35.000Z',
  },
];

const oneWallet = {
  id: '3d7b6063-347f-4332-8492-41dccb78adca',
  user_id: 'ca584e5e-f747-4830-add4-cb42646d9319',
  current_balance: '0',
  previous_balance: '0',
  created_at: '2023-06-26T10:23:35.000Z',
  updated_at: '2023-06-26T10:23:35.000Z',
};
describe('CourseService', () => {
  let service: IWalletService;
  let repository: IWalletRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IWalletService, useClass: WalletServiceImplementation },
        {
          provide: IWalletRepository,
          useValue: {
            getDetail: jest.fn((x) => {
              if (x == '3d7b6063-347f-4332-8492-41dccb78adca') {
                return oneWallet;
              }
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<IWalletService>(IWalletService);
    repository = module.get<IWalletRepository>(IWalletRepository);
  });

  describe('Test get wallet detail', () => {
    it('Success', async () => {
      const wallet = await service.getDetailWallet('ca584e5e-f747-4830-add4-cb42646d9319');
      expect(wallet).toEqual(oneWallet);
    });

    it('Not found', async () => {
      try {
        const course = await service.getDetailWallet('ca584e5e-f747-4830-add4');
      } catch (error) {
        expect(error).toEqual(new BaseError(ERROR_CODE.WALLET_NOT_FOUND, STATUS_CODE.BAD_REQUEST));
      }
    });
  });

  describe('Get all courses', () => {
    it('Success', async () => {
      const course = await service.getListWallet();
      expect(course).toEqual(manyWallet);
    });
  });

  describe('Update wallet', () => {
    it('Success', async () => {
      const user = await service.updateWallet('c3001c48-cc3f-4802-ba6e-b75d3c6f46dd', { current_balance: 123 });
      expect(user).toEqual('Update user info success');
    });

    it('Update wallet fail', async () => {
      try {
        await service.updateWallet('', { current_balance: 123 });
      } catch (error) {
        expect(error).toEqual(new BaseError(ERROR_CODE.UPDATE_USER_FAIL, STATUS_CODE.BAD_REQUEST));
      }
    });

    it('Update wallet with empty data', async () => {
      try {
        await service.updateWallet('', {});
      } catch (error) {
        expect(error).toEqual(new BaseError(ERROR_CODE.INVALID_DATA_UPDATE, STATUS_CODE.BAD_REQUEST));
      }
    });
  });
});
