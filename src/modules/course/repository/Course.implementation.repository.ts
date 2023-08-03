import { Injectable } from '@nestjs/common';
import { ICourseRepository } from './Course.interface.repository';
import { InjectModel } from '@nestjs/sequelize';
import { CourseModel } from '../model/Course.model';
import { Transaction } from 'sequelize/types/transaction';
import { ListCourseFilerDto, MyCoursesFilerDto } from '../dto/Course.dto';
import { Op } from 'sequelize';
import { LessonModel } from '../../lesson/model/Lesson.model';
import { QuestionModel } from '../../question/model/Question.model';
import { AnswerModel } from '../../question/model/Answer.model';

@Injectable()
export class CourseImplementationRepository implements ICourseRepository {
  constructor(
    @InjectModel(CourseModel)
    private course: typeof CourseModel,
  ) {}

  async create(payload: any, transaction?: Transaction): Promise<CourseModel> {
    return this.course.create(payload, { transaction });
  }

  async getList(filter: ListCourseFilerDto): Promise<CourseModel[]> {
    const { limit, offset, search } = filter;
    const condition: { [key: string]: any } = {};
    // const condition = search ? { name: { [Op.like]: `%${search}%` } } : {};
    if (search) {
      condition.name = { [Op.like]: `%${search}%` };
    }
    if ('is_free' in filter) {
      if (filter.is_free === '1') {
        condition.price = { [Op.eq]: 0 };
      } else {
        condition.price = { [Op.gt]: 0 };
      }
    }

    return this.course.findAll({
      limit,
      offset,
      where: condition,
    });
  }

  async getListOfUser(filter: MyCoursesFilerDto): Promise<CourseModel[]> {
    const { limit, offset, ...condition } = filter;
    return this.course.findAll({
      limit,
      offset,
      where: condition,
    });
  }

  async count(filter: ListCourseFilerDto): Promise<number> {
    const { search } = filter;
    // const condition = search ? { name: { [Op.like]: `%${search}%` } } : {};
    const condition: { [key: string]: any } = {};
    // const condition = search ? { name: { [Op.like]: `%${search}%` } } : {};
    if (search) {
      condition.name = { [Op.like]: `%${search}%` };
    }
    if ('is_free' in filter) {
      if (filter.is_free === '1') {
        condition.price = { [Op.eq]: 0 };
      } else {
        condition.price = { [Op.gt]: 0 };
      }
    }
    return this.course.count({ where: condition });
  }

  async countCourseOfUser(filter: MyCoursesFilerDto): Promise<number> {
    const { created_by, status } = filter;

    return this.course.count({ where: { created_by, status } });
  }

  async getDetail(id: string): Promise<CourseModel> {
    const course = await this.course.findOne({
      where: { id },
      include: [{ model: LessonModel }],
      order: [[LessonModel, 'index', 'asc']],
    });
    if (!course) {
      const courseWithoutLesson = await this.course.findOne({ where: { id } });
      if (!courseWithoutLesson) return null;
      courseWithoutLesson.lessons = [];
      return courseWithoutLesson;
    }
    return course;
  }

  async update(condition: any, dataUpdate: any): Promise<[affectedCount: number]> {
    return this.course.update(dataUpdate, { where: condition });
  }

  async getDetailByCondition(condition: any): Promise<CourseModel> {
    return this.course.findOne({ where: { ...condition } });
  }

  async findCourseWithQuestion(condition: any, questionCondition: any): Promise<CourseModel> {
    return this.course.findOne({
      where: { ...condition },
      include: [
        {
          model: QuestionModel,
          where: { course_id: questionCondition.course_id, lesson_id: questionCondition.lesson_id },
          include: [{ model: AnswerModel, attributes: { exclude: questionCondition.exclude } }],
        },
      ],
    });
  }

  async findAllWithCondition(condition: any): Promise<CourseModel[]> {
    return this.course.findAll({ where: { ...condition } });
  }
}
