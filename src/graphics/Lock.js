/**
 * Represents the whole lock with cylinder and lock pick.
 */
class Lock {
  constructor(difficulty, context) {
    this.cylinder = new Cylinder(difficulty, context);
    this.lockpick = new LockPick(difficulty, context);
  }

  draw() {
    this.cylinder.draw();
  }
}
