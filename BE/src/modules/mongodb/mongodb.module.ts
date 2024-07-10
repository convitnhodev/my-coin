import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://UchatDB:uchat@uchatcluster.deprlqm.mongodb.net/MyCoin',
    ),
  ],
})
export class MongodbModule {}
