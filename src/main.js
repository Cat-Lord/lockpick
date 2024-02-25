window.onload = function () {
  const canvas = document.getElementById('canvas');
  if (canvas === null) {
    throw new Error('Canvas not found.');
  }

  const difficulty = Difficulty.easy;
  // TODO: make use of dynamic configuration
  const config = new Config(difficulty);
  const lock = new Lock(difficulty, canvas.getContext('2d'));
  const lockpick = new LockPick(difficulty, canvas.getContext('2d'));
};
