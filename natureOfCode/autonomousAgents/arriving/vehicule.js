class Vehicule{
  constructor(x,y){
    this.position = createVector(x,y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.maxSpeed = 4;
    this.maxForce = 0.2;
    this.r = 6;
  }

  /////////// METHODS FOR THE CLASS//////////

  //Updates the location of the vehicule
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    //Be careful, now we have to update the force at each draw which will impact on the acceleration
    this.acceleration.mult(0);
  }

  //Applies a force vector to the vehicule
  applyForce(force){
    //Here we could add the concept of mass : acc = force*mass
    this.acceleration.add(force);
  }

  //Methods which calculates the steering force towards a target
  seek(target, arrivalAreaRadius){
    //Keep in mind the idea that steer = current velocity - desired velocity
    var desired = p5.Vector.sub(target, this.position);
    var d = desired.mag();

    if (d < arrivalAreaRadius) {
      var desiredMagnitude = map(d,0,arrivalAreaRadius,0,this.maxSpeed);
      desired.setMag(desiredMagnitude);
    } else {
      desired.setMag(this.maxSpeed);
    }

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce); //Limits the steering force

    this.applyForce(steer);
  }


  display(){
    //Draws a triangle rotated in the direction of velocity
    var theta = this.velocity.heading();

    fill(255);
    stroke(150);
    strokeWeight(1);

    push();
    translate(this.position.x,this.position.y);
    rotate(theta);
    beginShape();
    vertex(this.r*2, 0);
    vertex(-this.r*2, this.r);
    vertex(-this.r*2, -this.r);
    endShape(CLOSE); // Closes the triangle
    pop(); // Returns to the original axis
  }
}
