class Vehicule {
  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = ms || 4;
    this.maxForce = mf || 0.2;
    this.r = 4;
  }

  /////////// METHODS FOR THE CLASS//////////
  run() {
    this.update();
    this.borders();
    this.display();
  }

  //Updates the location of the vehicule
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    //Be careful, now we have to update the force at each draw which will impact on the acceleration
    this.acceleration.mult(0);
  }

  //Applies a force vector to the vehicule
  applyForce(force) {
    //Here we could add the concept of mass : acc = force*mass
    this.acceleration.add(force);
  }


  //Methods which calculates the steering force towards a target
  follow(flowfield) {
    //What is the vector at that spot in the flow field ?
    var desired = flowfield.lookup(this.position);
    //Scale it up by its max speed
    desired.mult(this.maxSpeed); //Before the mult, desired had a magnitude of 1
    //Steer = desire - velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  //Allows the vehicule to wrap around the borders
  borders() {
    if (this.position.x < -this.r) {
      this.position.x = width + this.r;
    }
    if (this.position.y < -this.r) {
      this.position.y = height + this.r;
    }
    if (this.position.x > width + this.r) {
      this.position.x = -this.r;
    }
    if (this.position.y > height + this.r) {
      this.position.y = -this.r;
    }
  }


  display() {
    //Draws a triangle rotated in the direction of velocity
    var theta = this.velocity.heading();

    fill(127);
    stroke(200);
    strokeWeight(1);

    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, this.r);
    vertex(-this.r * 2, -this.r);
    endShape(CLOSE); // Closes the triangle
    pop(); // Returns to the original axis
  }
}
