import State from "../../../lib/State.js";
import Vector from "../../../lib/Vector.js";
import Ground from "../../objects/Ground.js";
import Player from "../../entities/Player.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, stateMachine, timer,sounds } from "../../globals.js";
import LevelMaker from "../../services/LevelMaker.js";
import Camera from "../../../lib/Camera.js"
import Background from "../../objects/Background.js";
import GameStateName from "../../enums/GameStateName.js";
import TitleScreenState from "./TitleScreenState.js";
import SoundName from "../../enums/SoundsName.js";
export default class PlayState extends State {
	constructor(mapDefinition) {
		super();

		this.player = null;
		this.SetPlayer()

		this.map = null;
		this.ResetMap();

		this.camera = null;
		this.SetCamera()
	}
	enter(){
		sounds.play(SoundName.Music);

	}

	update(dt){
		timer.update(dt);
		this.map.update(dt);
		this.player.update(dt);
		this.camera.update();

		//MAP change on side of room
		if(this.map.entities.length <= 0 && this.map.number != 2 && this.player.position.x >= Background.WIDTH-Player.WIDTH/2-8){
			this.SetPlayer();
			this.map = LevelMaker.CreateLevel(2,this.player);
			this.SetCamera();
		}

		//DEATH conditions
		if(this.player.isDead){
			this.SetPlayer();
			this.ResetMap();
			this.SetCamera();
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.Death]
			});
		}

		//WIN conditions
		if(this.map.entities.length <= 0 && this.map.number >= 2){
			TitleScreenState.LAST_TIME = new Date();
			this.SetPlayer();
			this.ResetMap();
			this.SetCamera();
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.Victory]
			});
		}

	}
	render(){
		this.map.entities.forEach(entitie => {
			entitie.render();
		}); this.map.render();
		this.renderViewport();	
	}

	renderViewport(){
		context.save();
		context.translate(-this.camera.position.x, this.camera.position.y);
		this.map.render();
		this.player.render();
		context.restore();
	}

	SetPlayer(){
		this.player = new Player(
			new Vector(Player.WIDTH, Player.HEIGHT),
			//position off wall -(Player.WIDTH/2-12), where 8 would be the left player border but for space 4 is added
			new Vector(-(Player.WIDTH/2-12), CANVAS_HEIGHT - (Player.HEIGHT+Ground.FLOOR.height)),
			new Vector(Player.VELOCITY_LIMIT, Player.VELOCITY_LIMIT),
		);
	}

	ResetMap(){
		this.map = LevelMaker.CreateLevel(1,this.player);
	}

	SetCamera(){
		this.camera = new Camera(
			this.player,
			new Vector(Background.WIDTH, CANVAS_HEIGHT),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT)
		);
	}
}
