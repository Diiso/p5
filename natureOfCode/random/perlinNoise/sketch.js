var tx = 0;
var ty = 0.05;

function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(0);
	tx += 0.01;
	ty += 0.02;
	var x = noise(tx);
	var y = noise(ty)
	x = map(x, 0, 1, 0, width);
	y = map(y, 0, 1, 0, height);

	fill(255);
	ellipse(x, y,40,40);
}
