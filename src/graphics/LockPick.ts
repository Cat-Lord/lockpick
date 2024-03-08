import { Difficulties } from '../constants/Difficulty';
import { LockPickEngine } from '../engine/LockPickEngine';
import { lerp, toRadians } from '../engine/MathUtils';
import { Position } from './Position';

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
  private rotationRadians: number;

  constructor(
    private readonly centerPosition: Position,
    difficulty: Difficulties,
    private readonly context: CanvasRenderingContext2D
  ) {
    this.rotationRadians = 0;
    const hpElement = document.getElementById('lockpick-hp');
    if (hpElement === null) {
      throw new Error(
        'Cannot track lockpick hp, unable to find lockpick HP element'
      );
    }
    this.lockPickHpElement = hpElement;
    // call after assigning lockpick element :)
    this.engine = new LockPickEngine(
      difficulty,
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
    const canvas = document.getElementById('canvas');
    if (canvas === null) {
      throw new Error("Canvas wasn't found!");
    }
    let mouseX = ev.clientX - canvas.offsetLeft;

    const minX = canvas.offsetLeft;
    const maxX = minX + canvas.clientWidth;
    mouseX = Math.max(mouseX, minX);
    mouseX = Math.min(mouseX, maxX);
    const normalizedMouseX = mouseX / canvas.clientWidth;
    const rotationAngle = lerp(180, 0, normalizedMouseX);
    this.rotationRadians = toRadians(rotationAngle);
    console.log(`rotate by ${rotationAngle} (${this.rotationRadians} radians)`);
  }

  draw() {
    this.context.save();
    this.context.translate(0, -25);

    // TODO: rotation center is off, seems like it's the point [0,0]
    this.context.rotate(-Math.PI + this.rotationRadians);

    this.context.strokeStyle = 'blue';
    this.context.lineWidth = 5;
    this.context.beginPath();
    this.context.lineTo(this.centerPosition.x, this.centerPosition.y);
    this.context.lineTo(this.centerPosition.x, 5 + this.centerPosition.y);
    this.context.lineTo(65 + this.centerPosition.x, 10 + this.centerPosition.y);
    this.context.lineTo(
      75 + this.centerPosition.x,
      125 + this.centerPosition.y
    );
    this.context.lineTo(
      55 + this.centerPosition.x,
      350 + this.centerPosition.y
    );
    this.context.lineTo(
      95 + this.centerPosition.x,
      350 + this.centerPosition.y
    );
    this.context.lineTo(
      95 + this.centerPosition.x,
      125 + this.centerPosition.y
    );
    this.context.lineTo(75 + this.centerPosition.x, this.centerPosition.y);
    this.context.closePath();
    this.context.stroke();
    this.context.restore();
  }
}
