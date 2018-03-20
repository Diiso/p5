// Simulates a uniform distribution

var randomCounts = [];
var total = 20;

function setup() {
	for (var i = 0; i < total; i++) {
		randomCounts.push(0);
	}
	createCanvas(600, 400);
	background(255);
}

function draw() {
	var index = floor(random(randomCounts.length));
	randomCounts[index]++;

	stroke(0);
	fill(150);
	var w = width/randomCounts.length;
	for (var i = 0; i < randomCounts.length; i++) {
		rect(i*w,height-randomCounts[i],w-1,randomCounts[i]) // Draws a rect(x,y,w,h) at location x,y and width w/height h
	}
}
