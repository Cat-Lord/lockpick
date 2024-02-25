class Config {
  constructor(difficulty) {
    this._difficulty = difficulty;
  }

  set difficulty(difficulty) {
    this._difficulty = difficulty;
  }

  get difficulty() {
    return this._difficulty;
  }
}
