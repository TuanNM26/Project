import { forwardRef, Module } from '@nestjs/common';
import { ILessonService } from '../service/Lesson.service.interface';
import { LessonServiceImplementation } from '../service/Lesson.service.implementation';
import { ILessonRepository } from '../repository/Lesson.repository.interface';
import { LessonRepositoryImplementation } from '../repository/Lesson.repository.implementation';
import { LessonController } from '../controller/Lesson.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonModel } from '../model/Lesson.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';
import { CourseModule } from '../../course/module/Course.module';

@Module({
  imports: [
    SequelizeModule.forFeature([LessonModel]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uuid = uuidv4();
          console.log(uuid);
          req.body.id = uuid;
          cb(null, `/lessons/${uuid}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf)$/)) {
          return cb(
            new BaseError(ERROR_CODE.INVALID_FILE, STATUS_CODE.BAD_REQUEST, 'Only PDF files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
    forwardRef(() => CourseModule),
  ],
  providers: [
    {
      provide: ILessonService,
      useClass: LessonServiceImplementation,
    },
    {
      provide: ILessonRepository,
      useClass: LessonRepositoryImplementation,
    },
  ],
  controllers: [LessonController],
  exports: [ILessonRepository, ILessonService],
})
export class LessonModule {}
