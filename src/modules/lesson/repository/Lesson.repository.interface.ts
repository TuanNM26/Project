import { LessonModel } from '../model/Lesson.model';

export interface ILessonRepository {
  create(payload): Promise<LessonModel>;

  findByCondition(condition: any): Promise<LessonModel>;

  findAllByCondition(condition: any, order?: any): Promise<LessonModel[]>;

  findLessonWithQuiz(condition): Promise<LessonModel>;

  updateLesson(condition, payload): Promise<[affectedCount: number]>;
}

export const ILessonRepository = Symbol('ILessonRepository');
