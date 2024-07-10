import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestError, DBError } from 'src/global/errorClass';
import { Transaction } from 'src/schemas/transaction.schema';
import { Wallet } from 'src/schemas/wallet.schema';
import { CalculateHash } from 'src/utils/blockchains';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
  ) {}

  async createNewTransaction(
    from: string,
    to: string,
    amount: number,
  ): Promise<Transaction> {
    try {
      const latestBlock = await this.transactionModel
        .findOne()
        .sort({ _id: -1 })
        .exec();

      if (!latestBlock) {
        throw new DBError(
          "Can't not find latest block!",
          'Something went wrong with DB',
        );
      }

      const fromWallet = await this.walletModel.findOne({ address: from });
      const toWallet = await this.walletModel.findOne({ address: to });

      if (!fromWallet && fromWallet.amountMC < amount) {
        throw new BadRequestError('Not enough MC or not found!', 'Bad request');
      }

      if (!toWallet) {
        throw new BadRequestError('To Wallet not Found!', 'Bad request');
      }

      const timeStamp = new Date();
      const data = { from: from, to: to, amount: amount - 2, fee: 2 };
      const hash = CalculateHash(latestBlock.toObject().hash, data, timeStamp);

      // reduce the amount in from wallet
      await this.walletModel.updateOne(
        { address: from },
        { $inc: { amountMC: -amount } },
      );
      // increment the amount in to wallet
      await this.walletModel.updateOne(
        { address: to },
        { $inc: { amountMC: amount - 2 } },
      );

      const result = await this.transactionModel.create({
        prevHash: latestBlock.toObject().hash,
        data: data,
        timeStamp: timeStamp,
        hash: hash,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async rechargeToWallet(
    address: string,
    amountUSD: number,
  ): Promise<Wallet | null> {
    try {
      const result = await this.walletModel.findOneAndUpdate(
        { address: address },
        { $inc: { amountUSD: amountUSD } },
        { new: true },
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getHistory(address: string): Promise<Transaction[]> {
    try {
      const result = await this.transactionModel.find({
        $or: [{ 'data.from': address }, { 'data.to': address }],
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async buyMCFromSystem(address: string, amount: number): Promise<Transaction> {
    try {
      const latestBlock = await this.transactionModel
        .findOne()
        .sort({ _id: -1 });

      if (!latestBlock) {
        throw new DBError(
          "Can't not find latest block!",
          'Something went wrong with DB',
        );
      }

      const data = {
        from: 'system',
        to: address,
        amount: amount * 10,
        fee: 0,
      };
      const timeStamp = new Date();

      const hash = CalculateHash(latestBlock.toObject().hash, data, timeStamp);

      const result = await this.transactionModel.create({
        prevHash: latestBlock.toObject().hash,
        data: data,
        timeStamp: timeStamp,
        hash: hash,
      });

      // 1$ is 10MC
      await this.walletModel.updateOne(
        { address: address },
        { $inc: { amountMC: amount * 10, amountUSD: -amount } },
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}
