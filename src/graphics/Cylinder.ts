import { lerp, toRadians } from '../engine/MathUtils';

export class Cylinder {
  private readonly image: HTMLImageElement;
  private readonly cylinderRadius: number;
  private readonly startAngle: number;
  private readonly endAngle: number;
  private rotationInRadians: number;

  constructor(private readonly context: CanvasRenderingContext2D) {
    const imageElement = document.getElementById(
      'keyhole-img'
    ) as HTMLImageElement | null;
    if (imageElement === null) {
      throw new Error('Unable to find lock image');
    }
    this.image = imageElement;
    this.cylinderRadius = 250;
    this.rotationInRadians = 0;
    this.startAngle = 0;
    this.endAngle = 90;
  }

  /**
   * Calculate the amount of rotation needed for a specific
   * picking progress. This will then be used when drawing
   * the cylinder.
   * This can be used either for opening or reverting the lock.
   */
  setRotationByPickingProgress(pickingProgress: number) {
    const progress = pickingProgress / 100;
    this.rotationInRadians = toRadians(
      lerp(this.endAngle, this.startAngle, progress)
    );
  }

  draw() {
    this.context.save();
    this.context.rotate(this.rotationInRadians);
    this.context.drawImage(
      this.image,
      -this.cylinderRadius / 2,
      -this.cylinderRadius / 2,
      this.cylinderRadius,
      this.cylinderRadius
    );
    this.context.restore();
  }
}
