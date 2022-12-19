import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import Rectangle from "./Rectangle.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	images
} from "../globals.js";

export default class Ground extends Rectangle {
	static FLOOR = {
		x: 0,
		y: 0,
		width: 16,
		height: 16
	};
	static MEASUREMENTS = {
		x: -CANVAS_WIDTH / 2,
		y: CANVAS_HEIGHT - Ground.FLOOR.height * 5,
		width: CANVAS_WIDTH * 2,
		height: Ground.FLOOR.height
	};


	constructor() {
		super(
			Ground.MEASUREMENTS.x,
			Ground.MEASUREMENTS.y,
			Ground.MEASUREMENTS.width,
			Ground.MEASUREMENTS.height,
			{
				label: 'ground',
				isStatic: true
			});
			this.isSolid = true;
	}
}
