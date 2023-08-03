import { Inject, Injectable } from '@nestjs/common';
import { IUserCourseService } from './UserCourse.service.interface';
import { BuyCourseDto } from '../dto/UserCourse.dto';
import { ICourseRepository } from '../../course/repository/Course.interface.repository';
import { IUserRepository } from '../../user/repository/User.interface.repository';
import { IWalletRepository } from '../../wallet/repository/Wallet.interface.repository';
import { IUserCourseRepository } from '../repository/UserCourse.repository.interface';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';
import { Transaction } from 'sequelize/types/transaction';
import { StatusCourse } from '../../course/enum/courseEnum';
import { UserCourseModel } from '../model/UserCourse.model';
import { Op } from 'sequelize';

@Injectable()
export class UserCourseServiceImplementation implements IUserCourseService {
  constructor(
    @Inject(ICourseRepository) private readonly courseRepository: ICourseRepository,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(IWalletRepository) private readonly walletRepository: IWalletRepository,
    @Inject(IUserCourseRepository) private readonly userCourseRepository: IUserCourseRepository,
  ) {}

  async buyCourse(payload: BuyCourseDto, transaction?: Transaction): Promise<string> {
    const { user_id, course_id } = payload;
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new BaseError(ERROR_CODE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const wallet = await this.walletRepository.getDetailByCondition({ user_id });
    if (!wallet) {
      throw new BaseError(ERROR_CODE.WALLET_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const course = await this.courseRepository.getDetailByCondition({ id: course_id, status: StatusCourse.PUBLISHED });
    if (!course) {
      throw new BaseError(ERROR_CODE.COURSE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const courseUser = await this.userCourseRepository.getDetailByCondition({ user_id, course_id });
    if (courseUser) {
      throw new BaseError(ERROR_CODE.CANNOT_BUY_COURSE, STATUS_CODE.BAD_REQUEST);
    }
    const { current_balance, id: walletId } = wallet;
    const { price } = course;
    if (price > 0) {
      if (current_balance < price) {
        throw new BaseError(ERROR_CODE.INSUFFICIENT_BALANCE, STATUS_CODE.BAD_REQUEST);
      }
      const affectedCount = await this.walletRepository.update(
        walletId,
        {
          current_balance: current_balance - price,
          previous_balance: current_balance,
        },
        transaction,
      );

      const affectedCountExpertWallet = await this.walletRepository.update(
        course.created_by,
        {
          current_balance: current_balance + price,
          previous_balance: current_balance,
        },
        transaction,
      );

      if (affectedCount[0] === 0 || affectedCountExpertWallet[0] === 0) {
        throw new BaseError(ERROR_CODE.UPDATE_WALLET_FAIL, STATUS_CODE.BAD_REQUEST);
      }
    }

    const expectedUserCourse = await this.userCourseRepository.createUserCourse({ user_id, course_id });
    if (!expectedUserCourse) {
      throw new BaseError(ERROR_CODE.BUY_COURSE_FAIL, STATUS_CODE.BAD_REQUEST);
    }
    await transaction.commit();
    return 'Buy course success!';
  }

  async getListCourseOfUser(userId: string): Promise<UserCourseModel[]> {
    const courseOfUser = await this.userCourseRepository.getListByCondition({ user_id: userId });
    const listCourseId = courseOfUser.map((el) => el.course_id);
    const listCourseDetail = await this.courseRepository.findAllWithCondition({ id: { [Op.in]: listCourseId } });
    const listCourse = [];
    listCourseDetail.forEach((el) => {
      const courseElement = courseOfUser.find((course) => course.course_id === el.id);
      if (courseElement) {
        listCourse.push({
          id: courseElement.id,
          user_id: courseElement.user_id,
          courseInfo: el,
        });
      }
    });
    return listCourse;
  }
}
