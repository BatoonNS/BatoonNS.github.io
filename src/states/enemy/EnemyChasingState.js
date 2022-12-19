
import Animation from "../../../lib/Animation.js";
import { getRandomPositiveInteger } from "../../../lib/RandomNumberHelpers.js";
import State from "../../../lib/State.js";
import Enemy from "../../entities/enemies/Enemy.js";
import Player from "../../entities/Player.js";
import EnemyStateName from "../../enums/EnemyStateName.js";
import Direction from "../../enums/Direction.js"

import { timer } from "../../globals.js";
import EnemyIdleState from "./EnemyIdleState.js";
export default class EnemyChasingState extends State {
	/**
	 * In this state, the snail follows the player
	 * at a higher move speed and animation speed.
	 *
	 * @param {Enemy} enemy
	 * @param {Player} player
	 */
	constructor(enemy,animation, player) {
		super();

		this.enemy = enemy;
		this.player = player;
		this.animation = new Animation([35,36,37,38,39,40,41], 0.1);
	}

	enter() {
		this.enemy.currentAnimation = this.animation;
	}
	exit() {
		

	}
	update(dt) {

		this.decideDirection();
		this.move(dt)
		this.exit();
	}

	/**
	 * Set the direction of the snail based on the distance of the player.
	 */
	decideDirection() {
		if(this.enemy.getDistanceBetween(this.player) < 20 ){
			console.log("Entering Attacking")
			this.enemy.velocity.x = 0;
			this.enemy.changeState(EnemyStateName.Attacking);
			this.exit();
			return false;
		}
		if (this.enemy.getDistanceBetween(this.player) > Enemy.CHASE_DISTANCE) {
			this.enemy.changeState(EnemyStateName.Idle);
			return false;

		}
	 	else if (this.player.position.x < this.enemy.position.x +5 && this.player.isInvincible != true) {
			this.enemy.direction = Direction.Left;
	 	}
	 	else if (this.player.position.x < this.enemy.position.x+5 && this.player.isInvincible != true) {
	 		this.enemy.direction = Direction.Right;
	 	}


	 }

	 move(dt) {
	 	if (this.enemy.direction === Direction.Left && !this.enemy.checkLeftCollisions()) {
            this.enemy.direction = Direction.Right;
	 		this.enemy.position.x -= this.enemy.velocityLimit-100 * dt;
	 	}
	 	else if (this.enemy.direction === Direction.Right && !this.enemy.checkRightCollisions()) {
             this.enemy.direction = Direction.Right;

	 		this.enemy.position.x += this.enemy.velocityLimit * dt;
	 	}
		else if (this.player.isInvincible == true){
			return;
		}
	 }
}