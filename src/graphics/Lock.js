class Lock {
  constructor(engine, context) {
    this.engine = engine;
    this.context = context;

    document.onkeydown = (ev) => {
      if (ev.key === 'a' || ev.key === 'd') {
        this.tryOpenLock();
      }
    };
    document.onkeyup = this.revertLockPosition;
  }

  /**
   * @returns True if the lock is opened. False otherwise, may indicate
   * partial success.
   */
  tryLockOpening(ev) {}

  /**
   * When stopping on a
   */
  revertLockPosition() {
    if (this.isSolved()) {
      // don't revert the lock if we solved it
      return;
    }

    // TODO: turn the angle down, determine the suitable value
    this.angle = Math.max(this.angle - 5, 0);
  }

  isSolved() {
    return this.angle === 90;
  }
}
