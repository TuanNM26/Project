import { CoursesResponseDto, CreateCourseDto, ListCourseFilerDto, MyCoursesFilerDto } from '../dto/Course.dto';
import { CourseModel } from '../model/Course.model';
import { LessonModel } from '../../lesson/model/Lesson.model';

export interface ICourseService {
  createCourse(payload: CreateCourseDto, userId: string, file: any): Promise<CourseModel>;

  getListCourse(filter: ListCourseFilerDto): Promise<CoursesResponseDto>;

  getListCourseOfUser(filter: MyCoursesFilerDto): Promise<CoursesResponseDto>;

  getDetailCourse(id: string): Promise<CourseModel>;

  getListLessonOfCourse(id: string): Promise<LessonModel[]>;
}

export const ICourseService = Symbol('ICourseService');
