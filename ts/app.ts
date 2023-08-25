'use strict'

enum ListStatus {
  Incomplete,
  Completed
}

type Todo = {
  task: string,
  topic: string
}

const incompletedList = document.getElementById('incomplete__list') as HTMLUListElement
const completedList = document.getElementById('completed__list') as HTMLUListElement
const listStatus = document.getElementById('status') as HTMLParagraphElement
const form = document.getElementById('form') as HTMLFormElement
let incompleteListLenght = 0
let completedListLenght = 0

const { currentDay, currentMonth, currentYear } = getCurrentDateData()
showCurrentDate(currentDay, currentMonth, currentYear)

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
    topic: inputtopic
  }

  addToList(todo)
})

incompletedList.addEventListener('click', (e) => {
  if (!(e.target instanceof HTMLInputElement) || !e.target.checked) return

  const li = e.target.parentElement as HTMLLIElement
  updateList(li, ListStatus.Completed)
})

completedList.addEventListener('click', (e) => {
  if (!(e.target instanceof HTMLInputElement) || e.target.checked) return

  const li = e.target.parentElement as HTMLLIElement
  updateList(li, ListStatus.Incomplete)
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

function addToList(todo: Todo) {
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
  showToDoStatus()
}

function updateList(li: HTMLLIElement, status: ListStatus) {
  if (status === ListStatus.Completed) {
    completedList.appendChild(li)
    incompleteListLenght--
    completedListLenght++
    showToDoStatus()
  }

  if (status === ListStatus.Incomplete) {
    incompletedList.appendChild(li)
    incompleteListLenght++
    completedListLenght--
    showToDoStatus()
  }
}
