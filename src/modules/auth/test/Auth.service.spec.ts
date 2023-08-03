import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../database/Database.Module';
import { Sequelize } from 'sequelize-typescript';
import { IAuthService } from '../service/Auth.service.interface';
import { AuthServiceImplementation } from '../service/Auth.service.implementation';
import { UserRoles } from '../../user/enum/User.enum';

const oneUser = {
  username: 'testuser',
  email: 'testUser@gmail.com',
  phone_number: '01012841238',
  password: '123123',
  first_name: 'test',
  last_name: 'user',
  role: UserRoles.ADMIN,
  date_of_birth: '13/03/1997',
};
const sequelize = new Sequelize({
  dialect: 'mysql', // Replace with your database dialect
  host: '127.0.0.1',
  port: 3308,
  username: 'quiz_practice',
  password: 'quiz_practice',
  database: 'quiz_practice',
});

describe('Auth Service', () => {
  let service: IAuthService;
  // let repository: IUserRepository;
  // let walletRepository: IWalletRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseModule,
        { provide: IAuthService, useClass: AuthServiceImplementation },
        // {
        //   provide: IUserRepository,
        //   useValue: {
        //     create: jest.fn((x) => x),
        //   },
        // },
        // {
        //   provide: IWalletRepository,
        //   useValue: {
        //     create: jest.fn(async () => {}),
        //   },
        // },
        // {
        //   provide: getModelToken(UserModel),
        //   useValue: UserModel,
        // },
      ],
    }).compile();

    service = module.get<IAuthService>(IAuthService);
    // repository = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test create user', () => {
    it('Create success', async () => {
      const newUser = await service.register({
        username: 'testuser',
        email: 'testUser@gmail.com',
        phone_number: '01012841238',
        password: '123123',
        first_name: 'test',
        last_name: 'user',
        role: UserRoles.ADMIN,
        date_of_birth: '13/03/1997',
      });
      expect(newUser).toEqual(oneUser);
    });
  });
});
