export const Prioroty = {
  LOW: 'Низкий',
  MEDIUM: 'Средний',
  HIGH: 'Высокий',
} as const;


export type Prioroty = typeof Prioroty[keyof typeof Prioroty];

export const Status = {
  TODO: 'Сделать',
  PROGRESS: 'В_процессе',
  DONE: 'Сделано',
} as const;


export type Status = typeof Status[keyof typeof Status];