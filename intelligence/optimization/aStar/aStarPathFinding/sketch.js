var cols = 50;
var rows = 50;
var grid = new Array(cols);

var w, h;
var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

////////////////////////////////////////////////////////////////////////////
function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false

  if (random(1) < 0.4) {
    this.wall = true;
  }
  this.show = function(col) {
    fill(col);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.i * h, this.j * h, w - 1, h - 1);
  }
  ////////////////////////////////////////////////////////////////////////////
  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}
////////////////////////////////////////////////////////////////////////////
function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1); //To remove the element
    }
  }
}
////////////////////////////////////////////////////////////////////////////
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j) //dist is a p5 function. But it's not hard to code really... It's a euclidian distance
  //var d = abs(a.i - b.i) + abs(a.j - b.j) //distance de manhattan
  return d;
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function setup() {
  createCanvas(400, 400);
  w = width / cols; //width and height are global variables of p5, inside of createCanvas
  h = height / rows;
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
  console.log(grid);
}
////////////////////////////////////////////////////////////////////////////
function draw() { // This is like a while loop
  background(0);
  ///////////////////////////BEGINNING OF THE SEARCH/////////////////////////////////
  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];
    if (current === end) {
      console.log("DONE!");
      noLoop();
    }
    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;

				var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
						newPath = true;
          }
        } else {
          neighbor.g = tempG;
					newPath = true;
          openSet.push(neighbor);
        }

				if (newPath) {
					neighbor.h = heuristic(neighbor, end); // Educated guess : je regarde la distance à vol d'oiseau de Quimper à Lyon et je choisis mon chemin pour se rapprocher le plus possible de cette distance à vol d'oiseau
	        neighbor.f = neighbor.g + neighbor.h;
	        neighbor.previous = current;
				}

      }
    }
  } else {
    console.log("No solution");
    noLoop();
		return;
  }
  ///////////////////////////END OF THE SEARCH/////////////////////////////////
  for (var i = 0; i < cols; i++) { //To draw each Spot
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (var i = 0; i < closedSet.length; i++) { //To color each spot wether it is in the closedSet/openSet
    closedSet[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

	for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }
}
