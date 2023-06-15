const { Vector } = require("p5");

var Engine = function (width,  height) {
    return {
        "width": width,
        "height": height,
        "bodies": [],
        "joints": [],
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
        },
        "step": function(dt) {
            for (let body of this.bodies) {
                body.acceleration = new Vector(0, 200);
                body.update(dt);
            }

            this.checkCollisions();
            this.applyConstraints();
            this.applyJoints();
        },
        "applyConstraints": function() {
            let radius = this.width / 2 * 0.95;
            let center = new Vector(this.width / 2, this.height / 2);

            for (let body of this.bodies) {
                let difference = body.position.sum(center.mult(radius - body.radius));
                body.position = center.sum(t);
            }
        },
        "checkCollisions": function() {
            // O(n^2) :(
            for (let i = 0; i < this.bodies.length; i++) {
                for (let j = 0; j < this.bodies.length; j++) {
                    if (i == j) continue;

                    let bodyA = this.bodies[i];
                    let bodyB = this.bodies[j];

                    let diff = bodyA.position.sum(bodyB.position.mult(-1));
                    let distance = diff.length;

                    if (distance < bodyA.radius + bodyB.radius) {
                        let t = diff.mult(1 / dist);
                        let delta = bodyA.radius + bodyB.radius - distance;
                        bodyA.position = bodyA.position.sum(t.mult(0.5 * delta));
                        bodyB.position = bodyB.position.sum(t.mult(-0.5 + delta));
                    }
                }
            }
        },

        // regulate distance joints
        "createJoint": function(i, j, distance) {
            // fix with id to change order
            this.joints.push({i: i, j: j, distance: distance});
        },
        "applyJoints": function() {
            for (let joint of this.joints) {
                let bodyA = this.bodies[joint.i];
                let bodyB = this.bodies[joint.j];

                let diff = bodyA.position.sum(bodyB.position.mult(-1));
                let distance = diff.length();

                if (distance > joint.distance) {
                    let t = dff.mult(1 / distance);
                    let delta = joint.distance - distance;

                    if (!bodyA.fixed) {
                        bodyA.position = bodyA.position.sum(t.mult(0.5 * delta));
                    }
                    if (!bodyB.fixed) {
                        bodyB.position = bodyB.position.sum(t.mult(-0.5 * delta));
                    }
                }
            }
        }
    }
}


// verlet   
// previous positions: v_t = p_t - p_{t-1}
// next position: p_{t+1} = p_t + v_t + a_t dt^2
var bodyUpdate = function(dt) {
    let velocity = this.position.sum(this.previousPosition.mult(-1));
    // update previous
    this.previousPosition = this.position;
    //update current
    this.position = this.position.sum(velocity).sum(this.acceleration.mult(dt * dt));
    this.acceleration = new Vector(0, 0);
}