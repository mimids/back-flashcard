import { Injectable } from '@nestjs/common';
import { resolve } from 'path/posix';
import { retry } from 'rxjs';
import { Answer } from 'src/interfaces/answer.interface';
import { Card } from 'src/interfaces/card.interface';
import { Message } from 'src/interfaces/messageinterface';

@Injectable()
export class CardsService {

    answers: Answer[] =[]
    
    cards = [
            { id: 1, question: 'what is the language of the web?', answer: 'Javascript' },
            { id: 2, question: 'what is the language of the web?', answer: 'Javascript' },
            { id: 3, question: 'what is the language of the web?', answer: 'Javascript' },
            { id: 4, question: 'what is the coolest job?', answer: 'Programmer' }
        ];
    getCards(): Promise<Card[]> {
        return new Promise(resolve => {
            resolve(this.selectCardsUseFailedToAnswer());
        })
    }

    selectCardsUseFailedToAnswer(){
        // this first time, send all cards as user didn't have a chance to answer right or wrong
        if (this.answers.length === 0) return this.cards;
        const cardsUserFailedToAnswer = this.answers.filter(c => c.isRight === false);
        return cardsUserFailedToAnswer.map(c => c.card);
    }

    saveAnswer(answers):Promise<Message>{

        return new Promise(resolve => {
            this.answers = answers;
            resolve({msg: 'answers saved', date: new Date().toISOString()})

        })
    }
    resetGame():Promise<Message>{
        return new Promise(resolve => {
            this.answers = [];
            resolve({msg: 'new game', date: new Date().toISOString()})

        })
    }
}
