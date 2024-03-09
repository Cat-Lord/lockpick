export function toRadians(angle: number) {
  return (angle * Math.PI) / 180;
}

export function lerp(from: number, to: number, progress: number) {
  return from * progress + to * (1 - progress);
}

/**
 * Returns number in case it falls into the from-to
 * interval. When it's lower than the "from" value,
 * returns from, otherwise returns "to".
 * @param number Number to check against the from-to interval.
 * @param from Minimal possible value.
 * @param to Maximal possible value.
 */
export function constrain(number: number, from: number, to: number) {
  const num = Math.max(number, from);
  return Math.min(to, num);
}
