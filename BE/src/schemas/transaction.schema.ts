import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true })
  prevHash: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true })
  timeStamp: Date;

  @Prop({
    required: true,
    type: Object,
  })
  data: {
    from: string;
    to: string;
    amount: number;
    fee: number;
  };
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
