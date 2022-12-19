import Animation from "../../../lib/Animation.js";
import { getRandomPositiveInteger } from "../../../lib/RandomNumberHelpers.js";
import State from "../../../lib/State.js";
import Enemy from "../../entities/enemies/Enemy.js";
import Direction from "../../enums/Direction.js";
import EnemyStateName from "../../enums/EnemyStateName.js";
import { timer } from "../../globals.js";
import EnemyIdleState from "./EnemyIdleState.js";
export default class EnemyAttackState extends State {
	static MOVE_DURATION_MIN = 2;
	static MOVE_DURATION_MAX = 6;

	/**
	 * In this state, the enemy does not move and
	 * starts moving after a random period of time.
	 *
	 * @param {Enemy} enemy
	 * @param {Animation} animation
	 */
	constructor(enemy, animation) {
		super();

		this.enemy = enemy;
		this.animation = animation;
	}

	enter() {
		this.enemy.currentAnimation = this.animation;
		this.idleDuration = getRandomPositiveInteger(EnemyIdleState.MOVE_DURATION_MIN, EnemyIdleState.MOVE_DURATION_MAX);

		this.startTimer();
	}
	exit() {
		this.enemy.swordHitbox.set(0, 0, 0, 0);
	}

	update(dt) {
		if(this.animation.isHalfwayDone){
			this.setSwordHitbox();
		}
		if(this.animation.isDone()){
			this.enemy.swordHitbox.set(0, 0, 0, 0);
		}
	 }

	startTimer() {
		this.timer = timer.wait(this.idleDuration, () => this.enemy.changeState(EnemyStateName.Moving));
	}

	setSwordHitbox() {
		let hitboxX, hitboxY, hitboxWidth, hitboxHeight;

		// The magic numbers here are to adjust the hitbox offsets to make it line up with the sword animation.
		if (this.enemy.direction === Direction.Left) {
			hitboxWidth = this.enemy.dimensions.x / 7;
			hitboxHeight = this.enemy.dimensions.x/4;
			hitboxX = this.enemy.position.x + this.enemy.dimensions.x/5;
			hitboxY = this.enemy.position.y + this.enemy.dimensions.y / 3;
		}
		else if (this.enemy.direction === Direction.Right) {
			hitboxWidth = this.enemy.dimensions.x / 7;
			hitboxHeight = this.enemy.dimensions.x/4;
			hitboxX = this.enemy.position.x + this.enemy.dimensions.x/1.5;
			hitboxY = this.enemy.position.y + this.enemy.dimensions.y/3;
		}

		this.enemy.swordHitbox.set(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
	}
}
