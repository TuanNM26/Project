import { Injectable } from '@nestjs/common';
import { IQuizQuestionRepository } from './QuizQuestion.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { QuizQuestionModel } from '../model/QuizQuestion.model';
import { QuizQuestionDto } from '../dto/QuizQuestion.dto';

@Injectable()
export class QuizQuestionRepositoryImplementation implements IQuizQuestionRepository {
  constructor(@InjectModel(QuizQuestionModel) private quizQuestion: typeof QuizQuestionModel) {}

  async bulkCreate(payload: QuizQuestionDto[]): Promise<QuizQuestionModel[]> {
    return this.quizQuestion.bulkCreate(payload);
  }
}
