import { IQuizRepository } from './Quiz.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { QuizModel } from '../model/Quiz.model';
import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from '../dto/Quiz.dto';

@Injectable()
export class QuizRepositoryImplementation implements IQuizRepository {
  constructor(@InjectModel(QuizModel) private quiz: typeof QuizModel) {}

  async create(payload: CreateQuizDto): Promise<QuizModel> {
    return this.quiz.create(payload);
  }

  async getDetail(condition: any): Promise<QuizModel> {
    return this.quiz.findOne({ where: condition });
  }

  async updateQuiz(condition: any, payload: any): Promise<[affectedCount: number]> {
    return this.quiz.update(payload, { where: condition });
  }
}
