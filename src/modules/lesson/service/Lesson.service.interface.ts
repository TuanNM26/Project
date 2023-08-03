import { PayloadCreateLessonDto, UpdateLessonInfoDto } from '../dto/Lesson.dto';
import { LessonModel } from '../model/Lesson.model';

export interface ILessonService {
  createLesson(payload: PayloadCreateLessonDto, userId: string, contentFile: any): Promise<LessonModel>;

  updateLessonInfo(lessonId: string, payload: UpdateLessonInfoDto): Promise<string>;

  updateContentLesson(lessonId: string, contentFile: any): Promise<string>;
}

export const ILessonService = Symbol('ILessonService');
