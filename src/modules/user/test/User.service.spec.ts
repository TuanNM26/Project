import { Test, TestingModule } from '@nestjs/testing';
import { IUserService } from '../service/User.interface.service';
import { UserServiceImplementation } from '../service/User.implementation.service';
import { UserModel } from '../model/User.model';
import { getModelToken } from '@nestjs/sequelize';
import { IUserRepository } from '../repository/User.interface.repository';
import { DatabaseModule } from '../../database/Database.Module';
import { Sequelize } from 'sequelize-typescript';
import { WalletModel } from '../../wallet/model/Wallet.model';
import { CourseModel } from '../../course/model/Course.model';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';
import { UserRoles } from '../enum/User.enum';

let usersArray = [
  {
    user: {
      id: 'c3001c48-cc3f-4802-ba6e-b75d3c6f46dd',
      username: 'loctest02',
      email: 'loctest02@gmail.com',
      phone_number: '09184756372',
      first_name: '',
      last_name: '',
      role: 'user',
      date_of_birth: '13/03/1997',
      avatar: null,
      is_deleted: false,
      created_at: '2023-06-21T10:27:13.000Z',
      updated_at: '2023-06-21T10:27:13.000Z',
    },
    wallet: {},
  },
  {
    user: {
      id: 'ca584e5e-f747-4830-add4-cb42646d9319',
      username: 'loctest01',
      email: 'loctest01@gmail.com',
      phone_number: '019249583948',
      first_name: 'test01',
      last_name: 'loc',
      role: 'user',
      date_of_birth: '13/03/1997',
      avatar: 'localhost:4000/uploads/avatar/loctest01.jpg',
      is_deleted: false,
      created_at: '2023-06-16T07:34:51.000Z',
      updated_at: '2023-06-16T09:21:30.000Z',
    },
    wallet: {},
  },
];

let oneUser = {
  user: {
    id: 'ca584e5e-f747-4830-add4-cb42646d9319',
    username: 'loctest01',
    email: 'loctest01@gmail.com',
    phone_number: '019249583948',
    first_name: 'test01',
    last_name: 'loc',
    role: 'user',
    date_of_birth: '13/03/1997',
    avatar: 'localhost:4000/uploads/avatar/loctest01.jpg',
    is_deleted: false,
    created_at: '2023-06-16T07:34:51.000Z',
    updated_at: '2023-06-16T09:21:30.000Z',
  },
  wallet: {},
};
const sequelize = new Sequelize({
  dialect: 'mysql', // Replace with your database dialect
  host: '127.0.0.1',
  port: 3308,
  username: 'quiz_practice',
  password: 'quiz_practice',
  database: 'quiz_practice',
});

const getUserDetail = async (id) => {
  try {
    await sequelize.authenticate(); // Ensure the connection to the database is successful
    sequelize.addModels([UserModel, WalletModel, CourseModel]);
    const records = await UserModel.findOne({ where: { id }, include: WalletModel }); // Replace `MyModel` with your Sequelize model

    return records;
  } catch (error) {
    console.error('Error retrieving records:', error);
    throw error;
  }
};

const getAllUser = async () => {
  try {
    await sequelize.authenticate(); // Ensure the connection to the database is successful
    sequelize.addModels([UserModel, WalletModel, CourseModel]);
    const records = await UserModel.findAll({ where: { is_deleted: false } }); // Replace `MyModel` with your Sequelize model

    return records.map((user) => user);
  } catch (error) {
    console.error('Error retrieving records:', error);
    throw error;
  }
};

const updateUser = async (condition, dataUpdate) => {
  try {
    await sequelize.authenticate(); // Ensure the connection to the database is successful
    sequelize.addModels([UserModel, WalletModel, CourseModel]);
    const affectedCount = await UserModel.update(dataUpdate, { where: condition }); // Replace `MyModel` with your Sequelize model

    return affectedCount;
  } catch (error) {
    console.error('Error retrieving records:', error);
    throw error;
  }
};
describe('User Service', () => {
  let service: IUserService;
  let repository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseModule,
        { provide: IUserService, useClass: UserServiceImplementation },
        {
          provide: IUserRepository,
          useValue: {
            findById: jest.fn(async (x) => {
              const user = await getUserDetail(x);
              if (!user) {
                return undefined;
              }
              oneUser = user.transformToResponse();
              return user.transformToResponse();
            }),
            findAll: jest.fn(async () => {
              const users = await getAllUser();
              const userFormat = users.map((user) => user.transformToResponse());
              usersArray = userFormat;
              return userFormat;
            }),
            update: jest.fn(async (x, y) => {
              const count = await updateUser(x, y);
              return count;
            }),
            create: jest.fn((x) => x),
          },
        },
        {
          provide: getModelToken(UserModel),
          useValue: UserModel,
        },
      ],
    }).compile();

    service = module.get<IUserService>(IUserService);
    repository = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test get user detail', () => {
    it('Success', async () => {
      const user = await service.getDetailUser('ca584e5e-f747-4830-add4-cb42646d9319');
      expect(user).toEqual(oneUser);
    });

    it('Not found', async () => {
      try {
        const user = await service.getDetailUser('ca584e5e-f747-4830-add4');
      } catch (error) {
        expect(error).toEqual(new BaseError(ERROR_CODE.USER_NOT_FOUND, STATUS_CODE.BAD_REQUEST));
      }
    });
  });

  describe('Get all user', () => {
    it('Success', async () => {
      const user = await service.getAll();
      expect(user).toEqual(usersArray);
    });
  });

  describe('Create new User', () => {
    it('success', async () => {
      const newUser = await service.createNewUser({
        username: 'string',
        email: 'email@gmail.com',
        phone_number: 'string',
        password: 'string',
        first_name: 'string',
        last_name: 'string',
        role: UserRoles.ADMIN,
        date_of_birth: '13/03/1997',
      });
      expect(newUser).toEqual({
        username: 'string',
        email: 'email@gmail.com',
        phone_number: 'string',
        password: 'string',
        first_name: 'string',
        last_name: 'string',
        role: UserRoles.ADMIN,
        date_of_birth: '13/03/1997',
      });
    });

    it('Invalid phone number', async () => {
      try {
        const newUser = await service.createNewUser({
          username: 'string',
          email: 'email@gmail.com',
          phone_number: 'string',
          password: 'string',
          first_name: 'string',
          last_name: 'string',
          role: UserRoles.ADMIN,
          date_of_birth: '13/03/1997',
        });
      } catch (error) {
        expect(error).toEqual(new BaseError(ERROR_CODE.INVALID_PHONE, STATUS_CODE.BAD_REQUEST));
      }
    });
  });

  describe('Update user', () => {
    it('Success', async () => {
      const user = await service.updateUser('c3001c48-cc3f-4802-ba6e-b75d3c6f46dd', { last_name: '123' });
      expect(user).toEqual('Update user info success');
    });

    it('Update user fail', async () => {
      try {
        await service.updateUser('', { last_name: 'test' });
      } catch (error) {
        expect(error).toEqual(new BaseError(ERROR_CODE.UPDATE_USER_FAIL, STATUS_CODE.BAD_REQUEST));
      }
    });

    it('Update user with empty data', async () => {
      try {
        await service.updateUser('', {});
      } catch (error) {
        expect(error).toEqual(new BaseError(ERROR_CODE.INVALID_DATA_UPDATE, STATUS_CODE.BAD_REQUEST));
      }
    });
  });
});
