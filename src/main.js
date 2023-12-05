import { getGameInstance } from "./helpers/stateMachine.js";
import { alphabet } from "./views/gameScreen.js";
import canvasHelpers from "./helpers/canvas.js";

const renderGameScreen = (gameState) => {
    // obtenemos contenedor
    const $rootContainer = document.querySelector(".hangman__container");

    // creamos elemento de la pantalla con los datos del estado del juego
    const $screen = document.createElement("div");
    $screen.className = "game__container";
    $screen.innerHTML = `
        <div class="game__header">
            <p class="game__header__stats">Lives: ${gameState.livesLeft}</p>
            <p id="playername">Player: ${gameState.playerName}</p>
            <p id="timer">Turn: ${gameState.turnTimeLeft}s</p>
        </div>
        <h1 class="game__title title">HANGMAN</h1>
        <canvas id="person" width="260" height="200"></canvas>
        <p class="game__word">${gameState.placeholder.join("")}</p>
        <p class="game__instructions">Pick a letter from below to guess the word.</p>
        <div class="keyboard" id="keyboard" >
            ${alphabet.map((letter) => {
        const letterIsPressed = gameState.lettersPressed.includes(letter.toUpperCase());
        return `
                    <button ${letterIsPressed ? "disabled" : ""} 
                        type="button" id="${letter}" 
                        class="game__letter ${letterIsPressed ? "pressed" : ""}">
                        ${letter.toUpperCase()}
                    </button>
                `
    }).join("")}
        </div>
        <a href="/" class="button game__trigger">MAIN MENU</a>
    `
    // obtenemos canvas
    const $canvas = $screen.querySelector('#person');
    const ctx = $canvas.getContext('2d');
    canvasHelpers.drawHangmanPlatform(ctx);

    // dibujando el hangman correcto con respecto a las vidas restantes
    switch (gameState.livesLeft) {
        case 1:
            canvasHelpers.drawRope(ctx);
            canvasHelpers.drawHead(ctx);
            canvasHelpers.drawBody(ctx);
            canvasHelpers.drawLeftArm(ctx);
            canvasHelpers.drawRightArm(ctx);
            canvasHelpers.drawLeftLeg(ctx);
            break;
        case 2:
            canvasHelpers.drawRope(ctx);
            canvasHelpers.drawHead(ctx);
            canvasHelpers.drawBody(ctx);
            canvasHelpers.drawLeftArm(ctx);
            canvasHelpers.drawRightArm(ctx);
            break;
        case 3:
            canvasHelpers.drawRope(ctx);
            canvasHelpers.drawHead(ctx);
            canvasHelpers.drawBody(ctx);
            canvasHelpers.drawLeftArm(ctx);
            break;
        case 4:
            canvasHelpers.drawRope(ctx);
            canvasHelpers.drawHead(ctx);
            canvasHelpers.drawBody(ctx);
            break;
        case 5:
            canvasHelpers.drawRope(ctx);
            canvasHelpers.drawHead(ctx);
            break;
        case 6:
            canvasHelpers.drawRope(ctx);
            break;
    }

    const $keyboardKeys = $screen.querySelectorAll(".game__letter");

    // anclando los botones de letras con la función para adivinar 
    $keyboardKeys.forEach(($key) => {
        const letter = $key.id;
        $key.addEventListener("click", () => gameState.guess(letter));
    })

    // reemplazando pantalla vieja con la que acabamos de crear
    const $oldScreen = document.querySelector(".game__container");
    if ($oldScreen) {
        $rootContainer.replaceChild($screen, $oldScreen);
    } else {
        $rootContainer.appendChild($screen);
    }
}

// función para renderizar pantalla final con resultados 
const renderEndScreen = (data) => {
    const $rootContainer = document.getElementById("root");
    const result = data.currentState === "WON" ? "won!" : "lost :(";

    const screenHTML = `
        <div class="hangman__container">
            <h1 class="game__title">GAME OVER</h1>
            <h3 class="result">You ${result}</h3>
            <h3 class="result">The word is ${data.word}</h3> 
              <a
                href="./game.html"
                class="button game"
                onclick="//()=> { sounds.click.play()}"
                >New Game</a
                >
        </div> 
    `

    $rootContainer.innerHTML = screenHTML;
}

document.addEventListener("DOMContentLoaded", () => {

    if (document.readyState !== "loading") {

        // obteniendo estado inicial
        const gameInstance = getGameInstance();

        // suscribiendo elementos de la interfaz de usuario a la maquina de estado
        // que maneja el juego
        gameInstance.subscribe({
            render: (data) => {
                // data contiene el estado del juego y lo pasamos a 
                // funciones para que se actualice
                if (data.currentState !== "PLAYING") {
                    // mostramos pantalla final
                    renderEndScreen(data);
                } else {
                    // mostramos pantalla del juego
                    renderGameScreen(data)
                }
            },
            name: "gameScreen"
        })

        // inicializamos el juego 
        gameInstance.init();

        // listener para detectar cuando se presiona una tecla del alfabeto
        document.addEventListener("keydown", (event) => {
            const letter = event.key.toLowerCase();

            if (alphabet.includes(letter)) {
                gameInstance.guess(letter);
            }
        })

        // manejamos el boton de musica
        const $playMusicIcon = document.querySelector("#play-music-icon .icon");
        const $audio = document.querySelector("#audio");

        $playMusicIcon.addEventListener("click", () => {
            if ($audio.paused) {
                $audio.play();
                $playMusicIcon.setAttribute("icon", "ph:pause-fill")
            } else {
                $audio.pause();
                $playMusicIcon.setAttribute("icon", "ph:play-fill")
            }
        })
    }
});