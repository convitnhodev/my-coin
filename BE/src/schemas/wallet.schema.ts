import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Enable automatic createdAt and updatedAt fields
export class Wallet extends Document {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true })
  privateKey: string;

  @Prop({ required: true, select: false }) // Exclude from default query projection
  password: string;

  @Prop({ required: true })
  keystoreFilePath: string;

  @Prop({ default: 0 })
  amountUSD: number;

  @Prop({ default: 0 })
  amountMC: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

// Define a custom transform to omit sensitive fields like 'password' from JSON
WalletSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
