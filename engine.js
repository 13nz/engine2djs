var Engine = function () {
    return {
        "bodies": [],
        "createCircle": function(radius, x, y, options) {
            let newCircle = {
                "radius": radius,
                "position": new Vector(x, y),
                "previousPosition": new Vector(x, y),
                "acceleration": new Vector(0, 0),
                "color": "#FF0000",
                ...options
            }
            this.bodies.push(newCircle);
            return newCircle;
        }
    }
}


// verlet   
// previous positions: v_t = p_t - p_{t-1}
// next position: p_{t+1} = p_t + v_t + a_t dt^2
var bodyUpdate = function(dt) {
    let velocity = this.position.sum(this.previousPosition.mult(-1));
    this.previousPosition = this.position;
    this.position = this.position.sum(velocity).sum(this.acceleration.mult(dt * dt));
    this.acceleration = new Vector(0, 0);
}