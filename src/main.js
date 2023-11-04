import { getGameInstance } from "./stateMachine.js";
import { alphabet } from "./views/gameScreen.js";

function draw(ctx, startX, startY, endX, endY) {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

const drawRope = (ctx) => {
    draw(ctx, 60, 10, 60, 40)
}
function drawLine(ctx, startX, startY, endX, endY) {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}
function drawCirc(ctx, startX, startY, radius, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(startX, startY, radius, startAngle, endAngle);
    ctx.stroke();
}
function drawHead(ctx) {
    drawCirc(ctx, 60, 50, 10, 0, Math.PI * 2);
}
function drawBody(ctx) {
    drawLine(ctx, 60, 60, 60, 110);
}
function drawLeftArm(ctx) {
    drawLine(ctx, 60, 70, 32, 50);
}
function drawRightArm(ctx) {
    drawLine(ctx, 60, 70, 88, 50);
}
function drawLeftLeg(ctx) {
    drawLine(ctx, 61, 109, 35, 130)
}

const drawHangmanPlatform = (ctx) => {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    draw(ctx, 0, 10, 75, 10)
    draw(ctx, 10, 0, 10, 180)
    draw(ctx, 0, 180, 180, 180)
}

const renderGameScreen = (gameState) => {
    const $rootContainer = document.querySelector(".hangman__container");
    const $screen = document.createElement("div");
    $screen.className = "game__container";

    $screen.innerHTML = `
        <div class="game__header">
            <p class="game__header__stats">Lives: ${gameState.livesLeft}</p>
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

    const canvas = $screen.querySelector('#person');
    const ctx = canvas.getContext('2d');
    drawHangmanPlatform(ctx);

    switch (gameState.livesLeft) {
        case 1:
            drawRope(ctx);
            drawHead(ctx);
            drawBody(ctx);
            drawLeftArm(ctx);
            drawRightArm(ctx);
            drawLeftLeg(ctx);
            break;
        case 2:
            drawRope(ctx);
            drawHead(ctx);
            drawBody(ctx);
            drawLeftArm(ctx);
            drawRightArm(ctx);
            break;
        case 3:
            drawRope(ctx);
            drawHead(ctx);
            drawBody(ctx);
            drawLeftArm(ctx);
            break;
        case 4:
            drawRope(ctx);
            drawHead(ctx);
            drawBody(ctx);
            break;
        case 5:
            drawRope(ctx);
            drawHead(ctx);
            break;
        case 6:
            drawRope(ctx);
            break;
    }

    const $keyboardKeys = $screen.querySelectorAll(".game__letter");

    $keyboardKeys.forEach(($key) => {
        const letter = $key.id;
        $key.addEventListener("click", () => gameState.guess(letter));
    })

    const $oldScreen = document.querySelector(".game__container");

    if ($oldScreen) {
        $rootContainer.replaceChild($screen, $oldScreen);
    } else {
        $rootContainer.appendChild($screen);
    }
}

const renderEndScreen = (data) => {
    const $rootContainer = document.getElementById("root");
    const result = data.currentStatate === "WON" ? "won!" : "lost :(";

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

        // initial state
        const gameInstance = getGameInstance();

        // we're gonna re-render gameScreen each time 
        // the state of the gameInstance changes
        gameInstance.subscribe({
            render: (data) => {
                if (data.currentState !== "PLAYING") {
                    // game finished
                    renderEndScreen(data);
                } else {
                    renderGameScreen(data)
                }
            }, // recibira estado del juego y renderizara
            name: "gameScreen"
        })

        gameInstance.init();

        document.addEventListener("keydown", (event) => {
            const letter = event.key.toLowerCase();
            if (alphabet.includes(letter)) {
                gameInstance.guess(letter);
            }
        })

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
