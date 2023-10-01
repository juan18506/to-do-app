'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
document.addEventListener('DOMContentLoaded', () => {
    const uncompletedList = document.getElementById('uncompleted__list');
    const completedList = document.getElementById('completed__list');
    const listStatus = document.getElementById('status');
    const form = document.getElementById('form');
    const openButton = document.getElementById('openButton');
    const modal = document.getElementById('modal');
    const sendButton = modal === null ? null : modal.querySelector('#submitButton');
    const closeButton = modal === null ? null : modal.querySelector('#closeButton');
    let uncompletedListLenght = 0;
    let completedListLenght = 0;
    const { currentDay, currentMonth, currentYear } = getCurrentDateData();
    showCurrentDate(currentDay, currentMonth, currentYear);
    const localStorageTodos = window.localStorage.getItem('todos');
    if (localStorageTodos) {
        const todos = JSON.parse(localStorageTodos);
        todos.forEach(todo => addToList(todo, true));
    }
    else {
        showToDoStatus();
    }
    ;
    if (form === null || !(form instanceof HTMLFormElement))
        return;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        const inputTask = data.task.toString();
        const inputtopic = data.topic.toString();
        if (!inputTask || !inputtopic)
            return;
        const todo = {
            task: inputTask,
            topic: inputtopic,
            status: types_1.TodoStatus.Uncompleted
        };
        addToList(todo);
        console.log(event.currentTarget);
        resetInputs(sendButton);
        changeModalDisplay();
    });
    uncompletedList.addEventListener('click', (e) => {
        if (!(e.target instanceof HTMLInputElement) || !e.target.checked)
            return;
        const li = e.target.parentElement;
        updateList(li, types_1.TodoStatus.Uncompleted);
    });
    completedList.addEventListener('click', (e) => {
        if (!(e.target instanceof HTMLInputElement) || e.target.checked)
            return;
        const li = e.target.parentElement;
        updateList(li, types_1.TodoStatus.Completed);
    });
    openButton.addEventListener('click', (e) => {
        changeModalDisplay();
    });
    closeButton.addEventListener('click', (e) => {
        resetInputs(closeButton);
        changeModalDisplay();
    });
    function getCurrentDateData() {
        const currentDate = new Date(Date.now());
        const currentMonth = types_1.Months[currentDate.getMonth()];
        const currentDay = currentDate.getDate();
        const currentYear = currentDate.getFullYear();
        return { currentDay, currentMonth, currentYear };
    }
    function showCurrentDate(day, month, year) {
        const date = document.getElementById('date');
        date.innerHTML = `${month} ${day}, ${year}`;
    }
    function showToDoStatus() {
        listStatus.innerHTML = `${uncompletedListLenght} uncompleted, ${completedListLenght} completed`;
    }
    function addToList(todo, local) {
        const li = document.createElement('li');
        li.classList.add('main__li', 'li');
        if (todo.status === types_1.TodoStatus.Uncompleted) {
            li.innerHTML = `
        <input class="li__input" type="checkbox">
        <div class="li__div">
          <h3 class="li__h3">${todo.task}</h3>
          <span class="li__span">${todo.topic}</span>
        </div>
      `;
            uncompletedList.appendChild(li);
            uncompletedListLenght++;
        }
        if (todo.status === types_1.TodoStatus.Completed) {
            li.innerHTML = `
        <input class="li__input" type="checkbox" ${local ? 'checked' : ''}>
        <div class="li__div">
          <h3 class="li__h3">${todo.task}</h3>
          <span class="li__span">${todo.topic}</span>
        </div>
      `;
            completedList.appendChild(li);
            completedListLenght++;
        }
        showToDoStatus();
        if (!local) {
            todos.push(todo);
            updateLocalStorage();
        }
    }
    function updateList(li, status) {
        const h3 = li.querySelector('h3');
        const span = li.querySelector('span');
        for (const todo of todos) {
            if (todo.task !== h3.innerText || todo.topic !== span.innerText)
                continue;
            todo.status = todo.status === types_1.TodoStatus.Completed ? types_1.TodoStatus.Uncompleted : types_1.TodoStatus.Completed;
            break;
        }
        if (status === types_1.TodoStatus.Uncompleted) {
            completedList.appendChild(li);
            uncompletedListLenght--;
            completedListLenght++;
        }
        if (status === types_1.TodoStatus.Completed) {
            uncompletedList.appendChild(li);
            uncompletedListLenght++;
            completedListLenght--;
        }
        showToDoStatus();
        updateLocalStorage();
    }
    function updateLocalStorage() {
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }
    function resetInputs(button) {
        const formElements = button.classList.contains('closebtn') ?
            button.previousElementSibling.children :
            button.parentElement.children;
        for (const formElement of formElements) {
            if (!(formElement instanceof HTMLTextAreaElement || formElement instanceof HTMLInputElement))
                continue;
            formElement.value = formElement.defaultValue;
        }
    }
    function changeModalDisplay() {
        modal.classList.toggle('modal--active');
    }
});
