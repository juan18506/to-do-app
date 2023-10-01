import { type Todo, TodoStatus } from '../types';
import { getLocalStorageTodos, updateLocalStorage } from './localStorageHelpers';

const todos: Array<Todo> = getLocalStorageTodos();
let uncompletedListLenght: number = 0;
let completedListLenght  : number = 0;

export const showToDoStatus = (): void => {
  const $listStatus = document.getElementById('status');
  if ($listStatus === null) return;
  $listStatus.innerHTML = `${uncompletedListLenght} uncompleted, ${completedListLenght} completed`;
};

export const addToList = (todo: Todo, local?: boolean): void => {
  const $uncompletedList = document.getElementById('uncompleted__list');
  const $completedList = document.getElementById('completed__list');
  const li = document.createElement('li');
  li.classList.add('main__li', 'li');

  if (todo.status === TodoStatus.Uncompleted) {
    li.innerHTML = `
      <input class="li__input" type="checkbox">
      <div class="li__div">
        <h3 class="li__h3">${todo.task}</h3>
        <span class="li__span">${todo.topic}</span>
      </div>
    `;

    if ($uncompletedList === null) return;
    $uncompletedList.appendChild(li);
    uncompletedListLenght++;
  };

  if (todo.status === TodoStatus.Completed) {
    li.innerHTML = `
      <input class="li__input" type="checkbox" ${local ? 'checked' : ''}>
      <div class="li__div">
        <h3 class="li__h3">${todo.task}</h3>
        <span class="li__span">${todo.topic}</span>
      </div>
    `;

    if ($completedList === null) return;
    $completedList.appendChild(li);
    completedListLenght++;
  };

  showToDoStatus();
  if (!local) {
    todos.push(todo);
    updateLocalStorage(todos);
  };
};

export const updateList = (li: HTMLLIElement, status: TodoStatus): void => {
  const $uncompletedList = document.getElementById('uncompleted__list');
  const $completedList = document.getElementById('completed__list');
  const h3 = li.querySelector('h3');
  const span = li.querySelector('span');

  if (h3 === null || span === null) return;

  for (const todo of todos) {
    if (todo.task !== h3.innerText || todo.topic !== span.innerText) continue;

    todo.status = todo.status === TodoStatus.Completed ? TodoStatus.Uncompleted : TodoStatus.Completed;
    break;
  };

  if (status === TodoStatus.Uncompleted) {
    if ($completedList === null) return;
    $completedList.appendChild(li);
    uncompletedListLenght--;
    completedListLenght++;
  };

  if (status === TodoStatus.Completed) {
    if ($uncompletedList === null) return;
    $uncompletedList.appendChild(li);
    uncompletedListLenght++;
    completedListLenght--;
  };

  showToDoStatus();
  updateLocalStorage(todos);
};

export const resetInputs = (button: HTMLButtonElement): void => {
  const formElements = button.classList.contains('closebtn') ?
    button.previousElementSibling!.children :
    button.parentElement!.children;

  for (const formElement of formElements) {
    if (!(formElement instanceof HTMLTextAreaElement || formElement instanceof HTMLInputElement)) continue;

    formElement.value = formElement.defaultValue;
  };
};

export const changeModalDisplay = (): void => {
  const $modal = document.getElementById('modal');
  if ($modal === null) return;
  $modal.classList.toggle('modal--active');
};