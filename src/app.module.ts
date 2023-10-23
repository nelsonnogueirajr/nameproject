import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module'; // Importe o CatsModule
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/catsBase'), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
