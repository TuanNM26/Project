import { Transaction } from 'sequelize/types/transaction';
import { CourseModel } from '../model/Course.model';
import { ListCourseFilerDto, MyCoursesFilerDto } from '../dto/Course.dto';

export interface ICourseRepository {
  create(payload: any, transaction?: Transaction): Promise<CourseModel>;

  getList(filter: ListCourseFilerDto): Promise<CourseModel[]>;

  getListOfUser(filter: MyCoursesFilerDto): Promise<CourseModel[]>;

  getDetail(id: string): Promise<CourseModel>;

  update(condition: any, dataUpdate: any): Promise<[affectedCount: number]>;

  count(filter: ListCourseFilerDto): Promise<number>;

  countCourseOfUser(filter: MyCoursesFilerDto): Promise<number>;

  getDetailByCondition(condition: any): Promise<CourseModel>;

  findCourseWithQuestion(condition: any, questionCondition: any): Promise<CourseModel>;

  findAllWithCondition(condition: any): Promise<CourseModel[]>;
}

export const ICourseRepository = Symbol('ICourseService');
