import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { CardsController } from './cards/cards.controller';
import { CardsService } from './cards/cards.service';

@Module({
  imports: [CardsModule],
  controllers: [AppController, CardsController],
  providers: [AppService,CardsService],
})
export class AppModule {}
