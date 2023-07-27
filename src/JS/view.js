class Todos {
  _today = new Date();
  #addTodoButton = document.querySelector('#add-todo-btn');

  constructor() {}

  _generatedate(date) {
    return Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  renderMarkup(todo) {
    const todosContainer = document.querySelector('#todos');
    console.log(todo.titleValue.length);
    todosContainer.insertAdjacentHTML('afterbegin', this._todoMarkup(todo));
  }

  _todoMarkup(todo) {
    return `<li class="todo" data-id="${todo.id}">
              <h5>${this._generatedate(this._today)}</h5>
              <div class="todo-list-content">
                <h2 ${
                  todo.titleValue.length > 6 ? 'style="font-size:2.5rem"' : ''
                } >
                  ${todo.titleValue}
                  <span class="todo-list-content-date" ${
                    todo.titleValue.length > 6 ? 'style="font-size:1rem"' : ''
                  } >${todo.dateValue ? 'on ' + todo.dateValue : ''} </span>
                </h2>
                <p class="todo-text" ${
                  todo.titleValue.length > 6 ? 'style="font-size:1.6rem"' : ''
                }>
                  ${todo.textValue}
                </p>
              </div>

              <div class="todo-list-buttons">
                <button class="todo-list-button todo-edit">
                  Edit <span class="material-symbols-outlined"> edit</span>
                </button>
                <button class="todo-list-button todo-delete">
                  Delete<span class="material-symbols-outlined"> delete </span>
                </button>
              </div>

              <div class="cheked">
                <input type="checkbox" ${
                  todo.checked ? 'checked' : ''
                } name="todo-checked" id="todo-checked" />
                <span> </span>
              </div>
          </li>`;
  }
  addTodoHandler(functionHandler) {
    this.#addTodoButton.addEventListener('click', (e) => {
      e.preventDefault();
      functionHandler();
    });
  }

  checkedTodoHandler(functionHandler) { 
    document.addEventListener('change', (e) => {
      if (e.target.matches('#todo-checked')) {
       const id = e.target.closest('.todo').dataset.id
        functionHandler(id);
      }
    })
  }
}

export default new Todos();
