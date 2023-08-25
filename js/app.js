'use strict';

var ListStatus = /*#__PURE__*/function (ListStatus) {
  ListStatus[ListStatus["Incomplete"] = 0] = "Incomplete";
  ListStatus[ListStatus["Completed"] = 1] = "Completed";
  return ListStatus;
}(ListStatus || {});
var incompletedList = document.getElementById('incomplete__list');
var completedList = document.getElementById('completed__list');
var listStatus = document.getElementById('status');
var form = document.getElementById('form');
var incompleteListLenght = 0;
var completedListLenght = 0;
var _getCurrentDateData = getCurrentDateData(),
  currentDay = _getCurrentDateData.currentDay,
  currentMonth = _getCurrentDateData.currentMonth,
  currentYear = _getCurrentDateData.currentYear;
showCurrentDate(currentDay, currentMonth, currentYear);
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var data = Object.fromEntries(new FormData(form));
  var inputTask = data.task.toString();
  var inputtopic = data.topic.toString();
  if (!inputTask || !inputtopic) return;
  var todo = {
    task: inputTask,
    topic: inputtopic
  };
  addToList(todo);
});
incompletedList.addEventListener('click', function (e) {
  if (!(e.target instanceof HTMLInputElement) || !e.target.checked) return;
  var li = e.target.parentElement;
  updateList(li, ListStatus.Completed);
});
completedList.addEventListener('click', function (e) {
  if (!(e.target instanceof HTMLInputElement) || e.target.checked) return;
  var li = e.target.parentElement;
  updateList(li, ListStatus.Incomplete);
});
function getCurrentDateData() {
  var Months = /*#__PURE__*/function (Months) {
    Months[Months["January"] = 0] = "January";
    Months[Months["February"] = 1] = "February";
    Months[Months["March"] = 2] = "March";
    Months[Months["April"] = 3] = "April";
    Months[Months["May"] = 4] = "May";
    Months[Months["June"] = 5] = "June";
    Months[Months["July"] = 6] = "July";
    Months[Months["August"] = 7] = "August";
    Months[Months["September"] = 8] = "September";
    Months[Months["October"] = 9] = "October";
    Months[Months["November"] = 10] = "November";
    Months[Months["December"] = 11] = "December";
    return Months;
  }({});
  var currentDate = new Date(Date.now());
  var currentMonth = Months[currentDate.getMonth()];
  var currentDay = currentDate.getDate();
  var currentYear = currentDate.getFullYear();
  return {
    currentDay: currentDay,
    currentMonth: currentMonth,
    currentYear: currentYear
  };
}
function showCurrentDate(day, month, year) {
  var date = document.getElementById('date');
  date.innerHTML = "".concat(month, " ").concat(day, ", ").concat(year);
}
function showToDoStatus() {
  listStatus.innerHTML = "".concat(incompleteListLenght, " incomplete, ").concat(completedListLenght, " completed");
}
function addToList(todo) {
  incompletedList.innerHTML += "\n    <li class=\"main__li li\">\n      <input class=\"li__input\" type=\"checkbox\">\n      <div class=\"li__div\">\n        <h3 class=\"li__h3\">".concat(todo.task, "</h3>\n        <span class=\"li__span\">").concat(todo.topic, "</span>\n      </div>\n    </li>\n  ");
  incompleteListLenght++;
  showToDoStatus();
}
function updateList(li, status) {
  if (status === ListStatus.Completed) {
    completedList.appendChild(li);
    incompleteListLenght--;
    completedListLenght++;
    showToDoStatus();
  }
  if (status === ListStatus.Incomplete) {
    incompletedList.appendChild(li);
    incompleteListLenght++;
    completedListLenght--;
    showToDoStatus();
  }
}