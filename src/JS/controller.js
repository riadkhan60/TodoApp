import { getTheValues, saveToStorage, allTodos, todos } from './modal.js';
import Todos from './view.js';

window.addEventListener('load', (x) => {
  allTodos(todo => {
    Todos.renderMarkup(todo);
  })
});


function controlAddTodo() {
  const inputValues = getTheValues();
  if (!inputValues) {
    alert('Please include title or description');
    return;
  }
  Todos.renderMarkup(inputValues);
  saveToStorage();
}

function controlCheckedTodo(id) {
  const findIndex = todos.findIndex(todo => todo.id === id);
  // todos.splice(findIndex, 1);
  saveToStorage();
}


function init() {
  Todos.addTodoHandler(controlAddTodo);
  Todos.checkedTodoHandler(controlCheckedTodo)
}

init();
