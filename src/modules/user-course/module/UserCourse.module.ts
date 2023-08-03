import { Module } from '@nestjs/common';
import { UserCourseController } from '../controller/UserCourse.controller';
import { IUserCourseService } from '../service/UserCourse.service.interface';
import { UserCourseServiceImplementation } from '../service/UserCourse.service.implementation';
import { UserCourseRepositoryImplementation } from '../repository/UserCourse.repository.implementation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCourseModel } from '../model/UserCourse.model';
import { WalletModule } from '../../wallet/module/Wallet.module';
import { IUserCourseRepository } from '../repository/UserCourse.repository.interface';
import { UserModule } from '../../user/module/User.Module';
import { CourseModule } from '../../course/module/Course.module';
import { CourseModel } from '../../course/model/Course.model';

@Module({
  imports: [SequelizeModule.forFeature([UserCourseModel, CourseModel]), WalletModule, UserModule, CourseModule],
  providers: [
    {
      provide: IUserCourseService,
      useClass: UserCourseServiceImplementation,
    },
    { provide: IUserCourseRepository, useClass: UserCourseRepositoryImplementation },
  ],
  controllers: [UserCourseController],
  exports: [IUserCourseService, IUserCourseRepository],
})
export class UserCourseModule {}
