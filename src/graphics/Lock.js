/**
 * Represents the whole lock with cylinder and lock pick.
 */
class Lock {
  constructor(config, context) {
    this.context = context;
    this.canvas = config.canvas;
    this.cylinder = new Cylinder(config.difficulty, context);
    this.lockpick = new LockPick(config.difficulty, context);
    // TODO: think about possible 'a'/'d' usage, but will have to
    //       introduce some mechanism that would prevent doubling
    //       of action (e.g. pressing 'a' and then 'd' at the same time)
    this.allowedKeys = ['e'];

    document.onkeydown = (ev) => {
      if (this.isKeyAllowed(ev.key)) {
        this.pickTheLock();
      }
    };

    document.onkeyup = (ev) => {
      if (this.isKeyAllowed(ev.key)) {
        this.stopPickingTheLock();
      }
    };
  }

  pickTheLock() {
    this.cylinder.pickTheLock();
  }

  stopPickingTheLock() {
    this.cylinder.stopPickingTheLock();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cylinder.draw(this.canvas.width / 2, this.canvas.height / 2);
  }

  isKeyAllowed(key) {
    return this.allowedKeys.includes(key);
  }
}
