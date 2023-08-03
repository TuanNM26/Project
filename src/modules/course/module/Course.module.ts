import { forwardRef, Module } from '@nestjs/common';
import { CourseController } from '../controller/Course.controller';
import { ICourseService } from '../service/Course.interface.service';
import { CourseImplementationService } from '../service/Course.implementation.service';
import { ICourseRepository } from '../repository/Course.interface.repository';
import { CourseImplementationRepository } from '../repository/Course.implementation.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CourseModel } from '../model/Course.model';
import { v4 as uuidv4 } from 'uuid';
import { LessonModule } from '../../lesson/module/lesson.module';

@Module({
  imports: [
    SequelizeModule.forFeature([CourseModel]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uuid = uuidv4();
          req.body.id = uuid;
          cb(null, `/courses/${uuid}${extname(file.originalname)}`);
        },
      }),
    }),
    forwardRef(() => LessonModule),
  ],
  providers: [
    { provide: ICourseService, useClass: CourseImplementationService },
    {
      provide: ICourseRepository,
      useClass: CourseImplementationRepository,
    },
  ],
  controllers: [CourseController],
  exports: [ICourseRepository, ICourseService],
})
export class CourseModule {}
