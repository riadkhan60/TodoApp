import { getTheValues } from './modal.js';
import Todos from './view.js';

const addTodoButton = document.querySelector('#add-todo-btn');

addTodoButton.addEventListener('click', (e) => {
  e.preventDefault();
  controlAddTodo();
});

function controlAddTodo() {
  const inputValues = getTheValues();
  Todos.renderMarkup(inputValues);
}
