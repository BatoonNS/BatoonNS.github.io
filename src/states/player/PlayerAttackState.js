import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Direction from "../../enums/Direction.js";
import { PlayerStateName } from "../../enums/PlayerStateName.js";
import SoundName from "../../enums/SoundsName.js";
import { sounds } from "../../globals.js";
export default class PlayerAttackState extends State {
	/**
	 * In this state, the player swings their sword out in
	 * front of them. This creates a temporary hitbox that
	 * enemies can potentially collide into.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;

        this.animationDefault = new Animation([59,64,30,35,40,45], 0.12,1);
		this.animationJumping = new Animation([43,48,53,58], 0.1,1);
        this.animationRunning = new Animation([39,44,49,54], 0.1,1);
        this.animationFalling = new Animation([53,58,29,34], 0.1,1);
	}

	enter() {
		
		this.player.swordHitbox.set(0, 0, 0, 0);
		if(this.player.lastState == "jumping"){
            this.player.currentAnimation = this.animationJumping;
        }
        else if(this.player.lastState == "falling"){
            this.player.currentAnimation = this.animationFalling;
        }
        else if(this.player.lastState == "running"){
            this.player.currentAnimation = this.animationRunning;
        }
        else{
            this.player.currentAnimation = this.animationDefault;
        }

	}

	exit() {
		this.player.swordHitbox.set(0, 0, 0, 0);
	}

	update() {
		this.player.checkLeftCollisions();
		this.player.checkRightCollisions();

        if (this.player.position.y > this.player.groundHeight){
            this.player.position.y = this.player.groundHeight;
			this.player.velocity.y = 0;
			this.player.changeState(PlayerStateName.Idle);
        }

		/**
		* Only set the sword's hitbox halfway through the animation.
		* Otherwise, it will look like the enemy died as soon as the
		* animation started which visually doesn't really make sense.
		*/
		if (this.player.currentAnimation.isHalfwayDone()) {
			sounds.play(SoundName.Sword);
			this.setSwordHitbox();
		}

		// Idle once one sword swing animation cycle has been played.
		if (this.player.currentAnimation.isDone()) {
			this.player.swordHitbox.set(0, 0, 0, 0);
			this.player.currentAnimation.refresh();
            if(this.player.lastState == PlayerStateName.Jumping || this.player.lastState == PlayerStateName.Falling){
                this.player.changeState(PlayerStateName.Falling);
            }
            else{
                this.player.changeState(PlayerStateName.Idle);
            }
		}

		
	}

	/**
	 * Creates a hitbox based the player's position and direction.
	 */
	setSwordHitbox() {
		let hitboxX, hitboxY, hitboxWidth, hitboxHeight;

		// The magic numbers here are to adjust the hitbox offsets to make it line up with the sword animation.
		if (this.player.direction === Direction.Left) {
			hitboxWidth = this.player.dimensions.x / 7;
			hitboxHeight = this.player.dimensions.x/4;
			hitboxX = this.player.position.x + this.player.dimensions.x/5;
			hitboxY = this.player.position.y + this.player.dimensions.y / 3;
		}
		else if (this.player.direction === Direction.Right) {
			hitboxWidth = this.player.dimensions.x / 7;
			hitboxHeight = this.player.dimensions.x/4;
			hitboxX = this.player.position.x + this.player.dimensions.x/1.5;
			hitboxY = this.player.position.y + this.player.dimensions.y/3;
		}

		this.player.swordHitbox.set(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
	}
}