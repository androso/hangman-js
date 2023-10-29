// Tendremos que mantener registro del estado del juego
// Cuántas vidas me quedán?
// Teclas que he presionado (de esta manera impido que se presionen de nuevo)
// La palabra que ha sido escogida 
// placeholders y letras que han sido adivinadas de esta palabra
// Tiempo limite para resolver el juego
// Resultado de la partida

import { wordList } from "./data/dictionary.js";

export default class HangmanGameState {
    constructor(word) {
        this.word = word.toUpperCase();
        this.livesLeft = 7;
        this.placeholder = word.split("").map(letter => "_")
        this.splittedWord = word.split("")
        this.currentState = "PLAYING"
        this.lettersPressed = [];
        this.observers = []; // renderer functions to which we're gonna pass data each time it gets changed
    }

    notify() {
        this.observers.forEach(observer => observer.render(this));
    }

    guess(guessingLetter) {
        guessingLetter = guessingLetter.toUpperCase();
        if (this.placeholder.includes(guessingLetter)) {
            return false;
        };

        const currentWord = this.splittedWord;

        if (currentWord.includes(guessingLetter)) {
            const indexes = currentWord.map((lett, index) => ({
                letter: lett,
                match: lett === guessingLetter,
                index
            })).filter(infoBlock => infoBlock.match === true).map(block => block.index);

            const newPlaceholder = this.placeholder.map((underscore, index) => {
                if (indexes.includes(index)) {
                    return guessingLetter
                } else {
                    return underscore
                }
            })
            this.placeholder = newPlaceholder;
        } else {
            this.livesLeft -= 1;
            console.log(`${guessingLetter} no esta en la palabra`)
        }
        this.lettersPressed.push(guessingLetter);
        this.notify();
    }

    getAll() {
        return {
            word: this.word,
            livesLeft: this.livesLeft,
            placeholder: this.placeholder,
            splittedWord: this.splittedWord,
            currentState: this.currentState,
            guess: this.guess
        }
    }

    subscribe({ render, name }) {
        // render = renderer function
        // name = name of the renderer function (id)
        this.observers.push({ render, name })
    }

    unsubscribe(observerName) {
        this.observers = this.observers.filter(observer => observer.name !== observerName);
    }

    init() {
        this.notify();
    }

    getPlaceholder() {
        return this.placeholder;
    }

    getSplittedWord() {
        return this.splittedWord;
    }

    getLivesLeft() {
        return this.livesLeft;
    }


}

export const getGameInstance = () => {
    const randomIndex = Math.round(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];

    return new HangmanGameState(randomWord);
}
