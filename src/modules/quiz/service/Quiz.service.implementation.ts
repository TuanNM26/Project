import { Inject, Injectable } from '@nestjs/common';
import { IQuizService } from './Quiz.service.interface';
import { IQuizRepository } from '../repository/Quiz.repository.interface';
import { CreateQuizDto, PayloadUpdateInfoQuiz, QueryQuizDto, ResponseQuizDetailDto } from '../dto/Quiz.dto';
import { QuizModel } from '../model/Quiz.model';
import { ILessonRepository } from '../../lesson/repository/Lesson.repository.interface';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';
import { IQuestionRepository } from '../../question/repository/Question.repository.interface';

@Injectable()
export class QuizServiceImplementation implements IQuizService {
  constructor(
    @Inject(IQuizRepository) private readonly quizRepository: IQuizRepository,
    @Inject(ILessonRepository) private readonly lessonRepository: ILessonRepository,
    @Inject(IQuestionRepository) private readonly questionRepository: IQuestionRepository,
  ) {}

  async createNewQuiz(payload: CreateQuizDto, userId: string): Promise<QuizModel> {
    const { lesson_id: lessonId } = payload;
    const lesson = await this.lessonRepository.findByCondition({ id: lessonId });
    if (!lesson) {
      throw new BaseError(ERROR_CODE.LESSON_NOT_FOUND, STATUS_CODE.BAD_REQUEST);
    }
    if (lesson.created_by !== userId) {
      throw new BaseError(ERROR_CODE.INVALID_ID_USER, STATUS_CODE.BAD_REQUEST, 'User is not owner of lesson!');
    }
    payload.created_by = userId;
    return this.quizRepository.create(payload);
  }

  async getDetailQuiz(payload: QueryQuizDto): Promise<ResponseQuizDetailDto> {
    const { lesson_id: lessonId } = payload;
    const quiz = await this.quizRepository.getDetail({ lesson_id: lessonId });
    if (!quiz) {
      throw new BaseError(ERROR_CODE.QUIZ_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const total_question_bank = await this.questionRepository.countQuestionOfLesson(lessonId);
    const { id, name, created_by, total_time, total_question, lesson_id, description, pass_score } = quiz;
    return {
      id,
      name,
      created_by,
      total_time,
      total_question,
      lesson_id,
      total_question_bank,
      description,
      pass_score,
    };
  }

  async updateInfoQuiz(condition: any, payload: PayloadUpdateInfoQuiz): Promise<string> {
    const affectedCount = await this.quizRepository.updateQuiz(condition, payload);
    if (affectedCount[0] === 0) {
      throw new BaseError(ERROR_CODE.UPDATE_USER_FAIL, STATUS_CODE.BAD_REQUEST);
    }
    return 'Update quiz success!';
  }
}
