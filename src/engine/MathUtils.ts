export function toRadians(angle: number) {
  return (angle * Math.PI) / 180;
}

export function lerp(from: number, to: number, progress: number) {
  return from * progress + to * (1 - progress);
}
