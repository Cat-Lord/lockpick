/**
 * This class represents the inner workings of a lock.
 *
 * A lock consists of chambers which are represented simply by a number.
 * These chambers then have a randomly selected entry point which is a
 * solution to this lock (opens the lock).
 * To make it easier and more enjoyable to guess the correct chamber, a
 * tolerance parameter identifies a range of chambers close to the
 * correct chamber.  The lock pick shouldn't turn at all if not within
 * the tolerance range (or directly on the correct chamber). The closer
 * the selected chamber is towards the correct chamber, the more the
 * lock should turn indicating the approximate position of the lock pick
 * in relation to the correct chamber.
 * Both the number of chambers and the tolerance are generated based on
 * the selected difficulty.
 *
 * Example (disregarding the difficulty):
 *   - a lock has 15 chambers.
 *   - chamber number 4 has been randomly chosen as the correct chamber.
 *   - tolerance generated as "3" makes all the chambers from 1 (4 - 3) up to 7 (4 + 3) susceptible to turning.
 *
 * This means that the person picking such lock as in the example above
 * has to guess and select any chamber from 1 to 7 (inclusive). Any other
 * selection puts the lock pick under tension.
 */
class LockEngine {
  constructor(config) {
    this.chambersCount = this.generateChambers(config.difficulty);
    this.correctChamber = this.selectRandomChamber(this.chambersCount);
    this.tolerance = this.generateTolerance(config.difficulty);
  }

  getChambersCount() {
    return this.chambersCount;
  }

  /**
   * Determines if the selected chamber lies within the the
   * tolerance around the correct chamber.
   * @param {Number} selection: Describes what chamber is currently selected for picking.
   * @returns -1 if the distance from the correct chamber is NOT within the tolerance
   *          range. Otherwise, returns the distance to the correct chamber.
   */
  isWithinTolerance(selection) {
    const distanceFromCorrectChamber = Math.abs(
      this.correctChamber - selection
    );
    if (distanceFromCorrectChamber <= this.tolerance) {
      return distanceFromCorrectChamber;
    }
    return -1;
  }

  generateChambers(difficulty) {
    switch (difficulty) {
      default: {
        return 10;
      }
      // TODO: after testing set the most fitting values.
      // case difficulty.easy:
      //   break;
      // case difficulty.medium:
      //   break;
      // case difficulty.hard:
      //   break;
      // case difficulty.veryHard:
      //   break;
    }
  }

  generateTolerance(difficulty) {
    return 2;
    // TODO: create a more sophisticated algorithm or find
    // suitable values for each difficulty
  }

  selectRandomChamber(chambersCount) {
    return Math.trunc(Math.random() * chambersCount);
  }
}
