import { Difficulties } from '../constants/Difficulty';
import { Proxy, createProxy } from './createNumberProxy';

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
 *
 * Picking a lock is represented with a number 0-100, 0 meaning the lock
 * is in its initial state, 100 meaning the lock has been open (can be
 * viewed as percentage).
 */
export class LockEngine {
  private readonly tolerance: number;
  private readonly correctChamber: number;
  private pickingProgress: Proxy<number>;
  private maxAllowedProgress: Proxy<number>;
  private chambersCount: number;
  private lockPickHpElement: HTMLElement;
  private maxAllowedProgressElement: HTMLElement;
  public isStuck = false;
  public isSolved = false;

  constructor(difficulty: Difficulties) {
    // TODO: create a more sophisticated algorithm or find suitable values for each difficulty
    this.tolerance = 2;
    this.lockPickHpElement = this.loadHtmlElement('lock-progress');
    this.maxAllowedProgressElement = this.loadHtmlElement(
      'max-allowed-progress'
    );
    this.pickingProgress = createProxy<number>(
      0,
      (progress) => (this.lockPickHpElement.innerHTML = progress + '%')
    );
    this.maxAllowedProgress = createProxy<number>(
      0,
      (currentMaxAllowedProgress) =>
        (this.maxAllowedProgressElement.innerHTML =
          currentMaxAllowedProgress + '%')
    );

    this.chambersCount = this.generateChambersCount(difficulty);
    this.correctChamber = this.selectRandomChamber(this.chambersCount);
    console.log(
      `Lock Engine: created ${this.chambersCount} with correct lock ${this.correctChamber}`
    );
  }

  pickLock(selectedChamber: number): number {
    if (this.pickingProgress.value === 100) {
      this.isSolved = true;
    } else if (this.isWithinTolerance(selectedChamber)) {
      this.pickingProgress.value = Math.min(
        this.pickingProgress.value + 5,
        100
      );
      this.maxAllowedProgress.value =
        this.getMaxAllowedProgressBasedOnProximity(selectedChamber);

      // if we haven't solved yet but stepped over the rotation limit
      this.isStuck =
        this.maxAllowedProgress.value !== 100 &&
        this.pickingProgress.value >= this.maxAllowedProgress.value;
      this.pickingProgress.value = Math.min(
        this.pickingProgress.value,
        this.maxAllowedProgress.value
      );
    } else {
      this.isStuck = true;
    }
    return this.pickingProgress.value;
  }

  /* 
    If we are close to the correct chamber, we are allowed a
    partial rotation. This function determines the maximal angle
    of the picking progress based on how distant are we from
    the solution.
   */
  private getMaxAllowedProgressBasedOnProximity(selectedChamber: number) {
    // calculate distance between selected chamber and correct chamber
    if (this.isWithinTolerance(selectedChamber) === false) {
      return 0;
    }

    const distanceFromCorrectChamber = Math.abs(
      this.correctChamber - selectedChamber
    );
    // TODO: come up maybe with a function
    const maxAllowedProgress = 100 - distanceFromCorrectChamber * 35;
    // 100 / tolerance * 1.25
    return maxAllowedProgress;
  }

  // user stopped picking, revert lock position if necessary
  revertLock() {
    if (this.isSolved) {
      return;
    }
    this.pickingProgress.value = Math.max(this.pickingProgress.value - 5, 0);
    this.maxAllowedProgress.value = 0;
  }

  getPickingProgress() {
    return this.pickingProgress.value;
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
  isWithinTolerance(selection: number) {
    const distanceFromCorrectChamber = Math.abs(
      this.correctChamber - selection
    );
    return distanceFromCorrectChamber <= this.tolerance;
  }

  private generateChambersCount(difficulty: Difficulties) {
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

  private selectRandomChamber(chambersCount: number) {
    return Math.trunc(Math.random() * chambersCount);
  }

  private loadHtmlElement(elementId: string): HTMLElement {
    const hpElement = document.getElementById(elementId);
    if (hpElement === null) {
      throw new Error(
        `Unable to locate element with ID '${elementId}' in the HTML`
      );
    }
    return hpElement;
  }
}
