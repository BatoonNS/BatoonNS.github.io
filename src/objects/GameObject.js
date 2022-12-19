import Vector from "../../lib/Vector.js";


export default class GameObject {
	constructor(entityDefinition = {}) {
		
		this.position = entityDefinition.position ?? new Vector();
        this.width;
        this.height;
		this.isSolid;
		this.isCollidable;
		this.isConsumable;
	}
	update(dt) {

	}
	render() {
    }

}
