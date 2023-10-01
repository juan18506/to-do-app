import { type Todo, TodoStatus } from '../types';
import { getLocalStorageTodos, updateLocalStorage } from './localStorageHelpers';

const $uncompletedList: HTMLElement | null = document.getElementById('uncompleted__list');
const $completedList  : HTMLElement | null = document.getElementById('completed__list');
const $formModal      : HTMLElement | null = document.getElementById('modal');
const $listStatus     : HTMLElement | null = document.getElementById('status');

const todos: Array<Todo> = getLocalStorageTodos();
let uncompletedListLength: number = 0;
let completedListLength  : number = 0;

export const showToDoStatus = (): void => {
  if ($listStatus !== null) {
    $listStatus.innerHTML = `${uncompletedListLength} uncompleted, ${completedListLength} completed`;
  };
};

export const addToList = (todo: Todo, isLocal: boolean): void => {
  const newListItem: HTMLLIElement = document.createElement('li');
  newListItem.classList.add('main__li', 'li');

  if (todo.status === TodoStatus.Uncompleted) {
    newListItem.innerHTML = `
      <input class="li__input" title="Toggle To-Do status" type="checkbox">
      <div class="li__div">
        <h3 class="li__h3">${todo.task}</h3>
        <span class="li__span">${todo.topic}</span>
      </div>
    `;

    if ($uncompletedList !== null) {
      $uncompletedList.appendChild(newListItem);
      uncompletedListLength++;
    };
  } else if (todo.status === TodoStatus.Completed) {
    newListItem.innerHTML = `
      <input class="li__input" title="Toggle To-Do status" type="checkbox" ${isLocal ? 'checked' : ''}>
      <div class="li__div">
        <h3 class="li__h3">${todo.task}</h3>
        <span class="li__span">${todo.topic}</span>
      </div>
    `;

    if ($completedList !== null) {
      $completedList.appendChild(newListItem);
      completedListLength++;
    };
  };

  showToDoStatus();
  if (!isLocal) {
    todos.push(todo);
    updateLocalStorage(todos);
  };
};

export const updateList = ($listItem: HTMLLIElement, status: TodoStatus): void => {
  const todoTask : string | null = $listItem.lastElementChild?.firstElementChild?.innerHTML ?? null;
  const todoTopic: string | null = $listItem.lastElementChild?.lastElementChild?.innerHTML  ?? null;

  const updateIndex = todos.findIndex((todo) => todo.task === todoTask && todo.topic === todoTopic);
  if (updateIndex === -1) return;

  todos[updateIndex].status = todos[updateIndex].status === TodoStatus.Completed 
  ? TodoStatus.Uncompleted 
  : TodoStatus.Completed;

  if ($completedList !== null && status === TodoStatus.Uncompleted) {
    $completedList.appendChild($listItem);
    uncompletedListLength--;
    completedListLength++;
  };

  if ($uncompletedList !== null && status === TodoStatus.Completed) {
    $uncompletedList.appendChild($listItem);
    uncompletedListLength++;
    completedListLength--;
  };

  showToDoStatus();
  updateLocalStorage(todos);
};

export const resetInputs = ($button: HTMLButtonElement): void => {
  const formElements = $button.classList.contains('closebtn') 
  ? $button.previousElementSibling!.children 
  : $button.parentElement!.children;

  for (const formElement of formElements) {
    if (formElement instanceof HTMLTextAreaElement || formElement instanceof HTMLInputElement) {
      formElement.value = formElement.defaultValue;
    };
  };
};

export const changeModalDisplay = (): void => {
  if ($formModal !== null) {
    $formModal.classList.toggle('modal--active');
  };
};