import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus } from 'src/global/globalEnum';
import { ErrorResponse } from 'src/utils/errorHandle';
import {
  BuyMCFromSystemDto,
  RechargeDto,
  TransactionCreateDto,
} from 'src/dto/transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getHistory(
    @Query('address') address: string,
  ): Promise<ResponseData<any>> {
    try {
      const result = await this.transactionService.getHistory(address);
      return new ResponseData(result, HttpStatus.SUCCESS, 'OK', null);
    } catch (error) {
      return ErrorResponse(error);
    }
  }

  @Post()
  async createNewTransaction(
    @Body() transactionCreated: TransactionCreateDto,
  ): Promise<ResponseData<any>> {
    try {
      const result = await this.transactionService.createNewTransaction(
        transactionCreated.from,
        transactionCreated.to,
        transactionCreated.amount,
      );
      return new ResponseData(result, HttpStatus.SUCCESS, 'OK', null);
    } catch (error) {
      return ErrorResponse(error);
    }
  }

  @Post('/recharge')
  async rechargeWallet(
    @Body() rechargeDto: RechargeDto,
  ): Promise<ResponseData<any>> {
    try {
      const result = await this.transactionService.rechargeToWallet(
        rechargeDto.address,
        rechargeDto.amount,
      );
      return new ResponseData(result, HttpStatus.SUCCESS, 'OK', null);
    } catch (error) {
      return ErrorResponse(error);
    }
  }

  @Post('/mine')
  async buyMCFromSystem(
    @Body() buyMCFromSystemDto: BuyMCFromSystemDto,
  ): Promise<ResponseData<any>> {
    try {
      const result = await this.transactionService.buyMCFromSystem(
        buyMCFromSystemDto.address,
        buyMCFromSystemDto.amount,
      );
      return new ResponseData(result, HttpStatus.SUCCESS, 'OK', null);
    } catch (error) {
      return ErrorResponse(error);
    }
  }
}
