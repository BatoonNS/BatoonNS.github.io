import EnemyStateName from "../../enums/EnemyStateName.js";
import Enemy from "./Enemy.js";
import Direction from "../../enums/Direction.js";
import Animation from "../../../lib/Animation.js";
import Background from "../../objects/Background.js";
export default class Skeleton extends Enemy {
	static SPEED = 20;

	constructor(sprites,player) {
		super(sprites,player);

		this.hitboxOffsets.set(0, 0, 0, 0);
		this.speed = Skeleton.SPEED;
		
		const animations = {
			[EnemyStateName.Idle]:  new Animation([26,27,28,29,30],0.4),
			[EnemyStateName.Moving]: new Animation([35,36,37,38,39,40,41],0.25),
            [EnemyStateName.Attacking]: new Animation([0,1,2,3,4,5,6],0.1),
		};

		this.stateMachine = this.initializeStateMachine(animations);
	}

	render(){
		super.render();
	}
}
