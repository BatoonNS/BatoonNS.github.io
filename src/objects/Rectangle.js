import GameEntity from "../entities/GameEntity.js";
import GameObject from "./GameObject.js";
import {
	CANVAS_WIDTH,
	context,
	matter
} from "../globals.js";
import Vector from "../../lib/Vector.js";

export default class Rectangle extends GameObject {
	/**
	 * A GameEntity that has a Matter rectangle as its body.
	 * Canvas origin is top-left, Matter origin is center.
	 * We'll work in top-left coordinates as usual but
	 * offset them when giving/retrieving to/from Matter.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Bodies.html#method_rectangle
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {object} options
	 */
	constructor(x, y, width, height, options) {
		super();
		this.position = new Vector(x + width / 2,y + height / 2);
		this.width = width;
		this.height = height;
		this.renderOffset = { x: -this.width / 2, y: -this.height / 2 };
		
	}

	render() {
		context.save();
		context.translate(this.position.x, this.position.y);

		context.rect(this.renderOffset.x, this.renderOffset.y, this.width, this.height);
		context.fillStyle = "rgba(0, 0, 0, 0)";
		context.fill();

		context.restore();
	}
}
