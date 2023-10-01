'use strict';

import  { Months, Todo, TodoStatus } from './types';

document.addEventListener('DOMContentLoaded', () => {
  const $header: HTMLElement | null      = document.getElementById('header');
  const $date: Element | null            = $header ? $header.firstElementChild : null;
  const $listStatus: Element | null      = $header ? $header.lastElementChild : null;
  const $main: HTMLElement | null        = document.getElementById('main');
  const $uncompletedList: Element | null = $main ? $main.firstElementChild : null;
  const $completedList: Element | null   = $uncompletedList ? $uncompletedList.nextElementSibling : null;
  const $openButton: Element | null      = $main ? $main.lastElementChild : null;
  const $modal: HTMLElement | null       = document.getElementById('modal');
  const $form: Element | null            = $modal ? $modal.firstElementChild : null;
  const $closeButton: Element | null     = $modal ? $modal.lastElementChild  : null;
  let uncompletedListLenght: number      = 0;
  let completedListLenght: number        = 0;

  const { currentDay, currentMonth, currentYear } = getCurrentDateData();
  showCurrentDate(currentDay, currentMonth, currentYear);

  const localStorageTodos = window.localStorage.getItem('todos');
  if (localStorageTodos) {
    const todos: Array<Todo> = JSON.parse(localStorageTodos);
    todos.forEach(todo => addToList(todo, true));
  } else {
    showToDoStatus();
  };

  if ($form !== null && $form instanceof HTMLFormElement) {
    $form.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault()
  
      const data = Object.fromEntries(
        new FormData($form)
      )
  
      const inputTask = data.task.toString()
      const inputtopic = data.topic.toString()
      if (!inputTask || !inputtopic) return
  
      const todo: Todo = {
        task: inputTask,
        topic: inputtopic,
        status: TodoStatus.Uncompleted
      }
  
      // addToList(todo)
      if ($form.lastElementChild instanceof HTMLButtonElement) resetInputs($form.lastElementChild);
      changeModalDisplay()
    })
  };

  $uncompletedList.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLInputElement) || !e.target.checked) return

    const li = e.target.parentElement as HTMLLIElement
    updateList(li, TodoStatus.Uncompleted)
  })

  $completedList.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLInputElement) || e.target.checked) return

    const li = e.target.parentElement as HTMLLIElement
    updateList(li, TodoStatus.Completed)
  })

  $openButton.addEventListener('click', (e) => {
    changeModalDisplay()
  })

  $closeButton.addEventListener('click', (e) => {
    resetInputs($closeButton)
    changeModalDisplay()
  })

  function getCurrentDateData() {
    const currentDate = new Date(Date.now())
    const currentMonth = Months[currentDate.getMonth()]
    const currentDay = currentDate.getDate()
    const currentYear = currentDate.getFullYear()

    return { currentDay, currentMonth, currentYear }
  }

  function showCurrentDate(day: number, month: string, year: number) {
    $date.innerHTML = `${month} ${day}, ${year}`
  }

  function showToDoStatus() {
    $listStatus.innerHTML = `${uncompletedListLenght} uncompleted, ${completedListLenght} completed`
  }

  function addToList(todo: Todo, local?: boolean) {
    const li = document.createElement('li')
    li.classList.add('main__li', 'li')

    if (todo.status === TodoStatus.Uncompleted) {
      li.innerHTML = `
        <input class="li__input" type="checkbox">
        <div class="li__div">
          <h3 class="li__h3">${todo.task}</h3>
          <span class="li__span">${todo.topic}</span>
        </div>
      `

      $uncompletedList.appendChild(li)
      uncompletedListLenght++
    }

    if (todo.status === TodoStatus.Completed) {
      li.innerHTML = `
        <input class="li__input" type="checkbox" ${local ? 'checked' : ''}>
        <div class="li__div">
          <h3 class="li__h3">${todo.task}</h3>
          <span class="li__span">${todo.topic}</span>
        </div>
      `

      $completedList.appendChild(li)
      completedListLenght++
    }

    showToDoStatus()
    if (!local) {
      todos.push(todo)
      updateLocalStorage()
    }
  }

  function updateList(li: HTMLLIElement, status: TodoStatus) {
    const h3 = li.querySelector('h3') as HTMLHeadingElement
    const span = li.querySelector('span') as HTMLSpanElement

    for (const todo of todos) {
      if (todo.task !== h3.innerText || todo.topic !== span.innerText) continue

      todo.status = todo.status === TodoStatus.Completed ? TodoStatus.Uncompleted : TodoStatus.Completed
      break
    }

    if (status === TodoStatus.Uncompleted) {
      $completedList.appendChild(li)
      uncompletedListLenght--
      completedListLenght++
    }

    if (status === TodoStatus.Completed) {
      $uncompletedList.appendChild(li)
      uncompletedListLenght++
      completedListLenght--
    }

    showToDoStatus()
    updateLocalStorage()
  }

  function updateLocalStorage() {
    window.localStorage.setItem('todos', JSON.stringify(todos))
  }

  function resetInputs(button: HTMLButtonElement) {
    const formElements = button.classList.contains('closebtn') ?
      button.previousElementSibling!.children :
      button.parentElement!.children

    for (const formElement of formElements) {
      if (!(formElement instanceof HTMLTextAreaElement || formElement instanceof HTMLInputElement)) continue

      formElement.value = formElement.defaultValue
    }
  }

  function changeModalDisplay() {
    $modal.classList.toggle('$modal--active')
  }
});
