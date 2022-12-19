import EnemyStateName from "../../enums/EnemyStateName.js";
import Enemy from "./Enemy.js";
import Animation from "../../../lib/Animation.js";
import Background from "../../objects/Background.js";
import { CANVAS_WIDTH, context, images, keys, timer,DEBUG } from "../../globals.js";


export default class ArmorSkeleton extends Enemy {
	static SPEED = 20;

	constructor(sprites,player) {
		super(sprites,player);

		this.hitboxOffsets.set(0, 0, 0, 0);
		this.speed = ArmorSkeleton.SPEED;

		const animations = {
			[EnemyStateName.Idle]:  new Animation([27,28,29],0.2),
			[EnemyStateName.Moving]: new Animation([37,38,39,40,41,42],0.2),
            [EnemyStateName.Attacking]: new Animation([0,1,2,3,4,5],0.1),
		};

		this.stateMachine = this.initializeStateMachine(animations);
	}
	render(){
		super.render();
	}
}
