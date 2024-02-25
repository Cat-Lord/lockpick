window.onload = function () {
  const canvas = document.getElementById('canvas');
  if (canvas === null) {
    throw new Error('Canvas not found.');
  }

  const difficulty = Difficulty.easy;
  // TODO: make use of dynamic configuration
  const config = new Config(difficulty);
  const engine = new LockEngine(difficulty);
  const pickEngine = new LockPickEngine(difficulty);

  const lock = new Lock(engine, pickEngine, canvas.getContext('2d'));
};
