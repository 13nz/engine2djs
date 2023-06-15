// 8-bit rainbow
const PALETTE = ["#817", "#a35", "#c66", "#e94", "#ed0", "#9d5", "#4d8", "#2cb", "#0bc", "#09c", "#36b", "#639"];

const DEFAULT_RADIUS = 15;

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	sum(otherVector) {
		return new Vector(this.x + otherVector.x, this.y + otherVector.y);
	}

	mult(scalar) {
		return new Vector(this.x * scalar, this.y * scalar);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}