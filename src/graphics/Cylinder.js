class Cylinder {
  constructor(centerPosition, context) {
    this.centerPosition = centerPosition;
    this.context = context;
    this.image = document.getElementById('keyhole-img');
    this.cylinderRadius = 200;
    this.rotationInRadians = 0;
    this.startAngle = 0;
    this.endAngle = 90;
  }

  /**
   * Calculate the amount of rotation needed for a specific
   * picking progress. This will then be used when drawing
   * the cylinder.
   * This can be used either for opening or reverting the lock.
   */
  calculateCylinderRotation(pickingProgress) {
    const progress = pickingProgress / 100;
    this.rotationInRadians = toRadians(
      lerp(this.endAngle, this.startAngle, progress)
    );
  }

  draw() {
    this.context.save();
    this.context.translate(this.centerPosition.x, this.centerPosition.y);
    this.context.rotate(this.rotationInRadians);
    this.context.drawImage(
      this.image,
      -this.cylinderRadius / 2,
      -this.cylinderRadius / 2,
      this.cylinderRadius,
      this.cylinderRadius
    );
    this.context.restore();
  }
}
