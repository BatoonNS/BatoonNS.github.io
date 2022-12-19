import { getRandomPositiveInteger } from "../../../lib/RandomNumberHelpers.js";
import EnemyStateName from "../../enums/EnemyStateName.js";
import EnemyAttackState from "../../states/enemy/EnemyAttackState.js";
import EnemyIdleState from "../../states/enemy/EnemyIdleState.js";
import EnemyWalkingState from "../../states/enemy/EnemyWalkState.js";
import EnemyChasingState from "../../states/enemy/EnemychasingState.js";
import GameEntity from "../GameEntity.js";
import StateMachine from "../../../lib/StateMachine.js";
import Background from "../../objects/Background.js";
import Ground from "../../objects/Ground.js";
import Vector from "../../../lib/Vector.js";
import Direction from "../../enums/Direction.js";

export default class Enemy extends GameEntity{
    static WIDTH = 128;
    static HEIGHT = 96;

    	/**
	 * The enemy characters in the game that randomly
	 * walk around the room and can damage the player.
	 */
	constructor(sprites,player) {
		super();
		this.player = player;
		this.velocity = new Vector(0, 0);
		this.velocityLimit = 100;
		this.sprites = sprites;
		this.position.x = getRandomPositiveInteger(Enemy.WIDTH, Background.WIDTH/1.5);
		this.position.y = Background.HEIGHT-Enemy.HEIGHT-Ground.FLOOR.height;
		this.dimensions.x = Enemy.WIDTH;
		this.dimensions.y = Enemy.HEIGHT;
		this.stateMachine = new StateMachine();
		this.direction = Direction.Left;
		this.speedScalar = 5;
		this.frictionScalar = 0.80;
		this.damage = 100;
	}

	receiveDamage(damage) {
		this.health -= damage;
	}

	initializeStateMachine(animations) {
		

		this.stateMachine.add(EnemyStateName.Idle, new EnemyIdleState(this, animations[EnemyStateName.Idle]));
		this.stateMachine.add(EnemyStateName.Moving, new EnemyWalkingState(this, animations[EnemyStateName.Moving],this.player));
        this.stateMachine.add(EnemyStateName.Attacking, new EnemyAttackState(this, animations[EnemyStateName.Attacking]));
		this.stateMachine.add(EnemyStateName.Chasing, new EnemyChasingState(this, animations[EnemyStateName.Chasing], this.player));


		this.stateMachine.change(EnemyStateName.Idle);

		return this.stateMachine;
	}
	moveLeft() {
		this.direction = Direction.Left;
		this.velocity.x = Math.max(this.velocity.x - this.speedScalar * this.frictionScalar, -this.velocityLimit);
	}
	moveRight() {
		this.direction = Direction.Right;
		this.velocity.x = Math.min(this.velocity.x + this.speedScalar * this.frictionScalar, this.velocityLimit);
	}


}