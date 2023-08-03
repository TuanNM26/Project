import { BuyCourseDto } from '../dto/UserCourse.dto';
import { Transaction } from 'sequelize/types/transaction';
import { UserCourseModel } from '../model/UserCourse.model';

export interface IUserCourseRepository {
  createUserCourse(payload: BuyCourseDto, transaction?: Transaction): Promise<UserCourseModel>;

  getListByCondition(condition: any): Promise<UserCourseModel[]>;

  getDetailByCondition(condition: any): Promise<UserCourseModel>;
}

export const IUserCourseRepository = Symbol('IUserCourseRepository');
