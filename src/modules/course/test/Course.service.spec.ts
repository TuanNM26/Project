import { Test, TestingModule } from '@nestjs/testing';
import { CourseImplementationService } from '../service/Course.implementation.service';
import { ICourseRepository } from '../repository/Course.interface.repository';
import { ICourseService } from '../service/Course.interface.service';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';

const manyCourse = [
  {
    id: '3d7b6063-347f-4332-8492-41dccb78adca',
    created_by: 'ca584e5e-f747-4830-add4-cb42646d9319',
    name: 'loctest5',
    image: 'localhost:4000/uploads/courses/3d7b6063-347f-4332-8492-41dccb78adca.jpg',
    description: null,
    price: 10,
    status: 'Draft',
    created_at: '2023-06-26T10:23:35.000Z',
    updated_at: '2023-06-26T10:23:35.000Z',
  },
  {
    id: '56cd799d-0f39-44a5-92bf-65d199d19353',
    created_by: 'ca584e5e-f747-4830-add4-cb42646d9319',
    name: 'loctest',
    image: 'localhost:4000/uploads/courses/56cd799d-0f39-44a5-92bf-65d199d19353.jpg',
    description: null,
    price: 10,
    status: 'Draft',
    created_at: '2023-06-26T10:22:11.000Z',
    updated_at: '2023-06-26T10:22:11.000Z',
  },
];

const oneCourse = {
  id: '3d7b6063-347f-4332-8492-41dccb78adca',
  created_by: 'ca584e5e-f747-4830-add4-cb42646d9319',
  name: 'loctest5',
  image: 'localhost:4000/uploads/courses/3d7b6063-347f-4332-8492-41dccb78adca.jpg',
  description: null,
  price: 10,
  status: 'Draft',
  created_at: '2023-06-26T10:23:35.000Z',
  updated_at: '2023-06-26T10:23:35.000Z',
};
describe('CourseService', () => {
  let service: ICourseService;
  let repository: ICourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ICourseService, useClass: CourseImplementationService },
        {
          provide: ICourseRepository,
          useValue: {
            getDetail: jest.fn((x) => {
              if (x == '3d7b6063-347f-4332-8492-41dccb78adca') {
                return oneCourse;
              }
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ICourseService>(ICourseService);
    repository = module.get<ICourseRepository>(ICourseRepository);
  });

  describe('Test get course detail', () => {
    it('Success', async () => {
      const course = await service.getDetailCourse('ca584e5e-f747-4830-add4-cb42646d9319');
      expect(course).toEqual(oneCourse);
    });

    it('Not found', async () => {
      try {
        const course = await service.getDetailCourse('ca584e5e-f747-4830-add4');
      } catch (error) {
        expect(error).toEqual(new BaseError(ERROR_CODE.COURSE_NOT_FOUND, STATUS_CODE.BAD_REQUEST));
      }
    });
  });

  describe('Get all courses', () => {
    it('Success', async () => {
      const course = await service.getListCourse();
      expect(course).toEqual(manyCourse);
    });
  });
});
