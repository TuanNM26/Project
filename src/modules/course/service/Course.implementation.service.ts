import { Inject, Injectable } from '@nestjs/common';
import { ICourseService } from './Course.interface.service';
import { ICourseRepository } from '../repository/Course.interface.repository';
import { CoursesResponseDto, CreateCourseDto, ListCourseFilerDto, MyCoursesFilerDto } from '../dto/Course.dto';
import { CourseModel } from '../model/Course.model';
import { BaseError, ERROR_CODE } from 'src/BaseError';
import { STATUS_CODE } from 'src/BaseController';
import { ILessonRepository } from '../../lesson/repository/Lesson.repository.interface';
import { LessonModel } from '../../lesson/model/Lesson.model';

@Injectable()
export class CourseImplementationService implements ICourseService {
  constructor(
    @Inject(ICourseRepository) private courseRepository: ICourseRepository,
    @Inject(ILessonRepository) private lessonRepository: ILessonRepository,
  ) {}

  async createCourse(payload: CreateCourseDto, userId: string, file: any): Promise<CourseModel> {
    const { created_by: createdBy, price } = payload;
    payload.image = `http://localhost:4000/${file.path}`;
    const numberPrice = Number(price);
    if (numberPrice < 0) {
      throw new BaseError(ERROR_CODE.INVALID_ID_PRICE, STATUS_CODE.BAD_REQUEST);
    }
    payload.price = numberPrice;
    if (userId !== createdBy) {
      throw new BaseError(ERROR_CODE.INVALID_ID_USER, STATUS_CODE.BAD_REQUEST);
    }
    return this.courseRepository.create(payload);
  }

  async getListCourse(filter: ListCourseFilerDto): Promise<CoursesResponseDto> {
    const { offset, limit } = filter;
    const courses = await this.courseRepository.getList(filter);
    const totalCourse = await this.courseRepository.count(filter);
    return {
      data: courses,
      pagination: {
        offset,
        limit,
        total: totalCourse,
      },
    };
  }

  async getListCourseOfUser(filter: MyCoursesFilerDto): Promise<CoursesResponseDto> {
    const { offset, limit } = filter;
    const courses = await this.courseRepository.getListOfUser(filter);
    const totalCourse = await this.courseRepository.countCourseOfUser(filter);
    return {
      data: courses,
      pagination: {
        offset,
        limit,
        total: totalCourse,
      },
    };
  }

  async getDetailCourse(id: string): Promise<CourseModel> {
    const course = await this.courseRepository.getDetail(id);
    if (!course) {
      throw new BaseError(ERROR_CODE.COURSE_NOT_FOUND, STATUS_CODE.BAD_REQUEST);
    }
    return course;
  }

  async getListLessonOfCourse(id: string): Promise<LessonModel[]> {
    return this.lessonRepository.findAllByCondition({ course_id: id });
  }
}
