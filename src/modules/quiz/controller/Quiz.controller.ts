import { Body, Controller, Get, Inject, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../guards/auth.guard';
import { BaseController } from '../../../BaseController';
import { Roles } from '../../../decorators/role.decorator';
import { UserRoles } from '../../user/enum/User.enum';
import { Request, Response } from 'express';
import { CreateQuizDto, PayloadUpdateInfoQuiz, QueryQuizDto } from '../dto/Quiz.dto';
import { IQuizService } from '../service/Quiz.service.interface';

@Controller('/quiz')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Quiz')
export class QuizController extends BaseController {
  constructor(@Inject(IQuizService) private readonly quizService: IQuizService) {
    super();
  }

  @Post('')
  @Roles(UserRoles.EXPERT)
  async createNewQuiz(@Req() request: Request, @Res() response: Response, @Body() payload: CreateQuizDto) {
    try {
      const { user } = request;
      const result = await this.quizService.createNewQuiz(payload, user.id);
      return this.created(response, result);
    } catch (error) {
      return this.fail(response, error);
    }
  }

  @Get('')
  @Roles(UserRoles.USER, UserRoles.EXPERT)
  async getDetailQuiz(@Req() request: Request, @Res() response: Response, @Query() filter: QueryQuizDto) {
    try {
      const result = await this.quizService.getDetailQuiz(filter);
      return this.ok(response, result);
    } catch (error) {
      return this.fail(response, error);
    }
  }

  @Put(':id')
  @Roles(UserRoles.EXPERT)
  async updateQuiz(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: string,
    @Body() payload: PayloadUpdateInfoQuiz,
  ) {
    try {
      const message = await this.quizService.updateInfoQuiz({ id }, payload);
      return this.ok(response, { message });
    } catch (error) {
      return this.fail(response, error);
    }
  }
}
