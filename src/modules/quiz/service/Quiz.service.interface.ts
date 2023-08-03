import { CreateQuizDto, PayloadUpdateInfoQuiz, QueryQuizDto, ResponseQuizDetailDto } from '../dto/Quiz.dto';
import { QuizModel } from '../model/Quiz.model';

export interface IQuizService {
  createNewQuiz(payload: CreateQuizDto, userId: string): Promise<QuizModel>;

  getDetailQuiz(payload: QueryQuizDto): Promise<ResponseQuizDetailDto>;

  updateInfoQuiz(condition: any, payload: PayloadUpdateInfoQuiz): Promise<string>;
}

export const IQuizService = Symbol('IQuizService');
