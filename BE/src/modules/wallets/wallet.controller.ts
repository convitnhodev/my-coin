import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus } from 'src/global/globalEnum';
import { AccessWalletDto, CreateWallet } from 'src/dto/wallet.dto';
import { ErrorResponse } from 'src/utils/errorHandle';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(
    @Body() createWallet: CreateWallet,
  ): Promise<ResponseData<any>> {
    try {
      const result = await this.walletService.createNewWallet(
        createWallet.password,
      );
      return new ResponseData(result, HttpStatus.SUCCESS, 'OK', null);
    } catch (error) {
      return ErrorResponse(error);
    }
  }

  @Post('/access')
  async accessWallet(
    @Body() accessWallet: AccessWalletDto,
  ): Promise<ResponseData<any>> {
    try {
      const result = await this.walletService.accessWallet(
        accessWallet.password,
        accessWallet.keystoreFileContent,
      );
      return new ResponseData(result, HttpStatus.SUCCESS, 'OK', null);
    } catch (error) {
      return ErrorResponse(error);
    }
  }

  @Get('/:address')
  async getWallet(
    @Param('address') address: string,
  ): Promise<ResponseData<any>> {
    try {
      const result = await this.walletService.getInformationWallet(address);
      return new ResponseData(result, HttpStatus.SUCCESS, 'OK', null);
    } catch (error) {
      return ErrorResponse(error);
    }
  }
}
