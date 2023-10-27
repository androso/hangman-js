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
        this.splittedWord = this.word.split("");
        this.livesLeft = 7;
        this.wordSelected = "";
        this.placeholder = word.split("").map(letter => "_")
        this.currentState = "PLAYING"
        this.observers = []; // renderer functions to which we're gonna pass data each time it gets changed
    }

    subscribe({ render, name }) {
        // render = renderer function
        // name = name of the renderer function (id)
        this.observers.push({ render, name })
    }

    unsubscribe(observerName) {
        this.observers = this.observers.filter(observer => observer.name !== observerName);
    }

    notify(data) {
        this.observers.forEach(observer => observer.render(data));
    }

    getPlaceholder() {
        return this.placeholder;
    }

    getLivesLeft() {
        return this.livesLeft;
    }

    guess(guessingLetter) {
        if (this.placeholder.includes(guessingLetter)) return;

        const currentWord = this.splittedWord;
        guessingLetter = guessingLetter.toUpperCase();

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
            return true;
        } else {
            this.livesLeft -= 1;
            return false;
        }
    }
}

const randomIndex = Math.round(Math.random() * wordList.length);
const randomWord = wordList[randomIndex];
export const game = new HangmanGameState(randomWord);
// there has to be a connection between the html displayed,
// how cicking something generates an action in the js and changes the state of the game resulting
// in a change in the html displayed
