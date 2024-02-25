/**
 * Simple visual representation of the lock pick. Consists of
 * 2 parts:
 *  - pick: A movable object allowing for lock chamber selection.
 *  - knife: A static object resembling real lock-picking action. Only a visual
 *           entity without an interactive mechanism.
 */
class LockPick {
  constructor(engine, context) {
    this.context = context;
  }

  turnLockPick() {
    // turn lock pick as the mouse moves around
  }

  shake() {
    // shake to indicate incorrect selection
    // play the sound of the lock shaking
  }

  break() {
    // show lock pick breaking
    // play the sound of the lock breaking
  }
}
