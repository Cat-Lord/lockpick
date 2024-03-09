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
  private readonly image: HTMLImageElement;
  private readonly scaledImageW: number;
  private readonly scaledImageH: number;
  private rotationRadians: number;

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
    const imageElement = document.getElementById(
      'lockpick-img'
    ) as HTMLImageElement | null;
    if (imageElement === null) {
      throw new Error('Unable to find lock image');
    }
    this.rotationRadians = 0;
    this.image = imageElement;
    this.scaledImageW = this.image.width / 2;
    this.scaledImageH = this.image.height / 2;
    // call after assigning lockpick element :)
    this.engine = new LockPickEngine(
      config.difficulty,
      this.updateLockPickHealth.bind(this)
    );

    document.onmousemove = (ev) => this.rotateLockPick(ev);
  }

  updateLockPickHealth(health: number) {
    this.lockPickHpElement.innerHTML = '' + health;
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

  rotateLockPick(ev: MouseEvent) {
    let mouseX = ev.clientX - this.config.canvas.offsetLeft;
    mouseX = constrain(mouseX, 0, this.config.canvas.clientWidth);
    const normalizedMouseX = mouseX / this.config.canvas.clientWidth;

    const rotationAngle = lerp(
      180 + this.config.lockpickMovementSensitivity,
      0 - this.config.lockpickMovementSensitivity,
      normalizedMouseX
    );
    this.rotationRadians = constrain(toRadians(rotationAngle), 0, Math.PI);
  }

  draw() {
    this.context.save();
    this.context.rotate(this.rotationRadians);
    this.context.translate(-this.scaledImageW, -this.scaledImageH / 2);
    this.context.drawImage(
      this.image,
      0,
      0,
      this.scaledImageW,
      this.scaledImageH
    );
    this.context.restore();
  }
}
