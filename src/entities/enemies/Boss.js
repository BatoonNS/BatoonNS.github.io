import EnemyStateName from "../../enums/EnemyStateName.js";
import Enemy from "./Enemy.js";
import Animation from "../../../lib/Animation.js";
import Background from "../../objects/Background.js";
import { CANVAS_WIDTH, context, images, keys, timer,DEBUG } from "../../globals.js";


export default class Boss extends Enemy {
	static SPEED = 20;

	constructor(sprites,player) {
		super(sprites,player);

		this.hitboxOffsets.set(0, 0, 0, 0);
		this.speed = Boss.SPEED;

		this.health = 200;
		const animations = {
			[EnemyStateName.Idle]:  new Animation([25,26,27,28,29,30,31,32],0.4),
			[EnemyStateName.Moving]: new Animation([23,24,23,24,23,24],0.25),
            [EnemyStateName.Attacking]: new Animation([0,1,2,3,4,5,6,7],0.1),
		};

		this.stateMachine = this.initializeStateMachine(animations);
	}
	render(){
		super.render();
	}
}
