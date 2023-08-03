import { Test, TestingModule } from '@nestjs/testing';
import { CourseImplementationRepository } from '../repository/Course.implementation.repository';

describe('CourseRepository', () => {
  let service: CourseImplementationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseImplementationRepository],
    }).compile();

    service = module.get<CourseImplementationRepository>(CourseImplementationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
