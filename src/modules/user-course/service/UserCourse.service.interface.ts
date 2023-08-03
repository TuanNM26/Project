import { BuyCourseDto } from '../dto/UserCourse.dto';
import { Transaction } from 'sequelize/types/transaction';
import { UserCourseModel } from '../model/UserCourse.model';

export interface IUserCourseService {
  buyCourse(payload: BuyCourseDto, transaction?: Transaction): Promise<string>;

  getListCourseOfUser(userId: string): Promise<UserCourseModel[]>;
}

export const IUserCourseService = Symbol('IUserCourseService');
