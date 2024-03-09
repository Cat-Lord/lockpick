import { Config } from '../Config';
import { LockEngine } from '../engine/LockEngine';
import { Cylinder } from './Cylinder';
import { LockPick } from './LockPick';

/**
 * Represents the whole lock with cylinder and lock pick.
 */
export class Lock {
  private canvas: HTMLCanvasElement;
  private lockEngine: LockEngine;
  private cylinder: Cylinder;
  private lockPick: LockPick;
  private allowedKeys: [string];
  private lockPickingActionId: NodeJS.Timeout | undefined;
  private lockRevertActionId: NodeJS.Timeout | undefined;

  constructor(
    private readonly config: Config,
    private readonly context: CanvasRenderingContext2D
  ) {
    this.canvas = config.canvas;
    this.lockEngine = new LockEngine(config.difficulty);
    this.cylinder = new Cylinder(context);
    this.lockPick = new LockPick(config, context);
    // TODO: think about possible 'a'/'d' usage, but will have to
    //       introduce some mechanism that would prevent doubling
    //       of action (e.g. pressing 'a' and then 'd' at the same time)
    this.allowedKeys = ['e'];
    this.lockPickingActionId = undefined;
    this.lockRevertActionId = undefined;

    document.onkeydown = (ev) => this.startLockPicking(ev.key);
    document.onkeyup = (ev) => this.stopLockPicking(ev.key);
  }

  startLockPicking(key: string) {
    if (!this.lockPickingActionId && this.isKeyAllowed(key)) {
      this.clearRevertTimeout();
      this.lockPickingActionId = this.reanimate(this.pickTheLock);
    }
  }

  stopLockPicking(key: string) {
    if (!this.lockRevertActionId && this.isKeyAllowed(key)) {
      this.clearPickingTimeout();
      this.lockRevertActionId = this.reanimate(this.revertLock);
    }
  }

  pickTheLock() {
    this.lockEngine.pickLock();
    this.cylinder.calculateCylinderRotation(
      this.lockEngine.getPickingProgress()
    );

    this.lockPickingActionId = this.reanimate(this.pickTheLock.bind(this));
  }

  revertLock() {
    this.lockEngine.revertLock();
    this.cylinder.calculateCylinderRotation(
      this.lockEngine.getPickingProgress()
    );
    if (this.lockEngine.getPickingProgress() > 0) {
      this.lockRevertActionId = this.reanimate(this.revertLock.bind(this));
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.cylinder.draw();
    this.lockPick.draw();
    this.context.restore();
  }

  reanimate(callback: () => any): NodeJS.Timeout {
    return setTimeout(callback.bind(this), 100);
  }

  clearPickingTimeout() {
    clearTimeout(this.lockPickingActionId);
    this.lockPickingActionId = undefined;
  }

  clearRevertTimeout() {
    clearTimeout(this.lockRevertActionId);
    this.lockRevertActionId = undefined;
  }

  isKeyAllowed(key: string) {
    return this.allowedKeys.includes(key);
  }
}
