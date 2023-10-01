'use strict';

import { getCurrentDateData, showCurrentDate } from './helpers/dateHelpers';
import { getLocalStorageTodos } from './helpers/localStorageHelpers';
import { addToList, changeModalDisplay, resetInputs, updateList } from './helpers/todosHelpers';
import  { Todo, TodoStatus } from './types';

document.addEventListener('DOMContentLoaded', () => {
  const $main: HTMLElement | null        = document.getElementById('main');
  const $uncompletedList: Element | null = document.getElementById('uncompleted__list');
  const $completedList: Element | null   = document.getElementById('completed__list');
  const $openButton: Element | null      = $main ? $main.lastElementChild : null;
  const $modal: HTMLElement | null       = document.getElementById('modal');
  const $form: Element | null            = $modal ? $modal.firstElementChild : null;
  const $closeButton: Element | null     = $modal ? $modal.lastElementChild  : null;

  const { currentDay, currentMonth, currentYear } = getCurrentDateData();
  showCurrentDate(currentDay, currentMonth, currentYear);

  const todos: Array<Todo> = getLocalStorageTodos();
  todos.forEach(todo => addToList(todo, true));

  if ($form !== null && $form instanceof HTMLFormElement) {
    $form.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();

      const data = Object.fromEntries(new FormData($form));

      const inputTask = data.task.toString();
      const inputTopic = data.topic.toString();
      if (!inputTask || !inputTopic) return;
  
      const todo: Todo = {
        task: inputTask,
        topic: inputTopic,
        status: TodoStatus.Uncompleted
      };
  
      addToList(todo);
      if ($form.lastElementChild instanceof HTMLButtonElement) resetInputs($form.lastElementChild);
      changeModalDisplay();
    });
  };

  if ($uncompletedList !== null && $uncompletedList instanceof HTMLUListElement) {
    $uncompletedList.addEventListener('click', (event: MouseEvent) => {
      
      if (!(event.target instanceof HTMLInputElement) || !event.target.checked) return;
      
      const li = event.target.parentElement; 
      
      if (li instanceof HTMLLIElement) updateList(li, TodoStatus.Uncompleted);
    });
  };

  if ($completedList !== null && $completedList instanceof HTMLUListElement) {
    $completedList.addEventListener('click', (event: MouseEvent) => {
      if (!(event.target instanceof HTMLInputElement) || event.target.checked) return;
  
      const li = event.target.parentElement;
      if (li instanceof HTMLLIElement) updateList(li, TodoStatus.Completed);
    });
  };

  if ($openButton !== null && $openButton instanceof HTMLButtonElement) {
    $openButton.addEventListener('click', () => {
      changeModalDisplay();
    });
  }

  if ($closeButton !== null && $closeButton instanceof HTMLButtonElement) {
    $closeButton.addEventListener('click', () => {
      resetInputs($closeButton);
      changeModalDisplay();
    });
  };
});
