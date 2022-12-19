import Animation from "../../../lib/Animation.js";
import { didSucceedPercentChance, getRandomPositiveInteger, pickRandomElement } from "../../../lib/RandomNumberHelpers.js";
import State from "../../../lib/State.js";
import Enemy from "../../entities/enemies/Enemy.js";
import Direction from "../../enums/Direction.js";
import EnemyStateName from "../../enums/EnemyStateName.js";
import { timer } from "../../globals.js";
import Level from "../../objects/Level.js";
import Background from "../../objects/Background.js";

export default class EnemyWalkingState extends State {
	static IDLE_CHANCE = 0.5;
	static MOVE_DURATION_MIN = 2;
	static MOVE_DURATION_MAX = 6;

	/**
	 * In this state, the enemy moves around in random
	 * directions for a random period of time.
	 *
	 * @param {Enemy} enemy
	 * @param {Animation} animation
	 */
	constructor(enemy, animation,player) {
		super();
		this.player = player;
		this.enemy = enemy;
		this.animation = animation;
	}

	enter() {
		this.enemy.currentAnimation = this.animation;

		this.reset();
		this.startTimer();
	}

	update(dt) {
		this.move(dt);
	}

	startTimer() {
		this.timer = timer.wait(this.moveDuration, () => this.decideMovement());
	}

	/**
	 * 50% chance for the snail to go idle for more dynamic movement.
	 * Otherwise, start the movement timer again.
	 */
	decideMovement() {
		if (didSucceedPercentChance(EnemyWalkingState.IDLE_CHANCE)) {
			this.enemy.changeState(EnemyStateName.Idle);
		}
		else {
			this.reset();
			this.startTimer();
		}
	}

	/**
	 * 25% chance for the enemy to move in any direction.
	 * Reset the movement timer to a random duration.
	 */
	reset() {
		this.enemy.direction = pickRandomElement([Direction.Left, Direction.Right]);
		this.enemy.currentAnimation = this.animation;
		this.moveDuration = getRandomPositiveInteger(EnemyWalkingState.MOVE_DURATION_MIN, EnemyWalkingState.MOVE_DURATION_MAX);
	}

	move(dt) {
		if(this.enemy.getDistanceBetween(this.player) < 100  && this.enemy.getDistanceBetween(this.player) < 20 ){
			console.log("Entering chase")
			this.enemy.velocity.x = 0;
			this.enemy.changeState(EnemyStateName.Chasing);
			return false;
		}
		if (this.enemy.checkLeftCollisions() && this.enemy.direction === Direction.Left ) {
			this.enemy.direction = Direction.Right
			this.enemy.moveRight();
		}
		else if(this.enemy.direction === Direction.Left){
			this.enemy.moveLeft();
			
		}
		else if (this.enemy.checkRightCollisions()&& this.enemy.direction === Direction.Right ) {
			this.enemy.direction = Direction.Left
			this.enemy.moveLeft();
		}
		else if(this.enemy.direction === Direction.Right){
			this.enemy.moveRight();
			
		}

	}
}
