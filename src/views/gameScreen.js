// array de letras del alfabeto
export const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const getGameScreen = (gameInstance) => {
	const livesLeft = gameInstance.getLivesLeft();
	const placeholder = gameInstance.getPlaceholder();

	return `
		<div class="hangman__container">
			<p class="game__stats">Lives: ${livesLeft}</p>
			<h1 class="game__title title">HANGMAN</h1>
			<canvas id="person" width="260" height="200"></canvas>
			<p class="game__word">${placeholder.join("")}</p>
			<div class="keyboard">
				${alphabet.map((letter) => {
		return `<button type="button" class="key">${letter.toUpperCase()}</button>`
	}).join("")}
			</div>
			<button class=""></button>
		</div>
        `;
}

export default getGameScreen;