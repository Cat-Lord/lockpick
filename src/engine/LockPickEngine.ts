import { Difficulties } from '../constants/Difficulty';
import { createProxy } from './createNumberProxy';

/**
 * Engine of a lock pick. A lock pick has health and
 * base damage factor. When a lock is pushed against
 * an incorrect lock chamber, it experiences damage
 * equal to the configured damage factor (based on
 * difficulty). The damage is subtracted from the
 * health of the lock pick.
 * If the lock pick health reaches 0, the lock pick
 * breaks and it isn't usable anymore.
 */
export class LockPickEngine {
  private readonly pickHealth: any; // TODO: minor requirement, make the type prettier
  private readonly damageFactor: number;

  constructor(
    difficulty: Difficulties,
    healthChangeListener: (health: number) => void
  ) {
    // when the pickHealth.value changes, the listener is called
    this.pickHealth = createProxy(100, healthChangeListener);
    // TODO: based on difficulty create various types of lock durabilities
    this.damageFactor = 25;
  }

  isLockPickBroken() {
    return this.pickHealth.value <= 0;
  }

  damageLockPick() {
    if (this.pickHealth.value > 0) {
      this.pickHealth.value -= this.damageFactor;
    }
    return this.pickHealth.value;
  }
}
