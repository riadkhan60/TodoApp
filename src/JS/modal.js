
// get all the input elements
const titleInput = document.querySelector('#add-todo-title');
const textInput = document.querySelector('#add-todo-text');
const dateInput = document.querySelector('.add-todo-time');

// empty object for todo's information
let todoValue = {};

// function for todo's date input coversation to JS Date
function convertDate(date) {
  return Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

// function for getting todos object
export function getTheValues() {
  todoValue.titleValue = titleInput.value;
  todoValue.textValue = textInput.value;
  todoValue.dateValue = convertDate(dateInput.value);
  todoValue.checked = false;
  return todoValue;

}
