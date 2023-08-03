import { Injectable } from '@nestjs/common';
import { ILessonRepository } from './Lesson.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { LessonModel } from '../model/Lesson.model';
import { QuizModel } from '../../quiz/model/Quiz.model';

@Injectable()
export class LessonRepositoryImplementation implements ILessonRepository {
  constructor(@InjectModel(LessonModel) private lesson: typeof LessonModel) {}

  async create(payload): Promise<LessonModel> {
    return this.lesson.create(payload);
  }

  async findByCondition(condition: any): Promise<LessonModel> {
    return this.lesson.findOne({ where: { ...condition, is_deleted: false } });
  }

  async findAllByCondition(condition: any, order?: any): Promise<LessonModel[]> {
    return this.lesson.findAll({ where: { ...condition, is_deleted: false }, order: order });
  }

  async findLessonWithQuiz(condition): Promise<LessonModel> {
    return this.lesson.findOne({ where: { ...condition, is_deleted: false }, include: [{ model: QuizModel }] });
  }

  async updateLesson(condition, payload): Promise<[affectedCount: number]> {
    return this.lesson.update(payload, { where: condition });
  }
}
