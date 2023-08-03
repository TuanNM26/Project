import { Injectable } from '@nestjs/common';
import { IUserCourseRepository } from './UserCourse.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { UserCourseModel } from '../model/UserCourse.model';
import { BuyCourseDto } from '../dto/UserCourse.dto';
import { Transaction } from 'sequelize/types/transaction';

@Injectable()
export class UserCourseRepositoryImplementation implements IUserCourseRepository {
  constructor(@InjectModel(UserCourseModel) private userCourse: typeof UserCourseModel) {}

  async createUserCourse(payload: BuyCourseDto, transaction?: Transaction): Promise<UserCourseModel> {
    return this.userCourse.create(payload);
  }

  async getListByCondition(condition: any): Promise<UserCourseModel[]> {
    return this.userCourse.findAll({
      where: { ...condition, is_deleted: false },
    });
  }

  async getDetailByCondition(condition: any): Promise<UserCourseModel> {
    return this.userCourse.findOne({ where: { ...condition, is_deleted: false } });
  }
}
