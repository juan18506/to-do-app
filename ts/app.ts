'use strict'

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

const date = document.getElementById('date') as HTMLParagraphElement
const todoStatus = document.getElementById('status') as HTMLParagraphElement

const actualDate = new Date(Date.now())
const month = Months[actualDate.getMonth()]
const day = actualDate.getDate()
const year = actualDate.getFullYear()

date.innerHTML = `${month} ${day}, ${year}`
todoStatus.innerHTML = `${1} incomplete, ${5} completed`