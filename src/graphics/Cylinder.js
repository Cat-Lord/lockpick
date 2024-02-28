class Cylinder {
  constructor(difficulty, context) {
    this.engine = new LockEngine(difficulty);
    this.context = context;
    this.image = document.getElementById('keyhole-img');
    this.cylinderRadius = 200;
    this.startAngle = 0;
    this.endAngle = 90;
    this.revertLockTimeoutId = null;
  }

  /**
   * @returns True if the lock is opened. False otherwise, may indicate
   * partial success.
   */
  pickTheLock() {
    this.stopRevertAnimation();
    this.engine.pickLock();
  }

  /**
   * When stopping when picking a lock the cylinder
   * slowly moves back to the initial position.
   * Returns picking progress in percentage to w
   */
  stopPickingTheLock() {
    if (this.engine.isSolved()) {
      // don't revert the lock if we solved it
      console.log('Not reverting, lock is solved');
      return;
    }

    if (this.revertLockTimeoutId === null) {
      this.revertLock();
    }
  }

  revertLock() {
    this.engine.revert();
    if (this.engine.getPickingProgress() === 0) {
      this.stopRevertAnimation();
    }
    this.revertLockTimeoutId = setTimeout(this.revertLock.bind(this), 60);
  }

  stopRevertAnimation() {
    clearTimeout(this.revertLockTimeoutId);
    this.revertLockTimeoutId = null;
  }

  draw(centerX, centerY) {
    const pickingProgress = this.engine.getPickingProgress();
    const progress = pickingProgress / 100;
    this.context.save();
    const angle = this.getRadian(this.interpolate(progress));
    this.context.translate(centerX, centerY);
    this.context.rotate(angle);
    this.context.drawImage(
      this.image,
      -this.cylinderRadius / 2,
      -this.cylinderRadius / 2,
      this.cylinderRadius,
      this.cylinderRadius
    );
    this.context.restore();
  }

  getRadian(angle) {
    return (angle * Math.PI) / 180;
  }

  interpolate(progress) {
    return this.endAngle * progress + this.startAngle * (1 - progress);
  }
}
