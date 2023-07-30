// get all the input elements
const titleInput = document.querySelector('#add-todo-title');
const textInput = document.querySelector('#add-todo-text');
const dateInput = document.querySelector('.add-todo-time');


export let todos = [];

localStorage.removeItem('checkedpopupPermisson');
localStorage.removeItem('deletepopupPermisson');
// function for todo's date input coversation to JS Date
function convertDate(date) {
  if (!date) return '';
  return Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

// function for getting todos object
export function getTheValues() {
  // empty object for todo's information
  let todoValue = {};
  
  if (titleInput.value == '' && textInput.value == '') return false;
  todoValue.titleValue = titleInput.value || 'No title';
  todoValue.textValue = textInput.value || 'No description';
  todoValue.dateValue = convertDate(dateInput.value);
  todoValue.id = String(Date.now()).slice(-7);
  todoValue.checked = false;
  todos.push(todoValue);
  clearValues();
  return todoValue;
}

function clearValues(){
  textInput.value = '';
  titleInput.value = '';
  dateInput.value = '';
}

export function saveToStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function getFromStorage() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos == undefined) return;
  const convertedTodos = JSON.parse(storedTodos);
  convertedTodos.forEach(todo => {
    todos.push(todo);
  });
}


export function allTodos(func) {
   getFromStorage();
   if (!todos) return;
  todos.forEach((todo) => {
     func(todo)
   });
}