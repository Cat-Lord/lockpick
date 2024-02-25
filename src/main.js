window.onload = function () {
  const canvas = document.getElementById('canvas');
  if (canvas === null) {
    throw new Error('Canvas not found.');
  }

  const config = new Config(Difficulty.easy);
  const engine = new LockEngine(config);
  const lock = new Lock(engine, canvas.getContext('2d'), config);
};
