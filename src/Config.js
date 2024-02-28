class Config {
  constructor(difficulty, canvas) {
    this._difficulty = difficulty;
    this._canvas = canvas;
  }

  set difficulty(difficulty) {
    this._difficulty = difficulty;
  }

  get difficulty() {
    return this._difficulty;
  }

  set canvas(canvas) {
    this._canvas = canvas;
  }

  get canvas() {
    return this._canvas;
  }
}
