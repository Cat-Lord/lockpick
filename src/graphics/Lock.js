class Lock {
  constructor(engine, lockPickEngine, context) {
    this.engine = engine;
    this.lockPickEngine = lockPickEngine;
    this.context = context;
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

  /**
   * @returns True if the lock is opened. False otherwise, may indicate
   * partial success.
   */
  pickTheLock() {
    console.log('picking lock');
  }

  /**
   * When stopping on a
   */
  stopPickingTheLock() {
    if (this.engine.isSolved()) {
      // don't revert the lock if we solved it
      return;
    }

    this.engine.revert();
    console.log('reverting lock to initial position');
  }

  isKeyAllowed(key) {
    return this.allowedKeys.includes(key);
  }
}
