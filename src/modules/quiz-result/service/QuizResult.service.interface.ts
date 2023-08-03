import { StartQuizServiceDto } from '../dto/QuizResult.dto';

export interface IQuizResultService {
  startQuiz(payload: StartQuizServiceDto): Promise<any>;
}

export const IQuizResultService = Symbol('IQuizResultService');
