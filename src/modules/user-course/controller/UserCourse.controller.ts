import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../guards/auth.guard';
import { BaseController } from '../../../BaseController';
import { Roles } from '../../../decorators/role.decorator';
import { UserRoles } from '../../user/enum/User.enum';
import { Request, Response } from 'express';
import { BuyCoursePayloadDto } from '../dto/UserCourse.dto';
import { IUserCourseService } from '../service/UserCourse.service.interface';
import { Sequelize } from 'sequelize-typescript';

@Controller('/user-course')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('User Course')
export class UserCourseController extends BaseController {
  constructor(
    @Inject(IUserCourseService) private readonly userCourseService: IUserCourseService,
    private sequelize: Sequelize,
  ) {
    super();
  }

  @Post('/buy')
  @Roles(UserRoles.USER)
  @ApiOperation({ summary: 'User buy course' })
  async buyCourse(@Req() request: Request, @Res() response: Response, @Body() payload: BuyCoursePayloadDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const { user } = request;
      const message = await this.userCourseService.buyCourse({ user_id: user.id, ...payload }, transaction);
      return this.ok(response, { message });
    } catch (error) {
      await transaction.rollback();
      return this.fail(response, error);
    }
  }

  @Get('')
  @Roles(UserRoles.USER)
  @ApiOperation({ summary: 'Get list course of user' })
  async getListCourse(@Req() request: Request, @Res() response: Response) {
    try {
      const { user } = request;
      const listCourses = await this.userCourseService.getListCourseOfUser(user.id);
      return this.ok(response, { listCourses });
    } catch (error) {
      return this.fail(response, error);
    }
  }
}
