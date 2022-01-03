import { Body, Controller, Get, Post } from '@nestjs/common';
import { Card } from 'src/interfaces/card.interface';
import { CardsService } from './cards.service';
import { FlagDto } from './dto/flag.dto';
import { SaveAnswerDto } from './dto/save.answer.dto';

@Controller('cards')
export class CardsController {

    constructor(private cardsService: CardsService){}
    
    @Get()
    async getCards(): Promise<Card[]> {
        const cards = await this.cardsService.getCards();
        return cards;

    }
    @Post()
    async saveAnswer(@Body() saveAnswersDto: SaveAnswerDto){
        const result = await this.cardsService.saveAnswer(saveAnswersDto)
        console.log('save', result);
        return result;
    }
    @Post('reset')
    async resetGame(@Body() flag: FlagDto){
        if(flag.reset){
            const result = await this.cardsService.resetGame();
            return result;
        }else{
            return {msg : 'we did nothing',date : new Date().toISOString()}
        }

    }
}