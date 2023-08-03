import { Body, Controller, Inject, Logger, Param, Post, Res } from '@nestjs/common';
import { BaseController } from 'src/BaseController';
import { IAuthService } from '../service/Auth.service.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as express from 'express';
import { UserModel } from 'src/modules/user/model/User.model';
import { ChangePasswordDto, ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from '../dto/auth.dto';
import { Sequelize } from 'sequelize-typescript';

@Controller('/auth')
@ApiTags('Authentication')
export class AuthController extends BaseController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject(IAuthService)
    private authService: IAuthService,
    private sequelize: Sequelize,
  ) {
    super();
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'OK.', type: UserModel })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async register(@Body() payload: RegisterDto, @Res() response: express.Response) {
    const transaction = await this.sequelize.transaction();
    try {
      const expectedUser = await this.authService.register(payload, transaction);
      return this.created(response, expectedUser);
    } catch (error) {
      this.logger.error(error);
      await transaction.rollback();
      return this.fail(response, error);
    }
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() payload: LoginDto, @Res() response: express.Response) {
    try {
      const { username, password } = payload;
      const result = await this.authService.login(username, password);
      return this.ok(response, result);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Post('/forgot-password')
  @ApiOperation({ summary: 'Forgot password' })
  async forgotPassword(@Body() payload: ForgotPasswordDto, @Res() response: express.Response) {
    try {
      const message = await this.authService.forgotPassword(payload);
      return this.ok(response, { message });
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Post('/reset-password')
  @ApiOperation({ summary: 'Reset password' })
  async resetPassword(@Body() payload: ResetPasswordDto, @Res() response: express.Response) {
    try {
      const { newPassword } = payload;
      const message = await this.authService.resetPassword(payload);
      return this.ok(response, { message });
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Post('/change-password/:id')
  @ApiOperation({ summary: 'Change password' })
  async changePassword(
    @Body() payload: ChangePasswordDto,
    @Res() response: express.Response,
    @Param('id') userId: string,
  ) {
    try {
      const message = await this.authService.changePassword(userId, payload);
      return this.ok(response, { message });
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }
}
