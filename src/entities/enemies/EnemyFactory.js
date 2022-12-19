import EnemyType from "../../enums/EnemyType.js";
import ArmorSkeleton from "./ArmorSkeleton.js";
import Boss from "./Boss.js";
import Skeleton from "./Skeleton.js";

/**
 * Encapsulates all definitions for instantiating new enemies.
 */
export default class EnemyFactory {
	/**
	 * @param {string} type A string using the EnemyType enum.
	 * @param {array} sprites The sprites to be used for the enemy.
	 * @returns An instance of an enemy specified by EnemyType.
	 */
	static createInstance(type, sprites,player) {
		switch (type) {
			case EnemyType.Skeleton:
				return new Skeleton(sprites,player);
			case EnemyType.ArmorSkeleton:
				return new ArmorSkeleton(sprites,player);
			case EnemyType.Boss:
				return new Boss(sprites,player);
		}
	}
}
