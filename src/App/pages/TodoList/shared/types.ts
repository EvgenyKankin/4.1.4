/*export enum Prioroty {
  LOW = 'Низкий', // Низкий
  MEDIUM = 'Средний', // Средний
  HIGH = 'Высокий', // Высокий
}

export enum Status {
  TODO = 'Сделать', // Сделать
  PROGRESS = 'В_прогрессе', // В прогрессе
  DONE = 'Сделано', // Сделано
}
*/
export const Prioroty = {
  LOW: 'Низкий',
  MEDIUM: 'Средний',
  HIGH: 'Высокий',
} as const;


export type Prioroty = typeof Prioroty[keyof typeof Prioroty];

export const Status = {
  TODO: 'Сделать',
  PROGRESS: 'В_прогрессе',
  DONE: 'Сделано',
} as const;


export type Status = typeof Status[keyof typeof Status];