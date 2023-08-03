import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuizModel } from '../model/Quiz.model';
import { QuizController } from '../controller/Quiz.controller';
import { IQuizService } from '../service/Quiz.service.interface';
import { QuizServiceImplementation } from '../service/Quiz.service.implementation';
import { IQuizRepository } from '../repository/Quiz.repository.interface';
import { QuizRepositoryImplementation } from '../repository/Quiz.repository.implementation';
import { LessonModule } from '../../lesson/module/lesson.module';
import { QuestionModule } from '../../question/module/Question.module';

@Module({
  imports: [SequelizeModule.forFeature([QuizModel]), LessonModule, QuestionModule],
  providers: [
    {
      provide: IQuizService,
      useClass: QuizServiceImplementation,
    },
    { provide: IQuizRepository, useClass: QuizRepositoryImplementation },
  ],
  controllers: [QuizController],
  exports: [IQuizRepository, IQuizService],
})
export class QuizModule {}
