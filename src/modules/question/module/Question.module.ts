import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionModel } from '../model/Question.model';
import { AnswerModel } from '../model/Answer.model';
import { IQuestionService } from '../service/Question.service.interface';
import { QuestionServiceImplementation } from '../service/Question.service.implementation';
import { IQuestionRepository } from '../repository/Question.repository.interface';
import { QuestionRepositoryImplementation } from '../repository/Question.repository.implementation';
import { QuestionController } from '../controller/Question.controller';
import { UserModule } from '../../user/module/User.Module';
import { CourseModule } from '../../course/module/Course.module';
import { LessonModule } from '../../lesson/module/lesson.module';

@Module({
  imports: [SequelizeModule.forFeature([QuestionModel, AnswerModel]), UserModule, CourseModule, LessonModule],
  providers: [
    {
      provide: IQuestionService,
      useClass: QuestionServiceImplementation,
    },
    {
      provide: IQuestionRepository,
      useClass: QuestionRepositoryImplementation,
    },
  ],
  controllers: [QuestionController],
  exports: [IQuestionRepository, IQuestionService],
})
export class QuestionModule {}
