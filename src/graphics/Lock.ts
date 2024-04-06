import { Config } from '../Config';
import { LockEngine } from '../engine/LockEngine';
import { constrain } from '../engine/MathUtils';
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
    document.onmousemove = (ev) => this.rotateLockPick(ev);
  }

  startLockPicking(key: string) {
    if (
      !this.lockPickingActionId &&
      this.isKeyAllowed(key) &&
      this.lockEngine.isSolved === false
    ) {
      this.clearRevertTimeout();
      this.lockPickingActionId = this.reanimate(this.pickTheLock);
    }
  }

  stopLockPicking(key: string) {
    if (
      !this.lockRevertActionId &&
      this.isKeyAllowed(key) &&
      this.lockEngine.isSolved === false
    ) {
      this.clearPickingTimeout();
      this.lockRevertActionId = this.reanimate(this.revertLock);
    }
  }

  rotateLockPick(ev: MouseEvent) {
    if (this.lockEngine.isSolved || this.lockPick.isBroken()) {
      return;
    }
    const mouseX = ev.clientX - this.canvas.offsetLeft;
    const canvasMouseX = constrain(mouseX, 0, this.config.canvas.clientWidth);
    this.lockPick.rotateLockPick(canvasMouseX);
  }

  pickTheLock() {
    if (this.lockEngine.isSolved || this.lockPick.isBroken()) {
      this.clearPickingTimeout();
      return;
    }

    const rotationRadians = this.lockPick.getRotationRadians();
    const roundedRotationRadians = Number(rotationRadians.toFixed(2));
    const selectedChamber = this.getCurrentlyPickedChamber(
      roundedRotationRadians
    );

    const pickingProgress = this.lockEngine.pickLock(selectedChamber);
    if (this.lockEngine.isStuck) {
      this.lockPick.shake();
    }
    this.cylinder.setRotationByPickingProgress(pickingProgress);
    this.lockPickingActionId = this.reanimate(this.pickTheLock);
  }

  revertLock() {
    this.lockEngine.revertLock();
    this.lockPick.stopShaking();
    this.cylinder.setRotationByPickingProgress(
      this.lockEngine.getPickingProgress()
    );
    if (this.lockEngine.getPickingProgress() > 0) {
      this.lockRevertActionId = this.reanimate(this.revertLock);
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

  // Split the interval [0, Math.PI] into equal parts and determine
  // to which part belongs the current picking angle
  private getCurrentlyPickedChamber(rotationRadians: number) {
    const singleChamberIncrement = Math.PI / this.lockEngine.getChambersCount();
    return Math.floor(rotationRadians / singleChamberIncrement) + 1;
  }

  private reanimate(callback: () => any): NodeJS.Timeout {
    return setTimeout(callback.bind(this), 50);
  }

  private clearPickingTimeout() {
    clearTimeout(this.lockPickingActionId);
    this.lockPickingActionId = undefined;
  }

  private clearRevertTimeout() {
    clearTimeout(this.lockRevertActionId);
    this.lockRevertActionId = undefined;
  }

  private isKeyAllowed(key: string) {
    return this.allowedKeys.includes(key);
  }
}
