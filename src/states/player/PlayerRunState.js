import { keys } from "../../globals.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import Player from "../../entities/Player.js";
import { PlayerStateName } from "../../enums/PlayerStateName.js";

export default class PlayerRunState extends State {
	/**
	 * In this state, the player is on the ground and moving
	 * either left or right. From here, the player can go idle
	 * if nothing is being pressed and there is no X velocity.
	 * The player can fall if there is no collisions below them,
	 * and they can jump if they hit spacebar.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.framesCounter =0;
		this.framesTotal =0;
		this.player = player;
		this.animation = new Animation([8,12,9,13,10,14,11,15], 0.1);
	}

	enter() {
		this.player.currentAnimation = this.animation;
		this.player.isInvincible = false;

	}

	update(dt) {
		this.player.checkLeftCollisions();
		this.player.checkRightCollisions();
			if(keys.Enter && this.player.lastState != PlayerStateName.Jumping){
				this.player.changeState(PlayerStateName.Attacking);
			}
			else if(!keys.a && !keys.d && Math.abs(this.player.velocity.x) === 0){
				this.player.changeState(PlayerStateName.Idle);
				this.player.isInvincible = false;
			}
			else if(keys.r){
				this.player.changeState(PlayerStateName.Rolling);
				this.player.becomeInvulnerable();
				return;
			}
			else if(keys[' ']){
				this.player.changeState(PlayerStateName.Jumping);
				this.player.isInvincible = false;
			}
			else if (keys.a) {
				this.player.moveLeft();
				this.player.isInvincible = false;
			}
			else if (keys.d) {
				this.player.moveRight();
				this.player.isInvincible = false;
			}
			else {
				this.player.stop();
				this.player.isInvincible = false;
			}
	}
}
