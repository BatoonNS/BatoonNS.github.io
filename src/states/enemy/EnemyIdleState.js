import Animation from "../../../lib/Animation.js";
import { getRandomPositiveInteger } from "../../../lib/RandomNumberHelpers.js";
import State from "../../../lib/State.js";
import Enemy from "../../entities/enemies/Enemy.js";
import EnemyStateName from "../../enums/EnemyStateName.js";
import { timer } from "../../globals.js";

export default class EnemyIdleState extends State {
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

	update(dt) {

	 }

	startTimer() {
		this.timer = timer.wait(this.idleDuration, () => this.enemy.changeState(EnemyStateName.Moving));
		
	}
}
