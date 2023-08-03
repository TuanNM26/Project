import { Injectable } from '@nestjs/common';
import { IQuizResultRepository } from './QuizResult.repository.interface';

@Injectable()
export class QuizResultRepositoryImplementation implements IQuizResultRepository {
  constructor() {}
}
