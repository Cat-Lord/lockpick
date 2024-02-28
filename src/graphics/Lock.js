/**
 * Represents the whole lock with cylinder and lock pick.
 */
class Lock {
  constructor(config, context) {
    this.context = context;
    this.canvas = config.canvas;
    this.lockEngine = new LockEngine(config.difficulty);
    this.cylinder = new Cylinder(
      new Position(this.canvas.width / 2, this.canvas.height / 2),
      context
    );
    this.lockpick = new LockPick(config.difficulty, context);
    // TODO: think about possible 'a'/'d' usage, but will have to
    //       introduce some mechanism that would prevent doubling
    //       of action (e.g. pressing 'a' and then 'd' at the same time)
    this.allowedKeys = ['e'];
    this.lockPickingActionId = null;
    this.lockRevertActionId = null;

    document.onkeydown = (ev) => this.startLockPicking(ev.key);
    document.onkeyup = (ev) => this.stopLockPicking(ev.key);
  }

  startLockPicking(key) {
    if (!this.lockPickingActionId && this.isKeyAllowed(key)) {
      this.clearRevertTimeout();
      this.lockPickingActionId = this.reanimate(this.pickTheLock);
    }
  }

  stopLockPicking(key) {
    if (!this.lockRevertActionId && this.isKeyAllowed(key)) {
      this.clearPickingTimeout();
      this.lockRevertActionId = this.reanimate(this.revertLock);
    }
  }

  pickTheLock() {
    this.lockEngine.pickLock();
    console.log('Picking lock: ', this.lockEngine.getPickingProgress());

    this.cylinder.calculateCylinderRotation(
      this.lockEngine.getPickingProgress()
    );

    this.lockPickingActionId = this.reanimate(this.pickTheLock.bind(this));
  }

  revertLock() {
    this.lockEngine.revertLock();
    console.log('Reverting lock: ', this.lockEngine.getPickingProgress());

    this.cylinder.calculateCylinderRotation(
      this.lockEngine.getPickingProgress()
    );
    if (this.lockEngine.getPickingProgress() > 0) {
      this.lockRevertActionId = this.reanimate(this.revertLock.bind(this));
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cylinder.draw();
  }

  reanimate(callback) {
    return setTimeout(callback.bind(this), 100);
  }

  clearPickingTimeout() {
    clearTimeout(this.lockPickingActionId);
    this.lockPickingActionId = null;
  }

  clearRevertTimeout() {
    clearTimeout(this.lockRevertActionId);
    this.lockRevertActionId = null;
  }

  isKeyAllowed(key) {
    return this.allowedKeys.includes(key);
  }
}
