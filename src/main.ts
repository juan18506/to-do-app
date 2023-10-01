'use strict';

import { getCurrentDate, showCurrentDate } from './helpers/dateHelpers';
import { getLocalStorageTodos } from './helpers/localStorageHelpers';
import { addToList, changeModalDisplay, resetInputs, updateList } from './helpers/todosHelpers';
import { Todo, TodoStatus } from './types';

const currentDate = getCurrentDate();
showCurrentDate(currentDate);

const todos: Array<Todo> = getLocalStorageTodos();
todos.forEach(todo => addToList(todo, true));

document.addEventListener('submit', (event: SubmitEvent) => { 
  if (event.target instanceof HTMLFormElement) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target));

    const inputTopic: string = data.topic.toString();
    const inputTask : string = data.task.toString();
    if (!inputTopic || !inputTask) return;

    const todo: Todo = {
      topic : inputTopic,
      task  : inputTask,
      status: TodoStatus.Uncompleted
    };

    addToList(todo, false);
    if (event.target.lastElementChild instanceof HTMLButtonElement) resetInputs(event.target.lastElementChild);
  };
})

document.addEventListener('click', (event: MouseEvent) => {
  if (event.target instanceof HTMLInputElement) {
    const li: HTMLElement | null = event.target.parentElement;
    
    if (li instanceof HTMLLIElement) {
      const todoStatus = event.target.checked ? TodoStatus.Uncompleted : TodoStatus.Completed;
      updateList(li, todoStatus);
    };
  };

  if (event.target instanceof HTMLButtonElement) {
    changeModalDisplay();
    if (event.target.matches('closebtn')) resetInputs(event.target);
  };
});
