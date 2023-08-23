'use strict';

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
}(Months || {});
var date = document.getElementById('date');
var todoStatus = document.getElementById('status');
var actualDate = new Date(Date.now());
var month = Months[actualDate.getMonth()];
var day = actualDate.getDate();
var year = actualDate.getFullYear();
date.innerHTML = "".concat(month, " ").concat(day, ", ").concat(year);
todoStatus.innerHTML = "".concat(1, " incomplete, ", 5, " completed");