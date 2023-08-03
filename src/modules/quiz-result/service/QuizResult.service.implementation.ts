import { Inject, Injectable } from '@nestjs/common';
import { IQuizResultService } from './QuizResult.service.interface';
import { StartQuizServiceDto } from '../dto/QuizResult.dto';
import { IQuizResultRepository } from '../repository/QuizResult.repository.interface';
import { IUserRepository } from '../../user/repository/User.interface.repository';
import { ICourseRepository } from '../../course/repository/Course.interface.repository';
import { ILessonRepository } from '../../lesson/repository/Lesson.repository.interface';
import { IUserCourseRepository } from '../../user-course/repository/UserCourse.repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { IQuizQuestionRepository } from '../../quiz-question/repository/QuizQuestion.repository.interface';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';

@Injectable()
export class QuizResultServiceImplementation implements IQuizResultService {
  constructor(
    @Inject(IQuizResultRepository) private readonly quizResultRepository: IQuizResultRepository,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ICourseRepository) private readonly courseRepository: ICourseRepository,
    @Inject(ILessonRepository) private readonly lessonRepository: ILessonRepository,
    @Inject(IUserCourseRepository) private readonly userCourseRepository: IUserCourseRepository,
    @Inject(IQuizQuestionRepository) private readonly quizQuestionRepository: IQuizQuestionRepository,
  ) {}

  async startQuiz(payload: StartQuizServiceDto): Promise<any> {
    const { user_id, course_id, lesson_id } = payload;
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new BaseError(ERROR_CODE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const lesson = await this.lessonRepository.findLessonWithQuiz({ id: lesson_id });
    if (!lesson) {
      throw new BaseError(ERROR_CODE.LESSON_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const detailCourse = await this.courseRepository.findCourseWithQuestion(
      { id: course_id },
      { course_id, lesson_id, exclude: ['is_correct', 'is_deleted', 'created_at', 'updated_at', 'question_id'] },
    );

    if (!detailCourse) {
      throw new BaseError(ERROR_CODE.COURSE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const { questions } = detailCourse;
    const totalQuestionBank = questions.length;
    const { quiz } = lesson;
    const { total_time, total_question: totalQuestion } = quiz;
    const listIndex = [];
    for (let i = 1; i < totalQuestionBank; i++) {
      listIndex.push(i);
    }
    const resultId = uuidv4();
    const listQuestionResponse = [];
    const listQuestionQuiz = [];
    for (let i = 0; i < totalQuestion; i++) {
      const randomIndex = Math.floor(Math.random() * listIndex.length);
      const randomNumber = listIndex.splice(randomIndex, 1)[0];
      const questionSelected = questions[randomNumber];
      listQuestionResponse.push(questionSelected);
      console.log(questionSelected);
      listQuestionQuiz.push({ result_id: resultId, question_id: questionSelected.id });
    }

    await this.quizQuestionRepository.bulkCreate(listQuestionQuiz);
    return listQuestionResponse;
  }
}
