import Animation from "../../lib/Animation.js";
import Sprite from "../../lib/Sprite.js";
import StateMachine from "../../lib/StateMachine.js";
import Timer from "../../lib/Timer.js";
import Vector from "../../lib/Vector.js";
import Direction from "../enums/Direction.js"
import ImageName from "../enums/ImageName.js";
import { PlayerStateName } from "../enums/PlayerStateName.js";
import { CANVAS_WIDTH,sounds, context, images, keys, timer,DEBUG } from "../globals.js";
import PlayerFallState from "../states/player/PlayerFallState.js";
import PlayerIdleState from "../states/player/PlayerIdleState.js";
import PlayerJumpState from "../states/player/PlayerJumpState.js";
import PlayerRollState from "../states/player/PlayerRollState.js";
import PlayerRunState from "../states/player/PlayerRunState.js";
import Ground from "../objects/Ground.js";
import Hitbox from "../../lib/Hitbox.js"
import PlayerAttackState from "../states/player/PlayerAttackState.js";
import GameEntity from "./GameEntity.js";
import Background from "../objects/Background.js";
import PlayerPrayState from "../states/player/PlayerPrayState.js";
import SoundName from "../enums/SoundsName.js";

export default class Player extends GameEntity {
	static WIDTH = 128;
	static HEIGHT = 64;
	static TOTAL_SPRITES = 6;
	static SPRITE_ROWS = 4;
	static SPRITE_COLUMNS = 2;
	static VELOCITY_LIMIT = 100;

	/**
	 * The hero character the player controls in the map.
	 * Has the ability to jump and will collide into tiles
	 * that are collidable.
	 *
	 * @param {Vector} dimensions The height and width of the player.
	 * @param {Vector} position The x and y coordinates of the player.
	 * @param {Vector} velocityLimit The maximum speed of the player.
	 */
	constructor(dimensions, position, velocityLimit) {
		super();
		this.dimensions = dimensions;
		this.position = position;
		this.velocity = new Vector(0, 0);
		this.velocityLimit = velocityLimit;
		this.isInvincible = false;
		this.rollRight = new Vector(50,0);
		this.rollLeft = new Vector(-50,0);
		this.positionOffset = { x: 0, y: 0 };

		this.jumpForce = new Vector(0, -250);
		this.gravityForce = new Vector(0, 1000);
		this.speedScalar = 5;
		this.frictionScalar = 0.80;
		this.groundHeight = Ground.MEASUREMENTS.y;

	
		this.sprites = Player.generateSprites();
		this.currentAnimation = null;
		this.lastState = null;
		this.swordHitbox = new Hitbox(0,0,0,0);
		this.damage = 50;
		this.health = 1000000;
				this.hitbox = new Hitbox(
			this.position.x + this.hitboxOffsets.position.x,
			this.position.y + this.hitboxOffsets.position.y,
			this.dimensions.x + this.hitboxOffsets.dimensions.x,
			this.dimensions.y + this.hitboxOffsets.dimensions.y,
		);
		this.stateMachine = new StateMachine();
		this.stateMachine.add(PlayerStateName.Idle, new PlayerIdleState(this));
		this.stateMachine.add(PlayerStateName.Running, new PlayerRunState(this));
		this.stateMachine.add(PlayerStateName.Jumping, new PlayerJumpState(this));
		this.stateMachine.add(PlayerStateName.Falling, new PlayerFallState(this));
		this.stateMachine.add(PlayerStateName.Rolling, new PlayerRollState(this));
		this.stateMachine.add(PlayerStateName.Attacking, new PlayerAttackState(this));
		this.stateMachine.add(PlayerStateName.Pray, new PlayerPrayState(this));

		this.changeState(PlayerStateName.Pray);
	}

	changeState(state, parameters){
		this.lastState = this.stateMachine.currentState.name;
		this.stateMachine.change(state, parameters);
	}

