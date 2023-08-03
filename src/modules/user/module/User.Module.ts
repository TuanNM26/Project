import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../model/User.model';
import { IUserRepository } from '../repository/User.interface.repository';
import { UserRepositoryImplementation } from '../repository/User.implementation.repository';
import { IUserService } from '../service/User.interface.service';
import { UserServiceImplementation } from '../service/User.implementation.service';
import { UserController } from '../controller/User.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const { user } = req;
          cb(null, `/avatar/${user.username}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepositoryImplementation,
    },
    {
      provide: IUserService,
      useClass: UserServiceImplementation,
    },
  ],
  controllers: [UserController],
  exports: [IUserService, IUserRepository],
})
export class UserModule {}
