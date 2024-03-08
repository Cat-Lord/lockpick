export const Difficulty = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  veryHard: 'Very Hard',
} as const;

export type Difficulties = (typeof Difficulty)[keyof typeof Difficulty];