	update(dt) {
		this.checkLeftCollisions();
		this.checkRightCollisions();
		this.hitbox.set(
			this.position.x+Player.WIDTH/2-12,
			this.position.y+Player.HEIGHT/2-20, 
			this.dimensions.x-105, 
			this.dimensions.y-10,
		);
		this.currentAnimation.update(dt);
		this.position.add(this.velocity, dt);
		this.stateMachine.update(dt);
	}
	/**
	 * Draw character, this time getting the current frame from the animation.
	 * We also check for our direction and scale by -1 on the X axis if we're facing left.
	 */
	 render() {
	
		if (this.direction === Direction.Left) {
			
			context.save();
			context.translate(Math.floor(this.position.x) + this.dimensions.x, Math.floor(this.position.y));
			context.scale(-1, 1);
			this.sprites[this.currentAnimation.getCurrentFrame()].render(0, 0);
			context.restore();
		}
		else {
			this.sprites[this.currentAnimation.getCurrentFrame()].render(Math.floor(this.position.x), Math.floor(this.position.y));
		}
		if (DEBUG) {
			this.hitbox.render(context);
			this.swordHitbox.render(context);
		}
	}

	/**
	 * Loops through the character sprite sheet and
	 * retrieves each sprite's location in the sheet.
	 * MAGIC NUMBERS: Used because all sprite sheets have different sizes so its easier to put correct number for all.
	 *
	 * @returns The array of sprite objects.
	 */
	static generateSprites() {
		const sprites = [];

		//idle
		for (let x = 0; x < Player.SPRITE_COLUMNS; x++) {
			for (let y = 0; y < Player.SPRITE_ROWS; y++) {
				sprites.push(new Sprite(
					images.get(ImageName.Player),
					x * Player.WIDTH,
					y * Player.HEIGHT,
					128,
					64,
				));
			}
		}

		//run
		for (let x = 0; x < Player.SPRITE_COLUMNS; x++) {
			for (let y = 0; y < Player.SPRITE_ROWS; y++) {
				sprites.push(new Sprite(
					images.get(ImageName.PlayerRun),
					x * Player.WIDTH,
					y * Player.HEIGHT,
					128,
					64,
				));
			}
		}

		//jump
		for (let x = 0; x < Player.SPRITE_COLUMNS; x++) {
			for (let y = 0; y < Player.SPRITE_ROWS; y++) {
				sprites.push(new Sprite(
					images.get(ImageName.PlayerJump),
					x * Player.WIDTH,
					y * Player.HEIGHT,
					128,
					64,
				));
			}
		}

		//Roll
		for (let x = 0; x < Player.SPRITE_COLUMNS; x++) {
			for (let y = 0; y < Player.SPRITE_ROWS/2; y++) {
				sprites.push(new Sprite(
					images.get(ImageName.PlayerRoll),
					x * Player.WIDTH,
					y * Player.HEIGHT,
					128,
					64,
				));
			}
		}

		//Attack
		for (let x = 0; x < 8; x++) {
			for (let y = 0; y < 5; y++) {
				sprites.push(new Sprite(
					images.get(ImageName.PlayerAttack),
					x * Player.WIDTH,
					y * Player.HEIGHT,
					128,
					64,
				));
			}
		}

		//Pray (Campfire)
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 3; y++) {
				sprites.push(new Sprite(
					images.get(ImageName.PlayerPray),
					x * Player.WIDTH,
					y * Player.HEIGHT,
					128,
					64,
				));
			}
		}

		return sprites;
	}

	moveLeft() {
		this.direction = Direction.Left;
		this.velocity.x = Math.max(this.velocity.x - this.speedScalar * this.frictionScalar, -this.velocityLimit.x);
	}

	moveRight() {
		this.direction = Direction.Right;
		this.velocity.x = Math.min(this.velocity.x + this.speedScalar * this.frictionScalar, this.velocityLimit.x);
	}

	stop() {
		if (Math.abs(this.velocity.x) > 0) {
			this.velocity.x *= this.frictionScalar;
		}

		if (Math.abs(this.velocity.x) < 0.45) {
			this.velocity.x = 0;
		}
		
		
	}

	/*
	* sprite is much bigger than it looks for swinging animations
	* so we use a math formula to calculate his left and right borders
	* which is seen below.
	* Left Border: Player.WIDTH/2-8
	* Right Border: Player.WIDTH/2+8
	*/

	receiveDamage() {
		if(this.isInvincible){
			return;
		}
		else{
			sounds.play(SoundName.HitPlayer);
			this.isDead = true;
		}
	}
	becomeInvulnerable() {

		if(this.isInvincible){
			return;
		}
		else{
			this.isInvincible = true;
		}

	}
}
