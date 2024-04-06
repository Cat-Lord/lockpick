import { Config } from '../Config';
import { LockPickEngine } from '../engine/LockPickEngine';
import { constrain, lerp, toRadians } from '../engine/MathUtils';

/**
 * Simple visual representation of the lock pick. Consists of
 * 2 parts:
 *  - pick: A movable object allowing for lock chamber selection.
 *  - knife: A static object resembling real lock-picking action. Only a visual
 *           entity without an interactive mechanism.
 */
export class LockPick {
  private readonly engine: LockPickEngine;
  private readonly lockPickHpElement: HTMLElement;
  private lockpickImage: HTMLImageElement;
  private readonly healthyLockpickImage: HTMLImageElement;
  private readonly brokenLockpickImage: HTMLImageElement;
  private readonly scaledImageW: number;
  private readonly scaledImageH: number;
  private rotationRadians: number;
  private shakeIncrement: number;
  private shakeAngle: number;

  constructor(
    private readonly config: Config,
    private readonly context: CanvasRenderingContext2D
  ) {
    const hpElement = document.getElementById('lockpick-hp');
    if (hpElement === null) {
      throw new Error(
        'Cannot track lockpick hp, unable to find lockpick HP element'
      );
    }
    this.lockPickHpElement = hpElement;
    this.healthyLockpickImage = this.loadImage('lockpick-img');
    this.brokenLockpickImage = this.loadImage('broken-lockpick-img');
    this.lockpickImage = this.healthyLockpickImage; // changes based on lockpick health
    this.rotationRadians = 0;
    this.shakeIncrement = 0;
    this.shakeAngle = 0;
    this.scaledImageW = this.lockpickImage.width / 2;
    this.scaledImageH = this.lockpickImage.height / 2;
    this.engine = new LockPickEngine(
      config.difficulty,
      this.updateLockPickHealth.bind(this)
    );
  }

  updateLockPickHealth(health: number) {
    this.lockPickHpElement.innerHTML = '' + health;
    if (health === 0) {
      this.lockpickImage = this.brokenLockpickImage;
    }
  }

  turnLockPick() {
    // turn lock pick as the mouse moves around
  }

  /*
    Shake to indicate incorrect selection.
    Todo: Play the sound of the lock shaking
  */
  shake() {
    this.engine.damageLockPick();

    if (this.engine.isLockPickBroken()) {
      this.lockpickImage = this.brokenLockpickImage;
    }

    // TODO: make this prettier
    this.shakeIncrement += 10;
    this.shakeAngle = Math.sin(this.shakeIncrement) / 20;
  }

  /*
    Reset shaking state.
  */
  stopShaking() {
    this.shakeIncrement = 0;
    this.shakeAngle = 0;
  }

  isBroken() {
    return this.engine.isLockPickBroken();
  }

  break() {
    // show lock pick breaking
    // play the sound of the lock breaking
  }

  rotateLockPick(mouseX: number) {
    const normalizedMouseX = mouseX / this.config.canvas.clientWidth;

    const rotationAngle = lerp(
      180 + this.config.lockpickMovementSensitivity,
      0 - this.config.lockpickMovementSensitivity,
      normalizedMouseX
    );
    this.rotationRadians = constrain(toRadians(rotationAngle), 0, Math.PI);
  }

  getRotationRadians() {
    return this.rotationRadians;
  }

  draw() {
    this.context.save();
    this.context.rotate(this.rotationRadians + this.shakeAngle);

    this.context.translate(-this.scaledImageW, -this.scaledImageH / 2);
    this.context.drawImage(
      this.lockpickImage,
      0,
      0,
      this.scaledImageW,
      this.scaledImageH
    );
    this.context.restore();
  }

  private loadImage(imageName: string) {
    const imageElement = document.getElementById(
      imageName
    ) as HTMLImageElement | null;
    if (imageElement === null) {
      throw new Error('Unable to find lock image');
    }
    return imageElement;
  }
}
