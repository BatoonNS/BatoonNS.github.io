import {
	DEBUG,
	context,
} from "../globals.js";

import Vector from "../../lib/Vector.js";
import Direction from "../enums/Direction.js"
import Hitbox from "../../lib/Hitbox.js"
import Background from "../objects/Background.js";

export default class GameEntity {
	static WIDTH = 128;
	static HEIGHT = 64;
	static CHASE_DISTANCE = 10;
	constructor(entityDefinition = {}) {
		this.swordHitbox = new Hitbox(0,0,0,0);
		this.position = entityDefinition.position ?? new Vector();
		this.dimensions = entityDefinition.dimensions ?? new Vector();
		this.velocity = new Vector(0, 0);
		this.velocityLimit = entityDefinition.dimensions ??100;
		this.direction = entityDefinition.Direction??Direction.left;
		this.totalHealth = entityDefinition.health ?? 1;
		this.hitboxOffsets = entityDefinition.hitboxOffsets ?? new Hitbox();
		this.hitbox = new Hitbox(
			this.position.x + this.hitboxOffsets.position.x,
			this.position.y + this.hitboxOffsets.position.y,
			this.dimensions.x + this.hitboxOffsets.dimensions.x,
			this.dimensions.y + this.hitboxOffsets.dimensions.y,
		);
		this.currentAnimation = null;
		this.sprites = [];
		this.health = 100;
		this.isDead = false;
		this.cleanUp = false;
		this.stateMachine = null;
		this.moveDuration = 5;
	}
	update(dt) {
		this.stateMachine.update(dt);
		this.currentAnimation.update(dt);
		if(this.direction === Direction.Left){
			this.hitbox.set(
				this.position.x + this.hitboxOffsets.position.x+70,
				this.position.y + this.hitboxOffsets.position.y+40,
				this.dimensions.x + this.hitboxOffsets.dimensions.x-105,
				this.dimensions.y + this.hitboxOffsets.dimensions.y-50,
			);
		}
		else{
			this.hitbox.set(
				this.position.x + this.hitboxOffsets.position.x+30,
				this.position.y + this.hitboxOffsets.position.y+40,
				this.dimensions.x + this.hitboxOffsets.dimensions.x-105,
				this.dimensions.y + this.hitboxOffsets.dimensions.y-50,
			);
		}

		this.position.add(this.velocity, dt);
	}
	render() {
		const x = this.position.x;
		const y = this.position.y;

		this.stateMachine.render();
		if (this.direction === Direction.Left) {
			
			context.save();
			context.translate(Math.floor(this.position.x) + this.dimensions.x, Math.floor(this.position.y));
			context.scale(-1, 1);
			this.sprites[this.currentAnimation.getCurrentFrame()].render(0, 0);
			context.restore();
		}
		else {
			this.sprites[this.currentAnimation.getCurrentFrame()].render(Math.floor(this.position.x), Math.floor(this.position.y));
		}
		if (DEBUG) {
			this.hitbox.render(context);
			this.swordHitbox.render(context);
		}
	}
	getDistanceBetween(entity) {
		return Math.abs(this.position.x - entity.position.x);
	}
	didCollideWithEntity(hitbox) {
		return this.hitbox.didCollide(hitbox);
	}

	changeState(state, params) {
		this.stateMachine.change(state, params);
	}

	checkLeftCollisions() {
		if (this.position.x + GameEntity.WIDTH/2-8 < 0) {
			this.velocity.x = 0;
			this.position.x = -(GameEntity.WIDTH/2-8);
			return true;
		}
		else{
			return false;
		}
	}

	checkRightCollisions() {
		if (this.position.x + GameEntity.WIDTH/2+8 > Background.WIDTH) {
			this.velocity.x = 0;
			this.position.x = Background.WIDTH -(GameEntity.WIDTH/2+8);
			return true;
		}
		else{
			return false;
		}
	}
	
}
