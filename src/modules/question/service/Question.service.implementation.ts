import { Inject, Injectable } from '@nestjs/common';
import { IQuestionService } from './Question.service.interface';
import { IQuestionRepository } from '../repository/Question.repository.interface';
import { CreateQuestionDto } from '../dto/Question.dto';
import { Transaction } from 'sequelize/types/transaction';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';
import { QuestionType } from '../enum/Question.enum';
import { QuestionModel } from '../model/Question.model';
import { IUserRepository } from '../../user/repository/User.interface.repository';
import { ICourseRepository } from '../../course/repository/Course.interface.repository';
import { ILessonRepository } from '../../lesson/repository/Lesson.repository.interface';

@Injectable()
export class QuestionServiceImplementation implements IQuestionService {
  constructor(
    @Inject(IQuestionRepository) private readonly questionRepository: IQuestionRepository,
    @Inject(IUserRepository) private userRepository: IUserRepository,
    @Inject(ICourseRepository) private courseRepository: ICourseRepository,
    @Inject(ILessonRepository) private lessonRepository: ILessonRepository,
  ) {}

  async createQuestion(payload: CreateQuestionDto, transaction?: Transaction, isBulkCreate?: boolean): Promise<string> {
    const { answers, ...questionInfo } = payload;
    const user = await this.userRepository.findById(questionInfo.created_by);
    const course = await this.courseRepository.getDetail(questionInfo.course_id);
    const lesson = await this.lessonRepository.findByCondition({ id: questionInfo.lesson_id });

    if (!user) {
      throw new BaseError(ERROR_CODE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    if (!course) {
      throw new BaseError(ERROR_CODE.COURSE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    if (!lesson) {
      throw new BaseError(ERROR_CODE.LESSON_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const newQuestion = await this.questionRepository.createQuestion(questionInfo, transaction);
    if (!newQuestion) {
      throw new BaseError(ERROR_CODE.CANNOT_CREATE_QUESTION, STATUS_CODE.BAD_REQUEST);
    }
    let countIsCorrect = 0;

    if (answers.length <= 1) {
      throw new BaseError(ERROR_CODE.INVALID_ANSWER, STATUS_CODE.BAD_REQUEST, 'Answer must be minimum 2n');
    }
    const formattedAnswers = answers.map((el) => {
      if (el.is_correct === true) {
        countIsCorrect += 1;
      }
      el.question_id = newQuestion.id;
      return el;
    });

    if (countIsCorrect === 0) {
      throw new BaseError(ERROR_CODE.INVALID_ANSWER, STATUS_CODE.BAD_REQUEST);
    }
    if (questionInfo.type === QuestionType.SINGLE_CHOICE && countIsCorrect > 1) {
      throw new BaseError(ERROR_CODE.INVALID_ANSWER, STATUS_CODE.BAD_REQUEST);
    }
    if (questionInfo.type === QuestionType.MULTIPLE_CHOICE && countIsCorrect < 2) {
      throw new BaseError(ERROR_CODE.INVALID_ANSWER, STATUS_CODE.BAD_REQUEST);
    }
    const listAnswers = await this.questionRepository.createAnswers(
      answers.map((el) => {
        el.question_id = newQuestion.id;
        return el;
      }),
      transaction,
    );

    if (listAnswers.length !== answers.length) {
      throw new BaseError(ERROR_CODE.CANNOT_CREATE_QUESTION, STATUS_CODE.BAD_REQUEST);
    }
    if (!isBulkCreate) {
      await transaction.commit();
      return 'Create success';
    }
    return 'Create success';
  }

  async bulkInsertQuestion(payload: CreateQuestionDto[], transaction?: Transaction): Promise<string> {
    await Promise.all(
      payload.map((question) => {
        return this.createQuestion(question, transaction, true);
      }),
    );
    await transaction.commit();
    return 'Bulk insert question success';
  }

  async getQuestionDetail(id: string): Promise<QuestionModel> {
    return this.questionRepository.getQuestionDetail(id, false);
  }

  async checkQuestion(id: string, answerIds: string[]): Promise<boolean> {
    const question = await this.questionRepository.getQuestionDetail(id, true);
    if (!question) {
      throw new BaseError(ERROR_CODE.QUESTION_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const { answers, type } = question;
    if (type === QuestionType.SINGLE_CHOICE) {
      const matchAnswer = answers.filter((el) => el.id === answerIds[0] && el.is_correct);
      return matchAnswer.length > 0;
    }

    const correctAnswers = answers.filter((el) => el.is_correct);
    if (correctAnswers.length !== answerIds.length) {
      return false;
    }
    answerIds.forEach((el) => {});

    return true;
  }
}
