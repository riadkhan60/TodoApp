class Todos {
  _today = new Date();

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
    todosContainer.insertAdjacentHTML('afterbegin', this._todoMarkup(todo));
  }

  _todoMarkup(todo) {
    return `<li class="todo">
              <h5>${this._generatedate(this._today)}</h5>
              <div class="todo-list-content">
                <h2>
                  ${todo.titleValue}
                  <span class="todo-list-content-date"> on ${
                    todo.dateValue
                  } </span>
                </h2>
                <p class="todo-text">
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
}

export default new Todos();
