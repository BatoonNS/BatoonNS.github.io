import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from "../globals.js";
import { pickRandomElement } from "../../lib/RandomNumberHelpers.js";
import Vector from "../../lib/Vector.js"

export default class Background {
	static WIDTH = 480;
	static HEIGHT = 160;
	static LEVEL = ImageName.WorldLevel;


	constructor() {
		this.sprite = Background.generateSprite();
		this.images = [];
	}

	render() {
		this.sprite.render(0, 0, new Vector(1, 1));
	}

	static generateSprite() {
		return new Sprite(images.get(Background.LEVEL), 0, 0, Background.WIDTH, Background.HEIGHT);
	}
}
