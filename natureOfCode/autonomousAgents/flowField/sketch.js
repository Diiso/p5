var debug = true;
var vehicules = [];
var total = 200;
var resolution = 20;
var flowfield;
var zoff;

function setup() {
  var text = createP("Hit space bar to toggle debugging lines.<br>Click the mouse to generate new flow field");
  createCanvas(1000, 800);
  text.position(10, height + 10);
	zoff = Math.random(10000);
  flowfield = new FlowField(resolution);
  for (var i = 0; i < total; i++) {
    vehicules.push(new Vehicule(random(width), random(height), random(2, 5), random(0.1, 0.8)));
  }
}

function draw() {
  background(51);

  //Display the flow field in "debug" mode
  if (debug) {
    flowfield.display();
  }

  for (var i = 0; i < vehicules.length; i++) {
    vehicules[i].follow(flowfield);
    vehicules[i].run();
  }

	flowfield.init(zoff);
	zoff += 0.007;
}

function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}

//OBSOLETE
//Makes a new flowfield
// function mousePressed() {
//   flowfield.init(zoff);
// 	zoff += 0.01;
// }
