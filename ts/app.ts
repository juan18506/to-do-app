'use strict'
class ToDoList {
  private incompletedList: HTMLUListElement
  private completedList: HTMLUListElement
  private incompleteListLenght: number
  private completedListLenght: number
  private listStatus: HTMLParagraphElement

  constructor() {
    this.incompletedList = document.getElementById('incomplete__list') as HTMLUListElement
    this.completedList = document.getElementById('completed__list') as HTMLUListElement
    this.incompleteListLenght = 0
    this.completedListLenght = 0
    this.listStatus = document.getElementById('status') as HTMLParagraphElement
  }

  addToList(todo: string, topic: string) {
    this.incompletedList.innerHTML += `
      <li class="main__li li">
        <input class="li__input" type="checkbox">
        <div class="li__div">
          <h3 class="li__h3">${todo}</h3>
          <span class="li__span">${topic}</span>
        </div>
      </li>
    `

    this.incompleteListLenght++
    this.showToDoStatus()
  }

  private showToDoStatus() {
    this.listStatus.innerHTML = `${this.incompleteListLenght} incomplete, ${this.completedListLenght} completed`
  }
}

const toDoList = new ToDoList()

const { currentDay, currentMonth, currentYear } = getCurrentDateData()
showCurrentDate(currentDay, currentMonth, currentYear)

toDoList.addToList('Play csgo', 'Videogames')
toDoList.addToList('Do homework', 'Learning activities')


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