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
  console.log(todos);
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
}

function editController(id) {
  const todo = todos.find((todo) => todo.id === id);
  return todo;
}

function init() {
  Todos.addTodoHandler(controlAddTodo);
  Todos.checkedTodoPopUpHandler(controlCheckedTodo);
  Todos.deleteTodoPopupHandler(controlDeleteTodo);
  Todos._checkedTodoHandler(controlCheckedTodo);
  Todos._deleteTodoHandler(controlDeleteTodo);
  Todos.editTodoHandler(editController);
  // Todos.inputboxHandler()
}

init();

console.log(new Date().toISOString());