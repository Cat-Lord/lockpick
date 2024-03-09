import { Difficulties } from './constants/Difficulty';

export class Config {
  public readonly lockpickMovementSensitivity = 100;
  constructor(
    public readonly difficulty: Difficulties,
    public readonly canvas: HTMLCanvasElement
  ) {}
}
