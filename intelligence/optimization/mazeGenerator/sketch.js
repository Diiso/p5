// This is a Depth-First Search algorith.
// Why? Because when we are on a square, we check every neighbors of the square and then for each neighbor we check all its own neighbors...
// In the end, we will have visited ALL squares. This technique for visiting all squares is called Deep-First Search

var cols, rows;
var w = 40; //Size of each square
var grid = [];

var current; // Current cell being visited

var stack = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(height / w);
  //frameRate(60); //Combien d'itérations de la boucle draw par secondes
  //ATTENTION : frameRate va faire le max entre la valeur qu'on lui donne et le temps pour réaliser une itération de draw...
  //Si ce qui est dans draw prend sa race de temps à tourner, genre 10 min, le frameRate sera de 10 min, pas 5 tours de draw par seconde
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];

}

function draw() { // Dans cet algorithme, c'est le fait de dessiner les bails qui prend du temps. Mais l'algo n'est pas pour autant rapide : il est en O(n²)
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
	current.showCurrent();
  //STEP 1
  var next = current.checkNeighbors(); //Randomly chooses a non-already-visited neighbor
  if (next) {
    next.visited = true;
    //STEP 2
    stack.push(current);
    //STEP 3
    removeWalls(current, next);
    //STEP 4
    current = next;
  } else if (stack.length > 0) {
		current = stack.pop();
  }
}
