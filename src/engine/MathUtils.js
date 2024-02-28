function toRadians(angle) {
  return (angle * Math.PI) / 180;
}

function lerp(from, to, progress) {
  return from * progress + to * (1 - progress);
}
