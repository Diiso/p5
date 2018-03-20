var walker;
var maxSteps = 2;
var tx;
var ty;

function Walker(){
	this.x;
	this.y;

	this.x = width/2;
	this.y = height/2;

	this.walk = function(){
		var x = noise(tx);
		tx += 0.01;
		var y = noise(ty);
		ty += 0.01;

		x = map(x,0,1,-maxSteps,maxSteps);
		y = map(y,0,1,-maxSteps,maxSteps);

		this.x += x;
		this.y += y;
		// var choice = floor(random(4));
		// if (choice == 0) {
		// 	this.y -= stepSize;
		// }else if (choice == 1) {
		// 	this.x += stepSize;
		// }else if (choice == 2) {
		// 	this.y += stepSize;
		// }else if (choice == 3) {
		// 	this.x -= stepSize;
		// }
	}

	this.show = function(){
		stroke(255);
		point(this.x, this.y)
	}
}

function setup() {
	tx = random(9000);
	ty = random(9000);
	createCanvas(600, 400);
	walker = new Walker();
	background(0);
	console.log(walker);
}

function draw() {
	walker.walk();
	walker.show();
}
