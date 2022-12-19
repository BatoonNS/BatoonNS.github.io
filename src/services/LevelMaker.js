import Ground from "../objects/Ground.js";
import Level from "../objects/Level.js";

/**
 * Encapsulates all logic to create a level
 * that contains pigs, blocks, and birds.
 */
export default class LevelMaker {
	static START_X = 1500;

	static CreateLevel(level, player) {
		switch (level) {
			case 1:
				return LevelMaker.levelOne(player);
			default:
				return LevelMaker.levelTwo(player);
		}
	}

	static levelOne(player) {
		
		return new Level(1, player);
	}


	static levelTwo(player) {

		return new Level(2, player);
	}
}
