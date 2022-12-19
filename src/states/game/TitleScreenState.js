import State from "../../../lib/State.js";
import GameStateName from "../../enums/GameStateName.js";
import ImageName from "../../enums/ImageName.js";
//import SoundName from "../../enums/SoundName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, keys, sounds, stateMachine, timer } from "../../globals.js";

export default class TitleScreenState extends State {
	/**
	 * Displays a title screen where the player
	 * can press enter to start a new game.
	 */
	static LAST_TIME =null;
	constructor() {
		super();
		this.startTime;
		this.bestTimeSec = 0;
		this.bestTimeString = "";

		this.menuOptions = {
			start: 'Start Adventure',
			controls: 'Controls',
		};
	}

	enter() {
		this.highlighted = this.menuOptions.start;
		//sounds.play(SoundName.Rain);
	}

	exit() {
		//sounds.stop(SoundName.Rain);
	}

	update(dt) {
		timer.update(dt);
		//stateMachine.change(GameStateName.Play)

		if (keys.w || keys.s) {
			keys.w = false;
			keys.s = false;
			this.highlighted = this.highlighted === this.menuOptions.start ? this.menuOptions.controls : this.menuOptions.start;
		}

		if (keys.Enter) {
		 	keys.Enter = false;
			
			 if (this.highlighted === this.menuOptions.start) {
				this.startTime = new Date();
				stateMachine.change(GameStateName.Transition, {
					fromState: this,
					toState: stateMachine.states[GameStateName.Play]
				});
			}
			else {
				stateMachine.change(GameStateName.Controls);
			}
			
		}
	}

	render() {
		images.render(ImageName.Title, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.font = '60px Zelda';
		context.fillStyle = 'white';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Soul Castle', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
		context.fillStyle = this.highlighted === this.menuOptions.start ? 'red' : 'white';
		context.font = '20px Zelda';
		context.fillText(`${this.menuOptions.start}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT /2);
		context.fillStyle = this.highlighted === this.menuOptions.controls ? 'red' : 'white';
		context.fillText(`${this.menuOptions.controls}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT /1.6);

		context.font = '18px Zelda';
		context.fillStyle = 'white';
		context.fillText('Best Time:', CANVAS_WIDTH / 2, CANVAS_HEIGHT /1.25);
		//FILLER TIME LOGIC IS ADDED
		if(TitleScreenState.LAST_TIME == null){
			context.fillText('00m:00s', CANVAS_WIDTH / 2, CANVAS_HEIGHT /1.1);
		}	
		else{
			let timeDiff =  TitleScreenState.LAST_TIME.getTime() - this.startTime.getTime(); //difference
			timeDiff = timeDiff/1000; //milliseconds
			let seconds = Math.floor(timeDiff % 60); //find seconds
			let secondsAsString = seconds < 10 ? "0" + seconds : seconds;
			timeDiff = Math.floor(timeDiff /60 ); //find seconds
			let minutes = timeDiff % 60;
			let minutesAsStrings = minutes < 10 ? "0" + minutes : minutes;

			if(seconds < this.bestTimeSec || this.bestTimeSec == 0){
				this.bestTime = seconds;
				this.bestTimeString = minutesAsStrings+'m:'+secondsAsString+'s';
				context.fillText(this.bestTimeString, CANVAS_WIDTH / 2, CANVAS_HEIGHT /1.1);
			}
			context.fillText(this.bestTimeString, CANVAS_WIDTH / 2, CANVAS_HEIGHT /1.1);
		}
			
	}
}