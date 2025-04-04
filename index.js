#!usr/bin/env node

import * as p from '@clack/prompts'
import color from 'picocolors'
import { setTimeout } from 'timers/promises'

class Question{
    constructor(question , answerArray , answerIndex){
        this.question = question
        this.answerArray = answerArray
        this.answerIndex = answerIndex
    }
}

// track number of correct questions
let correctQuestions = 0;

// func to ask questions
async function askQuestion(question , answers, answerIndex){
    // options array to display
    let options = [];

    // loop through our answer to create options
    answers.forEach((answer) => {
        options.push({ value: answer , label: answer });
    })

    //
    let answer = await p.select({
        message: question,
        options: options,
        initialValue: '1'
    })

    // loading spinner to imitate data processing
    const s = p.spinner()
    s.start();
    await setTimeout(1000)
    s.stop();

    if ( answer === answers[answerIndex]) {
        correctQuestions++;
    }

}


//
async function main() {
    p.intro(`${color.bgRed(color.white(`Welcome to the ${color.bold(`AnimeVerse`)} 🪄🧬`))}`)

    // Questions
    const animeQuestions = [
        new Question("Who is the main protagonist of the anime 'Naruto'?", ["Sasuke Uchiha", "Naruto Uzumaki", "Kakashi Hatake", "Sakura Haruno"], 1),
        new Question("What is the name of the pirate crew led by Monkey D. Luffy?", ["Whitebeard Pirates", "Red Hair Pirates", "Straw Hat Pirates", "Blackbeard Pirates"], 2),
        new Question("In 'Death Note', what is the name of the Shinigami who drops the Death Note?", ["Ryuk", "Rem", "Shidoh", "Sidoh"], 0),
        new Question("Which anime features a hero association and ranked heroes like Saitama?", ["My Hero Academia", "Dragon Ball Z", "One Punch Man", "Attack on Titan"], 2),
        new Question("What is Goku's Saiyan name?", ["Raditz", "Vegeta", "Kakarot", "Bardock"], 2),
        new Question("In 'Attack on Titan', what is the name of Eren's adoptive sister?", ["Sasha", "Annie", "Mikasa", "Historia"], 2),
        new Question("Which anime revolves around alchemy and the Elric brothers?", ["Black Clover", "Fullmetal Alchemist", "Bleach", "Fairy Tail"], 1),
        new Question("Who is the author of the manga 'One Piece'?", ["Tite Kubo", "Masashi Kishimoto", "Eiichiro Oda", "Akira Toriyama"], 2),
        new Question("Which anime character uses a notebook to kill people by writing their names?", ["Gon", "Light Yagami", "Itachi Uchiha", "Shinji Ikari"], 1),
        new Question("In 'Demon Slayer', what is Tanjiro’s sister’s name?", ["Mitsuri", "Shinobu", "Nezuko", "Kanae"], 2)
    ];

    //text
    p.log.message(`${color.red('No cheating 😡')}`)

    //
    const readyToPlay = await p.select({
        message: `10 Question. Ready to play😜 ? `,
        initialValue: 'Yes',
        options: [
            {value: 'Yes', label: 'Yes'},
            {value: 'No', label: 'No'},
        ]
    })

    if(readyToPlay === "Yes"){
        //begin AnimeVerse game

        // animeQuestions.forEach(({question, answerArray, answerIndex})=>{
        //     await askQuestion(question , answerArray, answerIndex);
        // })

        for ( const question of animeQuestions){
            await askQuestion(question.question, question.answerArray, question.answerIndex);
        }


        // decide what ending screen to show based on number of correct
        p.outro(color.bgCyan(color.black(`You got ${correctQuestions} questions correct`)))

        if(correctQuestions === 10){
            const s = p.spinner();
            s.start(`${color.greenBright('Generating gift card code...')}`)
            setTimeout(5000);
            s.stop();
            p.outro(`${color.bgWhite(color.black(`Code: ${color.bold(`419`)}`))}`)
        }else{

            const s = p.spinner();
            s.start();
            setTimeout(5000);
            s.stop();
            p.outro(`${color.bgRedBright(color.white(`${color.bold(`You need to get all 10 correct 🙂‍↔️`)}`))}`)

        }

    }



    p.outro(color.bgCyan(color.black(`Thank you for playing the Anime Verse 🚀`)))
}


main();