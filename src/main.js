/**
 * === SOUL CASTLE ===
 *
 * -- Authors --
 * Nathan Batten
 * Kevin-Christopher Laskai
 *
 * -- Brief description --
 * Soul Castle is a 2d extreme difficulty game where the player has a plethora
 * of controls to attempt to make their way through the game and defeat the
 * final boss.
 *
 * -- Asset sources --
 * Art:
 * Main Character - @see https://szadiart.itch.io/2d-soulslike-character 
 * BadGuys - @see https://szadiart.itch.io/hero-and-opponents-animation
 * Map - @see https://szadiart.itch.io/pixle-castle-2d
 * 
 * Sounds:
 * 
 */

import GameStateName from "./enums/GameStateName.js";
import Game from "../lib/Game.js";
import {
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	fonts,
	images,
	keys,
	sounds,
	stateMachine,
} from "./globals.js";
import PlayState from "./states/game/PlayState.js";
//import GameOverState from "./states/GameOverState.js";
//import VictoryState from "./states/VictoryState.js";
import TitleScreenState from "./states/game/TitleScreenState.js";
import TransitionState from "./states/game/TransitionState.js";
import ControlsState from "./states/game/ControlsState.js";
import DeathScreenState from "./states/game/DeathScreenState.js";
import VictoryScreenState from "./states/game/VictoryScreenState.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

// Fetch the asset definitions from config.json.
const {
	images: imageDefinitions,
	fonts: fontDefinitions,
	sounds: soundDefinitions,
} = await fetch('./src/config.json').then((response) => response.json());

// Load all the assets from their definitions.
images.load(imageDefinitions);
fonts.load(fontDefinitions);
sounds.load(soundDefinitions);

// Add all the states to the state machine.
stateMachine.add(GameStateName.Transition, new TransitionState());
stateMachine.add(GameStateName.TitleScreen, new TitleScreenState());
stateMachine.add(GameStateName.Controls, new ControlsState());
stateMachine.add(GameStateName.Death, new DeathScreenState());
stateMachine.add(GameStateName.Victory, new VictoryScreenState());
stateMachine.add(GameStateName.Play, new PlayState());

stateMachine.change(GameStateName.TitleScreen);

// Add event listeners for player input.
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

const game = new Game(stateMachine, context, canvas.width, canvas.height);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();
