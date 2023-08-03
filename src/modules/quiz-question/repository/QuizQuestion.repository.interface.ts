import { QuizQuestionModel } from '../model/QuizQuestion.model';
import { QuizQuestionDto } from '../dto/QuizQuestion.dto';

export interface IQuizQuestionRepository {
  bulkCreate(payload: QuizQuestionDto[]): Promise<QuizQuestionModel[]>;
}

export const IQuizQuestionRepository = Symbol('IQuizQuestionRepository');
