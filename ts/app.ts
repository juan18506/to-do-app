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
const openBtn = document.getElementById('openbtn') as HTMLButtonElement
const modal = document.getElementById('modal') as HTMLDivElement
let incompleteListLenght = 0
let completedListLenght = 0

const { currentDay, currentMonth, currentYear } = getCurrentDateData()
showCurrentDate(currentDay, currentMonth, currentYear)

const localTodos = window.localStorage.getItem('todos')
const todos: Array<Todo> = localTodos ? JSON.parse(localTodos) : []
if (localTodos) todos.forEach(todo => addToList(todo, true))

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

openBtn.addEventListener('click', () => {
  modal.classList.add('modal--active')
})

modal.addEventListener('click', (e) => {
  if (!(e.target instanceof Element) || !e.target.classList.contains('closebtn')) return

  modal.classList.remove('modal--active')
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
  if (todo.status === TodoStatus.Incomplete) {
    incompletedList.innerHTML += `
      <li class="main__li li">
        <input class="li__input" type="checkbox">
        <div class="li__div">
          <h3 class="li__h3">${todo.task}</h3>
          <span class="li__span">${todo.topic}</span>
        </div>
      </li>
    `

    incompleteListLenght++
  }

  if (todo.status === TodoStatus.Completed) {
    completedList.innerHTML += `
      <li class="main__li li">
        <input class="li__input" type="checkbox" ${local ? 'checked' : ''}>
        <div class="li__div">
          <h3 class="li__h3">${todo.task}</h3>
          <span class="li__span">${todo.topic}</span>
        </div>
      </li>
    `

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