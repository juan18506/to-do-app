import type { Todo } from '../types';

export const updateLocalStorage = (todos: Array<Todo>): void => {
  window.localStorage.setItem('todos', JSON.stringify(todos));
};

export const getLocalStorageTodos = (): Array<Todo> => {
  const localStorageTodos: string | null = window.localStorage.getItem('todos');
  const todos: Array<Todo> = localStorageTodos ? JSON.parse(localStorageTodos) : [];

  return todos;
};