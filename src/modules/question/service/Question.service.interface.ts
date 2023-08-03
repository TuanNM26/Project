import { CreateQuestionDto } from '../dto/Question.dto';
import { Transaction } from 'sequelize/types/transaction';
import { QuestionModel } from '../model/Question.model';

export interface IQuestionService {
  createQuestion(payload: CreateQuestionDto, transaction?: Transaction): Promise<string>;

  bulkInsertQuestion(payload: CreateQuestionDto[], transaction?: Transaction): Promise<string>;

  getQuestionDetail(id: string): Promise<QuestionModel>;
}

export const IQuestionService = Symbol('IQuestionService');
