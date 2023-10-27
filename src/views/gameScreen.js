export default class GameScreen {
  constructor(gameState) {
    this.livesLeft = gameState.livesLeft;
    this.placeholder = gameState.placeholder;
  }

  getHTML() {
    return `
        <div class="hangman__container">
				<p class="game__stats">Lives: ${this.livesLeft}</p>
				<h1 class="game__title title">HANGMAN</h1>
				<canvas id="person" width="260" height="200"></canvas>
				<p class="game__word">${this.placeholder.join("")}</p>
				<div class="keyboard">
					<button class="key">A</button>
					<button class="key">B</button>
					<button class="key">C</button>
					<button class="key">D</button>
					<button class="key">E</button>
					<button class="key">F</button>
					<button class="key">G</button>
					<button class="key">H</button>
					<button class="key">I</button>
					<button class="key">J</button>
					<button class="key">K</button>
					<button class="key">L</button>
					<button class="key">M</button>
					<button class="key">N</button>
					<button class="key">O</button>
					<button class="key">P</button>
					<button class="key">Q</button>
					<button class="key">R</button>
					<button class="key">S</button>
					<button class="key">T</button>
					<button class="key">U</button>
					<button class="key">V</button>
					<button class="key">W</button>
					<button class="key">X</button>
					<button class="key">Y</button>
					<button class="key">Z</button>
				</div>
				<button class=""></button>
			</div>
        `;
  }
}
