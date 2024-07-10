import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DBError } from 'src/global/errorClass';
import { Wallet } from 'src/schemas/wallet.schema';
import {
  CreateWalletAndSaveKeystoreFile,
  VerifyWalletFromKeystoreContent,
} from 'src/utils/wallet';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  async createNewWallet(password: string): Promise<Wallet> {
    try {
      const { address, keystoreFilePath, privateKey } =
        await CreateWalletAndSaveKeystoreFile(password);

      const result = await this.walletModel.create({
        address: address,
        password: password,
        keystoreFilePath: keystoreFilePath,
        privateKey: privateKey,
        amountMC: 0,
        amountUSD: 0,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async accessWallet(password: string, keystoreFileContent: any): Promise<any> {
    try {
      const { address, privateKey } = await VerifyWalletFromKeystoreContent(
        keystoreFileContent,
        password,
      );

      const result = await this.walletModel.findOne({
        address: address,
        privateKey: privateKey,
      });

      if (!result) {
        throw new DBError('Record not found', 'Something went wrong with DB');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getInformationWallet(address: string): Promise<Wallet> {
    try {
      const result = await this.walletModel.findOne({ address: address });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
