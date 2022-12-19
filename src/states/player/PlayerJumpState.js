import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import { PlayerStateName } from "../../enums/PlayerStateName.js";
import { keys } from "../../globals.js";

export default class PlayerJumpState extends State {
	constructor(player) {
		super();

		this.player = player;
		this.animation = new Animation([16,20,17,21], 0.2);
	}

	enter() {
		this.player.velocity.y = this.player.jumpForce.y;
		this.player.currentAnimation = this.animation;
		this.player.isInvincible = false;

	}

	update(dt) {
		if (this.player.velocity.y >= 0) {
			this.player.changeState(PlayerStateName.Falling);
		}
		else if(keys.Enter && this.player.lastState != PlayerStateName.Attacking){
			this.player.changeState(PlayerStateName.Attacking);
		}
		else if (keys.a) {
			this.player.moveLeft();
			this.player.checkLeftCollisions();
		}
		else if (keys.d) {
			this.player.moveRight();
			this.player.checkRightCollisions();
		}
		else {
			this.player.stop();
		}

		this.player.velocity.add(this.player.gravityForce, dt);
	}
}
