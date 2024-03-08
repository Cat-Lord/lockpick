import { Difficulties } from './constants/Difficulty';

export class Config {
  constructor(
    public readonly difficulty: Difficulties,
    public readonly canvas: HTMLCanvasElement
  ) {}
}
