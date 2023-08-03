import { Body, Controller, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../guards/auth.guard';
import { BaseController } from '../../../BaseController';
import { IQuizResultService } from '../service/QuizResult.service.interface';
import { Roles } from '../../../decorators/role.decorator';
import { UserRoles } from '../../user/enum/User.enum';
import * as express from 'express';
import { StartQuizPayloadDto } from '../dto/QuizResult.dto';

@Controller('/quiz-result')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Quiz result')
export class QuizResultController extends BaseController {
  constructor(@Inject(IQuizResultService) private readonly quizResultService: IQuizResultService) {
    super();
  }

  @Post('start')
  @Roles(UserRoles.USER)
  @ApiOperation({ summary: 'Start quiz of lesson' })
  async startQuiz(
    @Res() response: express.Response,
    @Req() request: express.Request,
    @Body() payload: StartQuizPayloadDto,
  ) {
    try {
      const { user } = request;
      const result = await this.quizResultService.startQuiz({ user_id: user.id, ...payload });
      return this.ok(response, { result });
    } catch (error) {
      console.log(error);
      return this.fail(response, error);
    }
  }
}
