function Mover() {
  this.position = createVector(random(width),random(height));
  this.velocity = createVector();
  this.acceleration = createVector();
  this.topSpeed = 5;
}

Mover.prototype.update = function() {
  var mouse = createVector(mouseX, mouseY);
  // var d = abs(mouse.mag() - this.position.mag());
  this.acceleration = p5.Vector.sub(mouse, this.position);
  // this.acceleration.setMag(1/d);
  this.acceleration.setMag(0.2);
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.topSpeed);
  this.position.add(this.velocity);
};

Mover.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(150);
  ellipse(this.position.x, this.position.y, 40, 40);
}
