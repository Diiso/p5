var vehicules = [];
var total = 20;

function setup() {
	createCanvas(600, 400);
	for (var i = 0; i < total; i++) {
		vehicules.push(new Vehicule(random(width), random(height)));
	}
}

function draw() {
	background(0);
	var mouse = createVector(mouseX, mouseY);

	for (var i = 0; i < vehicules.length; i++) {
		vehicules[i].seek(mouse);
		vehicules[i].update();
		vehicules[i].display();
	}
}
