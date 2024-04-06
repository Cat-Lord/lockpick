import { Config } from './Config';
import { Difficulty } from './constants/Difficulty';
import { Lock } from './graphics/Lock';

window.onload = function () {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
  if (canvas === null || canvas.getContext('2d') === null) {
    throw new Error('Canvas not found.');
  }

  canvas.focus({
    preventScroll: true,
  });
  // TODO: make use of dynamic configuration
  const config = new Config(Difficulty.easy, canvas);
  const lock = new Lock(config, canvas.getContext('2d')!);

  const run = () => {
    lock.draw();
    requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
};
