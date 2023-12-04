import { wordList } from "../data/dictionary.js";

// clase encargada de manejar el estado del juego 
export default class HangmanGameState {
    // constructor, inicializa variables que estarán disponibles en la clase
    constructor(word) {
        this.word = word.toUpperCase(); // normalizamos la palabra a mayusculas
        this.livesLeft = 7; // trackeamos vidas
        this.placeholder = word.split("").map(letter => "_") // placeholder a mostrar en ui
        this.splittedWord = word.toUpperCase().split("") // 
        this.currentState = "PLAYING"
        this.lettersPressed = []; // array de letras presionadas
        this.observers = []; // array de funciones a las cuales pasaremos la data cada vez que se cambie 
        this.playerName = prompt('Enter your nickname')
    }

    notify() {
        // notificando cada función observadora, el cliente debe suscribir funciones 
        // renderizadoras que reciban datos
        this.observers.forEach(observer => observer.render(this));
    }

    guess(guessingLetter) {
        // transformamos a mayusculas ya que this.word es en mayuscula
        guessingLetter = guessingLetter.toUpperCase();

        if (this.lettersPressed.includes(guessingLetter)) {
            // ya se presionó esta letra
            return false;
        };

        const currentWord = this.splittedWord;

        if (currentWord.includes(guessingLetter)) {
            // obtenemos los indices en los cuales la letra adivinada se encuentra en la palabra 
            const indexes = []
            currentWord.forEach((wordLetter, index) => {
                if (wordLetter === guessingLetter) {
                    indexes.push(index)
                }
            })

            // creamos el nuevo placeholder con la letra adivinada incluida
            const newPlaceholder = this.placeholder.map((underscore, index) => {
                if (indexes.includes(index)) {
                    return guessingLetter
                } else {
                    return underscore
                }
            })

            this.placeholder = newPlaceholder;
        } else {
            // reducimos la vida en 1 si la letra no está en la palabra
            this.livesLeft -= 1;
        }
        
        this.lettersPressed.push(guessingLetter);

        // actualizamos estado del juego de ser necesario
        if (this.livesLeft === 0) {
            this.currentState = "LOST"
        } else if (!this.placeholder.includes("_")) {
            this.currentState = "WON"
        }

        this.notify();
    }
    
    subscribe({ render, name }) {
        // metodo para suscribir observadores 
        this.observers.push({ render, name })
    }
    
    unsubscribe(observerName) {
        // metodo para desuscribir observadores 
        this.observers = this.observers.filter(observer => observer.name !== observerName);
    }

    init() {
        // incializamos y llamamos a observadores con estado inicial
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

    getNickName() {
        return this.playerName
    }
}

export const getGameInstance = () => {
    // obteniendo palabra aleatoria del diccionario
    const randomIndex = Math.round(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];

    // iniciando estado con palabra random 
    return new HangmanGameState(randomWord);
}