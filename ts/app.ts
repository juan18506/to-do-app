'use strict'

enum TodoStatus {
  Incomplete,
  Completed
}

type Todo = {
  task: string,
  topic: string,
  status: TodoStatus
}

const incompletedList = document.getElementById('incomplete__list') as HTMLUListElement
const completedList = document.getElementById('completed__list') as HTMLUListElement
const listStatus = document.getElementById('status') as HTMLParagraphElement
const form = document.getElementById('form') as HTMLFormElement
const openButton = document.getElementById('openButton') as HTMLButtonElement
const modal = document.getElementById('modal') as HTMLDivElement
const sendButton = modal.querySelector('#submitButton') as HTMLButtonElement
const closeButton = modal.querySelector('#closeButton') as HTMLButtonElement
let incompleteListLenght = 0
let completedListLenght = 0

const { currentDay, currentMonth, currentYear } = getCurrentDateData()
showCurrentDate(currentDay, currentMonth, currentYear)

const localTodos = window.localStorage.getItem('todos')
const todos: Array<Todo> = localTodos ? JSON.parse(localTodos) : []
if (localTodos) {
  todos.forEach(todo => addToList(todo, true))
} else {
  showToDoStatus()
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const data = Object.fromEntries(
    new FormData(form)
  )

  const inputTask = data.task.toString()
  const inputtopic = data.topic.toString()
  if (!inputTask || !inputtopic) return

  const todo: Todo = {
    task: inputTask,
    topic: inputtopic,
    status: TodoStatus.Incomplete
  }

  addToList(todo)
  resetInputs(sendButton)
  changeModalDisplay()
})

incompletedList.addEventListener('click', (e) => {
  if (!(e.target instanceof HTMLInputElement) || !e.target.checked) return

  const li = e.target.parentElement as HTMLLIElement
  updateList(li, TodoStatus.Incomplete)
})

completedList.addEventListener('click', (e) => {
  if (!(e.target instanceof HTMLInputElement) || e.target.checked) return

  const li = e.target.parentElement as HTMLLIElement
  updateList(li, TodoStatus.Completed)
})

openButton.addEventListener('click', (e) => {
  changeModalDisplay()
})

closeButton.addEventListener('click', (e) => {
  resetInputs(closeButton)
  changeModalDisplay()
})

function getCurrentDateData() {
  enum Months {
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

  const currentDate = new Date(Date.now())
  const currentMonth = Months[currentDate.getMonth()]
  const currentDay = currentDate.getDate()
  const currentYear = currentDate.getFullYear()

  return { currentDay, currentMonth, currentYear }
}

function showCurrentDate(day: number, month: string, year: number) {
  const date = document.getElementById('date') as HTMLParagraphElement
  date.innerHTML = `${month} ${day}, ${year}`
}

function showToDoStatus() {
  listStatus.innerHTML = `${incompleteListLenght} incomplete, ${completedListLenght} completed`
}

function addToList(todo: Todo, local?: boolean) {
  const li = document.createElement('li')
  li.classList.add('main__li', 'li')

  if (todo.status === TodoStatus.Incomplete) {
    li.innerHTML = `
      <input class="li__input" type="checkbox">
      <div class="li__div">
        <h3 class="li__h3">${todo.task}</h3>
        <span class="li__span">${todo.topic}</span>
      </div>
    `

    incompletedList.appendChild(li)
    incompleteListLenght++
  }

  if (todo.status === TodoStatus.Completed) {
    li.innerHTML = `
      <input class="li__input" type="checkbox" ${local ? 'checked' : ''}>
      <div class="li__div">
        <h3 class="li__h3">${todo.task}</h3>
        <span class="li__span">${todo.topic}</span>
      </div>
    `

    completedList.appendChild(li)
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

    todo.status = todo.status === TodoStatus.Completed ? TodoStatus.Incomplete : TodoStatus.Completed
    break
  }

  if (status === TodoStatus.Incomplete) {
    completedList.appendChild(li)
    incompleteListLenght--
    completedListLenght++
  }

  if (status === TodoStatus.Completed) {
    incompletedList.appendChild(li)
    incompleteListLenght++
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
  modal.classList.toggle('modal--active')
}
