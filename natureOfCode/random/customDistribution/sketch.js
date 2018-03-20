// Simulates a uniform distribution

var randomCounts = [];
var total = 100; //Nbr de points divisant l'intervalle [0,1]

function setup() {
	for (var i = 0; i < total; i++) {
		randomCounts.push(0);
	}
	createCanvas(600, 400);
	background(255);
}

function draw() {
	var index = customDistro();
	randomCounts[index]++;

	stroke(0);
	fill(150);
	var w = width/randomCounts.length;
	for (var i = 0; i < randomCounts.length; i++) {
		rect(i*w,height-randomCounts[i],w-1,randomCounts[i]) // Draws a rect(x,y,w,h) at location x,y and width w/height h
	}
}


function customDistro(){
	var randomValue = random(1);
	var r = random(1);
	if (r < randomValue*randomValue) { // The distribution here is the square function
		return floor(randomValue*100)
	} else {
		customDistro();
	}
}
