'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ToDoList = /*#__PURE__*/function () {
  function ToDoList() {
    _classCallCheck(this, ToDoList);
    _defineProperty(this, "incompletedList", void 0);
    _defineProperty(this, "completedList", void 0);
    _defineProperty(this, "incompleteListLenght", void 0);
    _defineProperty(this, "completedListLenght", void 0);
    _defineProperty(this, "listStatus", void 0);
    this.incompletedList = document.getElementById('incomplete__list');
    this.completedList = document.getElementById('completed__list');
    this.incompleteListLenght = 0;
    this.completedListLenght = 0;
    this.listStatus = document.getElementById('status');
  }
  _createClass(ToDoList, [{
    key: "addToList",
    value: function addToList(todo, topic) {
      this.incompletedList.innerHTML += "\n      <li class=\"main__li li\">\n        <input class=\"li__input\" type=\"checkbox\">\n        <div class=\"li__div\">\n          <h3 class=\"li__h3\">".concat(todo, "</h3>\n          <span class=\"li__span\">").concat(topic, "</span>\n        </div>\n      </li>\n    ");
      this.incompleteListLenght++;
      this.showToDoStatus();
    }
  }, {
    key: "showToDoStatus",
    value: function showToDoStatus() {
      this.listStatus.innerHTML = "".concat(this.incompleteListLenght, " incomplete, ").concat(this.completedListLenght, " completed");
    }
  }]);
  return ToDoList;
}();
var toDoList = new ToDoList();
var _getCurrentDateData = getCurrentDateData(),
  currentDay = _getCurrentDateData.currentDay,
  currentMonth = _getCurrentDateData.currentMonth,
  currentYear = _getCurrentDateData.currentYear;
showCurrentDate(currentDay, currentMonth, currentYear);
toDoList.addToList('Play csgo', 'Videogames');
toDoList.addToList('Do homework', 'Learning activities');
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