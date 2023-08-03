import * as express from 'express';
import { Body, Controller, Delete, Get, Inject, Logger, Param, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/BaseController';
import { AuthGuard } from '../../../guards/auth.guard';
import { IWalletService } from '../service/Wallet.interface.service';
import { Roles } from '../../../decorators/role.decorator';
import { UserRoles } from '../../user/enum/User.enum';
import { WalletUpdateDto } from '../dto/Wallet.dto';

@Controller('/wallet')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Wallet')
export class WalletController extends BaseController {
  private readonly logger = new Logger(WalletController.name);

  constructor(
    @Inject(IWalletService)
    private readonly walletService: IWalletService,
  ) {
    super();
  }

  @Roles(UserRoles.USER)
  @Get('')
  @ApiOperation({ summary: 'Get list wallet' })
  async getAllWallet(@Res() response: express.Response, @Req() request: express.Request) {
    try {
      const listWallets = await this.walletService.getListWallet();
      return this.ok(response, { listWallets });
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wallet detail' })
  async getWalletDetail(@Res() response: express.Response, @Param('id') id: string) {
    try {
      const walletDetail = await this.walletService.getDetailWallet(id);
      return this.ok(response, walletDetail);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update wallet info' })
  async updateWallet(
    @Res() response: express.Response,
    @Body() walletUpdateDto: WalletUpdateDto,
    @Param('id') id: string,
  ) {
    try {
      const message = await this.walletService.updateWallet(id, walletUpdateDto);
      return this.ok(response, message);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete wallet' })
  async deleteWallet(@Res() response: express.Response, @Param('id') id: string) {
    try {
      const message = await this.walletService.updateWallet(id, { is_deleted: true });
      return this.ok(response, message);
    } catch (error) {
      this.logger.error(error);
      return this.fail(response, error);
    }
  }
}
