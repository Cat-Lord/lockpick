class Cylinder {
  constructor(difficulty, context) {
    this.engine = new LockEngine(difficulty);
    this.context = context;
    // TODO: think about possible 'a'/'d' usage, but will have to
    //       introduce some mechanism that would prevent doubling
    //       of action (e.g. pressing 'a' and then 'd' at the same time)
    this.allowedKeys = ['e'];
    this.image = document.getElementById('keyhole-img');

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

  draw() {
    if (!this.image) {
      console.log('image not yet loaded', this.image);
      return;
    }

    this.context.drawImage(this.image, 0, 0, 200, 200);
  }
}
