import Background from "./Background.js";
import Ground from "./Ground.js";
import ImageName from "../enums/ImageName.js";
import EnemyFactory from "../entities/enemies/EnemyFactory.js"
import EnemyType from "../enums/EnemyType.js";
import Sprite from "../../lib/Sprite.js";
import { pickRandomElement } from "../../lib/RandomNumberHelpers.js";
import { images } from "../globals.js";
import Skeleton from "../entities/enemies/Skeleton.js";
import ArmorSkeleton from "../entities/enemies/ArmorSkeleton.js";
import Boss from "../entities/enemies/Boss.js";


export default class Level {
	static SKELETON_SPRITES = 42;
	static ARMORSKELETON_SPRITES = 43;
	static BOSS_SPRITES = 36;
	static LEVEL2_WIDTH = 320
	static LEVEL1_WIDTH = 480;
	/**
	 * The Level contains all the pieces to play the game.
	 *
	 * @param {number} number The current level's number.
	 */
	constructor(number, player) {
		this.number = number;
		this.player = player;
		this.ground = new Ground();
		this.background = null;
		this.entities = null;
		this.Enemy1 = this.generateEnemy1();
		this.Enemy2 = this.generateEnemy2();
		this.Boss = this.generateBoss();

		if(number == 1){
			this.entities = this.level1();
		}
		else{
			this.entities = this.level2();
		}

	}

	update(dt) {
		this.updateEntities(dt);
	}

	render() {
		this.background.render();
		this.ground.render();
		this.entities.forEach(entity => {
            entity.render();
        });
	}

	updateEntities(dt){
		this.entities.forEach((entity,index,arr) => {
			entity.update(dt);
			if (entity.health <= 0) {
				entity.isDead = true;
			}

			if (entity.didCollideWithEntity(this.player.swordHitbox)) {
				entity.receiveDamage(this.player.damage);
			}
			if(this.player.didCollideWithEntity(entity.swordHitbox)){
				this.player.receiveDamage(entity.damage);
			}
			if(entity.isDead){
				arr.splice(index, 1);
			}

			//ADD PLAYER GETS HIT AND ENEMY ATTACK

			if (!entity.isDead && this.player.didCollideWithEntity(entity.hitbox) && !this.player.isInvulnerable) {
				this.player.receiveDamage(entity.damage);
				this.player.becomeInvulnerable();
			}
		});
	}

	level1(){
		Background.LEVEL = ImageName.WorldLevel;
		Background.WIDTH = Level.LEVEL1_WIDTH;
		this.background =new Background();
		let numOfEnemies = 2
		const entities = new Array();

		for (let i = 0; i < numOfEnemies; i++) {
			entities.push(EnemyFactory.createInstance(EnemyType.Skeleton, this.Enemy1, this.player));
		}
		entities.push(EnemyFactory.createInstance(EnemyType.ArmorSkeleton, this.Enemy2, this.player));

		return entities;
	}
	level2(){
		Background.LEVEL = ImageName.BossLevel;
		Background.WIDTH = Level.LEVEL2_WIDTH;
		this.background =new Background();
		const boss = new Array();


		boss.push(EnemyFactory.createInstance(EnemyType.Boss,this.Boss,this.player));
		
		return boss;

	}

	generateEnemy1(){
		const sprite = [];

		for (let x = 0; x < Level.SKELETON_SPRITES; x++) {
			sprite.push(new Sprite(
				images.get(ImageName.Skeleton),
				x * Skeleton.WIDTH,
				0,
				128,
				96,
			));
		}
		return sprite
	}
	generateEnemy2(){
		const sprite = [];

		for (let x = 0; x < Level.ARMORSKELETON_SPRITES; x++) {
			sprite.push(new Sprite(
				images.get(ImageName.ArmorSkeleton),
				x * ArmorSkeleton.WIDTH,
				0,
				128,
				96,
			));
		}
		return sprite
	}
	generateBoss(){
		const sprite = [];

		for (let x = 0; x < Level.BOSS_SPRITES; x++) {
			sprite.push(new Sprite(
				images.get(ImageName.Boss),
				x * Boss.WIDTH,
				0,
				128,
				96,
			));
		}
		return sprite
	}

	didCollideWithEntity(hitbox) {
		return this.hitbox.didCollide(hitbox);
	}


	didWin() {
		
	}
}
