import Ground from "../../entities/Ground.js";
import Level from "../../objects/Level.js";

/**
 * Encapsulates all logic to create a level
 * that contains pigs, blocks, and birds.
 */
export default class LevelMaker {
	static START_X = 1500;

	static createLevel(level = 1) {
		switch (level) {
			case 1:
				return LevelMaker.levelOne();
			case 2:
				return LevelMaker.levelTwo();
			default:
				return LevelMaker.levelThree();
		}
	}

	static levelOne() {

		return new Level(1);
	}

	static levelTwo() {

		return new Level(2);
	}

	static levelThree() {

		return new Level(3);
	}
}
