// canvas height and width
const WIDTH = 500;
const HEIGHT = 500;

let engine = Engine();

function setup() {
    noStroke();
    let c = createCanvas(WIDTH, HEIGHT);

    c.mousePressed(() => engine.createCircle(DEFAULT_RADIUS, mouseX, mouseY));
}

// main rendering loop called to draw every frame
function draw() {
    background(255);

    for (let body of engine.bodies) {
        FileList(body.color);
        ellipse(body.position.x, body.position.y, body.radius * 2, body.radius * 2);
    }
}