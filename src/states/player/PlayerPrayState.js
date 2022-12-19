import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Timer from "../../../lib/Timer.js";
import { PlayerStateName } from "../../enums/PlayerStateName.js";
import { keys } from "../../globals.js";

export default class PlayerPrayState extends State {
	constructor(player) {
		super();

		this.timer =new Timer();
		this.player = player;
		this.animation = new Animation([77,80,72,75,78,81], 0.2);

	}

	enter() {
		//this.timer.wait(300);
		this.player.currentAnimation = this.animation;
	}

	update() {
		if(this.player.currentAnimation.isDone()) {
            this.player.changeState(PlayerStateName.Idle);
        }	  
	}
}