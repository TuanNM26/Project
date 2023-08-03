import { Module } from '@nestjs/common';
import { IQuizQuestionRepository } from '../repository/QuizQuestion.repository.interface';
import { QuizQuestionRepositoryImplementation } from '../repository/QuizQuestion.repository.implementation';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuizQuestionModel } from '../model/QuizQuestion.model';

@Module({
  imports: [SequelizeModule.forFeature([QuizQuestionModel])],
  providers: [{ provide: IQuizQuestionRepository, useClass: QuizQuestionRepositoryImplementation }],
  controllers: [],
  exports: [IQuizQuestionRepository],
})
export class QuizQuestionModule {}
