import State from "../../../lib/State.js";
import GameStateName from "../../enums/GameStateName.js";
import ImageName from "../../enums/ImageName.js";
//import SoundName from "../../enums/SoundName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, keys, sounds, stateMachine, timer } from "../../globals.js";

export default class DeathScreenState extends State {
	/**
	 * Displays a title screen where the player
	 * can press enter to start a new game.
	 */
	constructor() {
		super();
	}

	enter() {

	}

	update(dt) {
		if (keys.Escape) {
            keys.Escape = false;
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.TitleScreen]
			});
		}
	}

	render() {
        context.save();
        context.fillStyle ="black";
        context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
		context.font = '50px Zelda';
		context.fillStyle = 'Red';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('YOU FAILED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        context.fillStyle = 'White';
        context.font = "10px zelda";
        context.fillText('"ESC" for menu', CANVAS_WIDTH/10+5, CANVAS_HEIGHT/10-5);
        context.restore();
	}
}