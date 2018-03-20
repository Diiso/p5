var cols = 100;
var rows = 100;
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

  if (random(1) < 0.3) {
    this.wall = true;
  }
  this.show = function(col) {
    //fill(col);
    if (this.wall) {
      fill(0);
      noStroke();
      ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
			//rect(this.i * h, this.j * h, w - 1, h - 1);
    }
		//rect(this.i * h, this.j * h, w - 1, h - 1);
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
  }

  this.connectDiagonalNeighbors = function(grid) {
    if (i > 0 && j > 0 && !(grid[i - 1][j].wall && grid[i][j - 1].wall)) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0 && !(grid[i][j - 1].wall && grid[i + 1][j].wall)) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1 && !(grid[i - 1][j].wall && grid[i][j + 1].wall)) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1 && !(grid[i + 1][j].wall && grid[i][j + 1].wall)) {
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

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].connectDiagonalNeighbors(grid);
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
  ///////////////////////////BEGINNING OF THE SEARCH/////////////////////////////////
	// Idée : on se trouve en un noeud n. Pour bouger de ce noeud n, on regarde les voisins directs de n.
	// On attribue à ces voisins une valeur f calculée ainsi : f est le cout pour ce déplacer jusqu'au voisin en question (la valeur g) PLUS une heuristique h
	// Cette heuristique est une estimation de combien on est distant de l'arrivée si on prend comme prochain noeud le voisin qu'on regarde là maintenant.
	// Puis, on cherche la valeur minimale de f parmi tous les voisins directs du noeud. On bouge vers le voisin qui a le f le plus petit.
	// DONC tout l'algorithme repose sur le choix de l'heuristique.
	// Si l'heuristique est bonne, on se rapprochera de la solution optimale du problème. Sinon, on aura une solution toute moisie.
	// Une manière de construire cette heuristique peut d'ailleurs être avec du machine learning.
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
	//background(0)
	background(255);
  for (var i = 0; i < cols; i++) { //To draw each Spot
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  // for (var i = 0; i < closedSet.length; i++) { //To color each spot wether it is in the closedSet/openSet
  //   closedSet[i].show(color(255, 0, 0));
  // }
  //
  // for (var i = 0; i < openSet.length; i++) {
  //   openSet[i].show(color(0, 255, 0));
  // }

  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // for (var i = 0; i < path.length; i++) {
  //   path[i].show(color(0, 0, 255));
  // }

  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2)
  }
  endShape();

}
