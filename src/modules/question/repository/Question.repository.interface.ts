import { CreateQuestionDto, QuestionRecordDto } from '../dto/Question.dto';
import { Transaction } from 'sequelize/types/transaction';
import { QuestionModel } from '../model/Question.model';
import { AnswerDto } from '../dto/Answer.dto';
import { AnswerModel } from '../model/Answer.model';

export interface IQuestionRepository {
  create(payload: CreateQuestionDto, transaction?: Transaction): Promise<string>;

  createQuestion(payload: QuestionRecordDto, transaction?: Transaction): Promise<QuestionModel>;

  createAnswers(payload: AnswerDto[], transaction?: Transaction): Promise<AnswerModel[]>;

  getQuestionDetail(questionId: string, showCorrectAnswer: boolean): Promise<QuestionModel>;

  countQuestionOfLesson(lessonId: string): Promise<number>;
}

export const IQuestionRepository = Symbol('IQuestionRepository');
