import * as express from 'express';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { BaseController } from './BaseController';
import { ApiTags } from '@nestjs/swagger';

@Controller('/app')
@ApiTags('App Health Check')
export class AppController extends BaseController {
  @Get('/health-check')
  async healthCheck(@Res() response: express.Response) {
    return this.ok(response, {
      statusCode: HttpStatus.OK,
      message: 'OK',
    });
  }
}
