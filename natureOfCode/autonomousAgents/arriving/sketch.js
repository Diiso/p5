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
	stroke(180);
	strokeWeight(2);
	fill(255);
	ellipse(mouseX, mouseY, 50)
	var mouse = createVector(mouseX, mouseY);

	for (var i = 0; i < vehicules.length; i++) {
		vehicules[i].seek(mouse, 50);
		vehicules[i].update();
		vehicules[i].display();
	}
}
