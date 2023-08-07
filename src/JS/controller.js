import { getTheValues, saveToStorage, allTodos, todos } from './modal.js';
import Todos from './view.js';
import contractView from './contact/contractView.js';

// window.addEventListener('load', (x) => {
//   allTodos((todo) => {
//     Todos.renderMarkup(todo);
//   });
//    if (todos.length > 0) {
//      Todos.deleteMessage();
//    }
// });

function loadTodos() {
  allTodos((todo) => {
    Todos.renderMarkup(todo);
  });
  if (todos.length > 0) {
    Todos.deleteMessage();
  }
}

function controlAddTodo() {
  const inputValues = getTheValues();
  if (!inputValues) {
    Todos.renderValidationPopUp();
    return;
  }
  Todos.renderMarkup(inputValues);
  saveToStorage();

  if (todos.length > 0) {
    Todos.deleteMessage();
  }
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

  if (todos.length < 1) {
     console.log(todos);
     Todos.renderMessage();
   }
}

function editController(id) {
  const todo = todos.find((todo) => todo.id === id);
  return todo;
}

function editDoneController(id , editData) {
  const todo = todos.find((todo) => todo.id === id);
  todo.titleValue = editData.title;
  todo.textValue = editData.description;
  todo.dateValue = editData.time;

  saveToStorage();
}

function init() {
  loadTodos();
  Todos.addTodoHandler(controlAddTodo);
  Todos.checkedTodoPopUpHandler(controlCheckedTodo);
  Todos.deleteTodoPopupHandler(controlDeleteTodo);
  Todos._checkedTodoHandler(controlCheckedTodo);
  Todos._deleteTodoHandler(controlDeleteTodo);
  Todos.editTodoHandler(editController);
  Todos.inputboxHandler()
  Todos.editDoneTodoHandler(editDoneController);
  contractView.openFrom();
  contractView.closeFrom();
}

init();
