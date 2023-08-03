import { Injectable } from '@nestjs/common';
import { IQuestionRepository } from './Question.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { QuestionModel } from '../model/Question.model';
import { AnswerModel } from '../model/Answer.model';
import { CreateQuestionDto, QuestionRecordDto } from '../dto/Question.dto';
import { Transaction } from 'sequelize/types/transaction';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';
import { AnswerDto } from '../dto/Answer.dto';

@Injectable()
export class QuestionRepositoryImplementation implements IQuestionRepository {
  constructor(
    @InjectModel(QuestionModel) private question: typeof QuestionModel,
    @InjectModel(AnswerModel) private answer: typeof AnswerModel,
  ) {}

  async create(payload: CreateQuestionDto, transaction?: Transaction): Promise<string> {
    const { answers, ...questionInfo } = payload;
    const newQuestion = await this.question.create(questionInfo, { transaction });
    if (!newQuestion) {
      throw new BaseError(ERROR_CODE.CANNOT_CREATE_QUESTION, STATUS_CODE.BAD_REQUEST);
    }
    const listAnswers = await this.answer.bulkCreate(
      answers.map((el) => {
        el.question_id = newQuestion.id;
        return el;
      }),
      { transaction },
    );

    return 'Create question success!';
  }

  async createQuestion(payload: QuestionRecordDto, transaction?: Transaction): Promise<QuestionModel> {
    console.log(payload);
    return this.question.create(payload, { transaction });
  }

  async createAnswers(payload: AnswerDto[], transaction?: Transaction): Promise<AnswerModel[]> {
    return this.answer.bulkCreate(payload, { transaction });
  }

  async getQuestionDetail(questionId: string, showCorrectAnswer: boolean): Promise<QuestionModel> {
    const excludeAttributes = showCorrectAnswer
      ? ['is_deleted', 'question_id', 'created_at', 'updated_at']
      : ['is_correct', 'is_deleted', 'question_id', 'created_at', 'updated_at'];
    return this.question.findOne({
      where: { id: questionId },
      include: [
        {
          model: AnswerModel,
          attributes: { exclude: excludeAttributes },
        },
      ],
    });
  }

  async countQuestionOfLesson(lessonId: string): Promise<number> {
    return this.question.count({ where: { lesson_id: lessonId } });
  }
}
