export const enum TodoStatus {
  Uncompleted,
  Completed
}

export type Todo = {
  task: string,
  topic: string,
  status: TodoStatus
}

export enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}