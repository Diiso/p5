class FlowField {
  constructor(resolution) {
    this.resolution = resolution;
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;

    this.field = this.make2Darray(this.cols)
    this.init(zoff);
  }

  make2Darray(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
      array[i] = [];
    }
    return array;
  }

  init(zoff) {
    //Reseeds the noise each time init is run through
    var xoff = 0;
    for (var i = 0; i < this.cols; i++) {
      var yoff = 0;
      for (var j = 0; j < this.rows; j++) {
        var theta = map(noise(xoff, yoff, zoff), 0, 1, 0, TWO_PI);

        this.field[i][j] = createVector(cos(theta), sin(theta));
        yoff += 0.01;
      }
      xoff += 0.01;
    }
  }

  display() {
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
      }
    }
  }

  //Returns the vector of the flow field at the position of lookup
  lookup(lookup) {
    var column = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
    var row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
    return this.field[column][row].copy();
  }

  //Renders a vector object 'v' as an arrow and a location 'x,y'
  drawVector(v, x, y, scale) {
    push();

    var arrowsize = 4;

    translate(x,y);
    rotate(v.heading());
    var len = v.mag()*scale;

    //Draws the line + the arrow head
    line(0,0,len,0); //Stick
    line(len,0,len-arrowsize,arrowsize/2); //Arrowhead
    line(len,0,len-arrowsize,-arrowsize/2); //Arrowhead

    pop();
  }



}
