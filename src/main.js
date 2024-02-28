window.onload = function () {
  const canvas = document.getElementById('canvas');
  if (canvas === null) {
    throw new Error('Canvas not found.');
  }
  // TODO: make use of dynamic configuration
  const config = new Config(Difficulty.easy, canvas);
  const lock = new Lock(config, canvas.getContext('2d'));

  const run = () => {
    lock.draw();
    requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
};
