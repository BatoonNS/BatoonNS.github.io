import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	images,
	keys,
	sounds,
	stateMachine,
} from "../../globals.js";
import State from "../../../lib/State.js";
import ImageName from "../../enums/ImageName.js";

/**
 * Represents the screen where we can view all high scores previously recorded.
 */
export default class ControlsState extends State {
	constructor() {
		super();
	}

	enter() {

	}

	update(dt) {
		// Return to the start screen if we press escape.
		if (keys.Escape) {
			stateMachine.change('title-screen');
		}
	}

	render() {
		images.render(ImageName.Title, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		context.save();
		context.fillStyle = "white";
		context.font = "15px zelda";
		context.textBaseline = 'middle';
		context.textAlign = 'center';
        
        context.fillText('"A" and "D"   To Move', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 130);
        context.fillText('"SPACE BAR"   To Jump', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 110);
        context.fillText('"ENTER" To Attack', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 90);
        context.fillText('"R" To Roll', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70);
        context.fillText('DON\'T GET HIT OR YOU DIE', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 10);

        context.font = "10px zelda";
        context.fillText('"ESC" for menu', CANVAS_WIDTH/10+5, CANVAS_HEIGHT/10-5);

		context.restore();
	}
}
