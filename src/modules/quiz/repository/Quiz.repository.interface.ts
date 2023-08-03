import { CreateQuizDto } from '../dto/Quiz.dto';
import { QuizModel } from '../model/Quiz.model';

export interface IQuizRepository {
  create(payload: CreateQuizDto): Promise<QuizModel>;

  getDetail(condition: any): Promise<QuizModel>;

  updateQuiz(condition: any, payload: any): Promise<[affectedCount: number]>;
}

export const IQuizRepository = Symbol('IQuizRepository');
