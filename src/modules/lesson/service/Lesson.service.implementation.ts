import { Inject, Injectable } from '@nestjs/common';
import { ILessonService } from './Lesson.service.interface';
import { ILessonRepository } from '../repository/Lesson.repository.interface';
import { CreateLessonDto, UpdateLessonInfoDto } from '../dto/Lesson.dto';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';
import { ICourseRepository } from '../../course/repository/Course.interface.repository';
import { LessonModel } from '../model/Lesson.model';

@Injectable()
export class LessonServiceImplementation implements ILessonService {
  constructor(
    @Inject(ILessonRepository) private readonly lessonRepository: ILessonRepository,
    @Inject(ICourseRepository) private readonly courseRepository: ICourseRepository,
  ) {}

  async createLesson(payload: CreateLessonDto, userId: string, contentFile: any): Promise<LessonModel> {
    const { course_id: courseId, created_by: createdBy } = payload;
    if (createdBy !== userId) {
      throw new BaseError(ERROR_CODE.INVALID_ID_USER, STATUS_CODE.BAD_REQUEST);
    }
    const course = await this.courseRepository.getDetail(courseId);
    if (!course) {
      throw new BaseError(ERROR_CODE.COURSE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (course.created_by !== createdBy) {
      throw new BaseError(ERROR_CODE.INVALID_ID_USER, STATUS_CODE.BAD_REQUEST, 'User not owner of course');
    }

    const listLessonOfCourse = await this.lessonRepository.findAllByCondition({ course_id: courseId }, [
      ['index', 'DESC'],
    ]);
    console.log(listLessonOfCourse[0]);
    const lastIndex = listLessonOfCourse[0]?.index ? listLessonOfCourse[0]?.index : 0;

    payload.index = lastIndex + 1;

    payload.content = `http://localhost:4000/${contentFile.path}`;

    return this.lessonRepository.create(payload);
  }

  async updateContentLesson(lessonId: string, contentFile: any): Promise<string> {
    const affectedCount = await this.lessonRepository.updateLesson(
      { id: lessonId },
      { content: `http://localhost:4000/${contentFile.path}` },
    );
    if (affectedCount[0] === 0) {
      throw new BaseError(ERROR_CODE.UPDATE_LESSON_FAIL, STATUS_CODE.BAD_REQUEST);
    }

    return 'Update lesson info success!';
  }

  async updateLessonInfo(lessonId: string, payload: UpdateLessonInfoDto): Promise<string> {
    const { index: indexInput, name, description } = payload;
    const lesson = await this.lessonRepository.findByCondition({ id: lessonId });
    if (!lesson) {
      throw new BaseError(ERROR_CODE.LESSON_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const { index: oldIndex, course_id } = lesson;
    if (oldIndex === indexInput) {
      const affectedCount = await this.lessonRepository.updateLesson({ id: lessonId }, { name, description });
      if (affectedCount[0] === 0) {
        throw new BaseError(ERROR_CODE.UPDATE_LESSON_FAIL, STATUS_CODE.BAD_REQUEST);
      }

      return 'Update lesson info success!';
    } else {
      const listLessonOfCourse = await this.lessonRepository.findAllByCondition({ course_id }, [['index', 'DESC']]);
      const lastIndex = listLessonOfCourse[0].index;
      let listLessonUpdate = [];
      if (indexInput > lastIndex) {
        throw new BaseError(ERROR_CODE.INVALID_INDEX_LESSON, STATUS_CODE.BAD_REQUEST);
      }
      if (oldIndex < indexInput) {
        listLessonOfCourse.forEach((lesson) => {
          if (lesson.index > oldIndex && lesson.index <= indexInput) {
            listLessonUpdate.push({ condition: { id: lesson.id }, dataUpdate: { index: lesson.index - 1 } });
          }
        });
      } else {
        listLessonOfCourse.forEach((lesson) => {
          if (lesson.index < oldIndex && lesson.index >= indexInput) {
            listLessonUpdate.push({ condition: { id: lesson.id }, dataUpdate: { index: lesson.index + 1 } });
          }
        });
      }

      const lessonUpdate = listLessonOfCourse.find((el) => el.id === lessonId);
      listLessonUpdate.push({
        condition: {
          id: lessonUpdate.id,
        },
        dataUpdate: {
          index: indexInput,
          name,
          description,
        },
      });
      await Promise.all(listLessonUpdate.map((el) => this.lessonRepository.updateLesson(el.condition, el.dataUpdate)));
      listLessonUpdate = null;
      return 'Update index lesson success!';
    }

    return 'Update index lesson success!';
  }
}
