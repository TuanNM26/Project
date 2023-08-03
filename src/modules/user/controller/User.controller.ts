import * as express from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
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
import { BaseController } from 'src/BaseController';
import { IUserService } from '../service/User.interface.service';

import { UserUpdateDto } from '../dto/User.dto';
import { UserRoles } from '../enum/User.enum';
import { Roles } from '../../../decorators/role.decorator';
import { AuthGuard } from '../../../guards/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/user')
@ApiTags('User')
export class UserController extends BaseController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {
    super();
  }

  @Get('')
  @Roles(UserRoles.USER)
  @ApiOperation({ summary: 'Get list user' })
  async getAllUser(@Res() response: express.Response, @Req() request: express.Request) {
    try {
      const listUser = await this.userService.getAll();
      return this.ok(response, { listUser: listUser.map((user) => user.transformToResponse()) });
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Get('me')
  @Roles(UserRoles.USER, UserRoles.EXPERT, UserRoles.ADMIN)
  @ApiOperation({ summary: 'Get user detail' })
  async getUserDetail(@Res() response: express.Response, @Req() request: express.Request) {
    try {
      const { user } = request;
      const userDetail = await this.userService.getDetailUser(user.id);
      return this.ok(response, userDetail.transformToResponse());
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Get(':id')
  @Roles(UserRoles.USER, UserRoles.EXPERT, UserRoles.ADMIN)
  @ApiOperation({ summary: 'Get user by ID' })
  async getUserById(@Res() response: express.Response, @Req() request: express.Request, @Param('id') id: string) {
    try {
      const userDetail = await this.userService.getDetailUser(id);
      return this.ok(response, userDetail.transformToResponse());
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Put(':id')
  @Roles(UserRoles.USER, UserRoles.EXPERT, UserRoles.ADMIN)
  @ApiOperation({ summary: 'Update user info' })
  async updateUser(@Res() response: express.Response, @Body() userUpdateDto: UserUpdateDto, @Param('id') id: string) {
    try {
      const message = await this.userService.updateUser(id, userUpdateDto);
      return this.ok(response, message);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Delete user' })
  async deleteUser(@Res() response: express.Response, @Param('id') id: string) {
    try {
      const message = await this.userService.updateUser(id, { is_deleted: true });
      return this.ok(response, message);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Post(':id/change-avatar')
  @Roles(UserRoles.USER, UserRoles.EXPERT, UserRoles.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Change avatar' })
  async changeAvatar(
    @Res() response: express.Response,
    @Param('id') id: string,
    @Req() request: express.Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const message = await this.userService.updateUser(id, { avatar: `http://localhost:4000/${file.path}` });
      return this.ok(response, { message });
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }
}
