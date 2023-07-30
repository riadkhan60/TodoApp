import { getTheValues, saveToStorage, allTodos, todos } from './modal.js';
import Todos from './view.js';

window.addEventListener('load', (x) => {
  allTodos((todo) => {
    Todos.renderMarkup(todo);
  });
});

function controlAddTodo() {
  const inputValues = getTheValues();
  if (!inputValues) {
    Todos.renderValidationPopUp();
    return;
  }
  Todos.renderMarkup(inputValues);
  saveToStorage();
}

function controlCheckedTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  todo.checked = true;
  saveToStorage();
}

function controlDeleteTodo(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos.splice(todoIndex, 1);
  saveToStorage();
  console.log(todos);
}

function init() {
  Todos.addTodoHandler(controlAddTodo);
  Todos.checkedTodoPopUpHandler(controlCheckedTodo);
  Todos.deleteTodoPopupHandler(controlDeleteTodo);
}

init();