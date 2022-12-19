import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Direction from "../../enums/Direction.js";
import { PlayerStateName } from "../../enums/PlayerStateName.js";
import { keys, timer } from "../../globals.js";

export default class PlayerRollState extends State {
	constructor(player) {
		super();

        this.goIdle = false;
		this.player = player;
		this.animation = new Animation([24,26,25,27,24,26], 0.08,1);
	}

	enter() {
		this.player.currentAnimation = this.animation;
        this.player.isInvincible = true;
        
	}
	update(dt) {
		this.player.checkLeftCollisions();
		this.player.checkRightCollisions();

        if(this.player.currentAnimation.isDone()) {
            this.player.currentAnimation.refresh();
            this.player.isInvincible = false;
            this.player.changeState(PlayerStateName.Falling);
        }	    

    }
}
