var walker;
var stepSize = 2;

function Walker(){
	this.x;
	this.y;

	this.x = 5;
	this.y = height/2;

	this.walk = function(){
		var choice = random(1);
		if (choice < 0.4) {
			this.x += stepSize;
		}else if (choice < 0.6) {
			this.y -= stepSize;
		}else if (choice < 0.8) {
			this.y += stepSize;
		}else {
			this.x -= stepSize;
		}
	}

	this.show = function(){
		stroke(255);
		point(this.x, this.y)
	}
}

function setup() {
	createCanvas(1000, 400);
	walker = new Walker();
	background(0);
	console.log(walker);
	
}

function draw() {
	walker.walk();
	walker.show();
}
