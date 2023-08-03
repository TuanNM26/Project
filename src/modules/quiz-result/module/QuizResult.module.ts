import { Module } from '@nestjs/common';
import { IQuizResultService } from '../service/QuizResult.service.interface';
import { QuizResultServiceImplementation } from '../service/QuizResult.service.implementation';
import { IQuizResultRepository } from '../repository/QuizResult.repository.interface';
import { QuizResultRepositoryImplementation } from '../repository/QuizResult.repository.implementation';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuizResultModel } from '../model/QuizResult.model';
import { QuizModule } from '../../quiz/module/Quiz.module';
import { UserModule } from '../../user/module/User.Module';
import { CourseModule } from '../../course/module/Course.module';
import { LessonModule } from '../../lesson/module/lesson.module';
import { UserCourseModule } from '../../user-course/module/UserCourse.module';
import { QuizResultController } from '../controller/QuizResult.controller';
import { QuizQuestionModule } from '../../quiz-question/module/QuizQuestion.module';

@Module({
  imports: [
    SequelizeModule.forFeature([QuizResultModel]),
    QuizModule,
    UserModule,
    CourseModule,
    LessonModule,
    UserCourseModule,
    QuizQuestionModule,
  ],
  providers: [
    {
      provide: IQuizResultService,
      useClass: QuizResultServiceImplementation,
    },
    { provide: IQuizResultRepository, useClass: QuizResultRepositoryImplementation },
  ],
  controllers: [QuizResultController],
  exports: [IQuizResultRepository, IQuizResultService],
})
export class QuizResultModule {}
