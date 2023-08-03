import { Body, Controller, Get, Inject, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../guards/auth.guard';
import { BaseController } from '../../../BaseController';
import { IQuestionService } from '../service/Question.service.interface';
import { Roles } from '../../../decorators/role.decorator';
import { UserRoles } from '../../user/enum/User.enum';
import { Request, Response } from 'express';
import { CreateQuestionDto } from '../dto/Question.dto';
import { Sequelize } from 'sequelize-typescript';

@Controller('/question')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Question')
export class QuestionController extends BaseController {
  constructor(
    @Inject(IQuestionService) private readonly questionService: IQuestionService,
    private sequelize: Sequelize,
  ) {
    super();
  }

  @Post('')
  @Roles(UserRoles.EXPERT)
  async createNewQuestion(@Res() response: Response, @Req() request: Request, @Body() payload: CreateQuestionDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const message = await this.questionService.createQuestion(payload, transaction);
      return this.created(response, { message });
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return this.fail(response, error);
    }
  }

  @Post('bulk-insert')
  @Roles(UserRoles.EXPERT, UserRoles.USER)
  async bulkInsertQuestion(@Res() response: Response, @Req() request: Request, @Body() payload) {
    const transaction = await this.sequelize.transaction();
    try {
      const { questions } = payload;
      console.log(questions);
      const message = await this.questionService.bulkInsertQuestion(questions, transaction);
      return this.created(response, { message });
    } catch (error) {
      await transaction.rollback();
      return this.fail(response, error);
    }
  }

  @Get(':id')
  @Roles(UserRoles.EXPERT, UserRoles.USER)
  async getQuestion(@Res() response: Response, @Req() request: Request, @Param('id') questionId: string) {
    try {
      const message = await this.questionService.getQuestionDetail(questionId);
      return this.created(response, { message });
    } catch (error) {
      return this.fail(response, error);
    }
  }
}
