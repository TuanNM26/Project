import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../../BaseController';
import { ILessonService } from '../service/Lesson.service.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AuthGuard } from '../../../guards/auth.guard';
import { UserRoles } from '../../user/enum/User.enum';
import { Roles } from '../../../decorators/role.decorator';
import { PayloadCreateLessonDto, UpdateLessonInfoDto } from '../dto/Lesson.dto';

@Controller('/lesson')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Lesson')
export class LessonController extends BaseController {
  constructor(@Inject(ILessonService) private readonly lessonService: ILessonService) {
    super();
  }

  @Post('')
  @Roles(UserRoles.EXPERT)
  @UseInterceptors(FileInterceptor('content'))
  @ApiOperation({ summary: 'Create new lesson' })
  async createNewLesson(
    @Req() request: Request,
    @Res() response: Response,
    @Body() payload: PayloadCreateLessonDto,
    @UploadedFile() content: Express.Multer.File,
  ) {
    try {
      const { user } = request;
      const result = await this.lessonService.createLesson(payload, user.id, content);
      return this.created(response, result);
    } catch (error) {
      console.log(error);
      return this.fail(response, error);
    }
  }

  @Put('update-info/:id')
  @Roles(UserRoles.EXPERT)
  async updateInfoLesson(
    @Res() response: Response,
    @Req() request: Request,
    @Body() payload: UpdateLessonInfoDto,
    @Param('id') lessonId: string,
  ) {
    try {
      const message = await this.lessonService.updateLessonInfo(lessonId, payload);
      return this.ok(response, { message });
    } catch (error) {
      return this.fail(response, error);
    }
  }

  @Put('update-content/:id')
  @Roles(UserRoles.EXPERT)
  @UseInterceptors(FileInterceptor('content'))
  async updateContentLesson(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') lessonId: string,
    @UploadedFile() content: Express.Multer.File,
  ) {
    try {
      const message = await this.lessonService.updateContentLesson(lessonId, content);
      return this.ok(response, { message });
    } catch (error) {
      return this.fail(response, error);
    }
  }
}
