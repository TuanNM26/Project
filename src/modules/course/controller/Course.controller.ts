import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../../BaseController';
import { ICourseService } from '../service/Course.interface.service';
import { UserRoles } from '../../user/enum/User.enum';
import { Roles } from '../../../decorators/role.decorator';
import { Request, Response } from 'express';
import { CreateCourseDto, ListCourseFilerDto, MyCoursesFilerDto } from '../dto/Course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../../guards/auth.guard';

@Controller('/courses')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Course')
export class CourseController extends BaseController {
  private readonly logger = new Logger(CourseController.name);

  constructor(@Inject(ICourseService) private readonly courseService: ICourseService) {
    super();
  }

  @Post('')
  @Roles(UserRoles.USER, UserRoles.EXPERT)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create new course' })
  async createNewCourse(
    @Res() response: Response,
    @Req() request: Request,
    @Body() payload: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const { user } = request;
      const expectedCourse = await this.courseService.createCourse(payload, user.id, file);
      return this.created(response, expectedCourse);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Get('')
  @Roles(UserRoles.ADMIN, UserRoles.EXPERT, UserRoles.USER)
  @ApiOperation({ summary: 'Get list course' })
  async getListCourse(@Res() response: Response, @Req() request: Request, @Query() filter: ListCourseFilerDto) {
    try {
      const result = await this.courseService.getListCourse(filter);
      return this.ok(response, result);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Get('my-courses')
  @Roles(UserRoles.ADMIN, UserRoles.EXPERT, UserRoles.USER)
  @ApiOperation({ summary: 'Get list course of user' })
  async getListCourseOfUser(@Res() response: Response, @Req() request: Request, @Query() filter: MyCoursesFilerDto) {
    try {
      const { user } = request;
      filter.created_by = user.id;
      const result = await this.courseService.getListCourseOfUser(filter);
      return this.ok(response, result);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN, UserRoles.EXPERT, UserRoles.USER)
  @ApiOperation({ summary: 'Get detail course' })
  async getDetailCourse(@Res() response: Response, @Req() request: Request, @Param('id') id: string) {
    try {
      const course = await this.courseService.getDetailCourse(id);
      return this.ok(response, course);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Get(':id/lessons')
  @Roles(UserRoles.ADMIN, UserRoles.EXPERT, UserRoles.USER)
  @ApiOperation({ summary: 'Get list lesson of course' })
  async getListLessonOfCourse(@Res() response: Response, @Req() request: Request, @Param('id') courseId: string) {
    try {
      const result = await this.courseService.getListLessonOfCourse(courseId);
      return this.ok(response, { lessons: result });
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }
}
