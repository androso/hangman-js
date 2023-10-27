const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default class GameScreen {

  constructor(gameState) {
    this.livesLeft = gameState.livesLeft;
    this.placeholder = gameState.placeholder;
	this.guessLetter = gameState.guessLetter;
  }

  getHTML() {

    return `
        <div class="hangman__container">
				<p class="game__stats">Lives: ${this.livesLeft}</p>
				<h1 class="game__title title">HANGMAN</h1>
				<canvas id="person" width="260" height="200"></canvas>
				<p class="game__word">${this.placeholder.join("")}</p>
				<div class="keyboard">
					${alphabet.map((letter) => {
						return `<button type="button" onclick="${this.guessLetter(letter)}" class="key">${letter.toUpperCase()}</button>`
					}).join("")}
				</div>
				<button class=""></button>
			</div>
        `;
  }
}
