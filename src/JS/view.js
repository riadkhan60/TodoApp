class Todos {
  _today = new Date();
  #addTodoButton = document.querySelector('#add-todo-btn');
  #currentId;
  #currentTodo;

  constructor() {
    this._validationPopUpHandler();
    this._checkedTodoHandler();
    this._deleteTodoHandler();
  }

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

  renderValidationPopUp() {
    document.body.insertAdjacentHTML('beforeend', this._validationPopUp());
  }

  renderPopUp(markup) {
    document.body.insertAdjacentHTML('beforeend', markup);
  }

  _deleteTodoMarkup() {
    return `<section id ="popup-delete-todo">
      <div class="d-overlay overlay"></div>
      <div class="popup popup-delete">
        <h3>Are you sure to remove it? </h3>
        <div class="popup-buttons">
          <button class="popup-button popup-yes del-yes"><span class="material-symbols-outlined yes">done</span>Yes
          </button>
          <button class="popup-button popup-no del-no"><span class="material-symbols-outlined no">close</span>No
          </button>
      </div>
       <p class="popup-permisson" >Don't ask again <span class="Permisson-cheked"><input type="checkbox">  </span> </p>
    </section>`;
  }

  _checktodoMarkup() {
    return `
    <section id = "popup-checked-todo">
      <div class="c-overlay overlay"></div>
      <div class="popup popup-complete">
        <h3>Are you sure about marking it "Completed"? </h3>
        <div class="popup-buttons">
          <button class="popup-button popup-yes check-yes"><span class="material-symbols-outlined yes">done</span>Yes
          </button>
          <button class="popup-button popup-no check-no"><span class="material-symbols-outlined no">close</span>No
          </button>
      </div>
       <p class="popup-permisson" >Don't ask again <span class="Permisson-cheked"><input type="checkbox">  </span> </p>
    </section>
    `;
  }

  _validationPopUp() {
    return `<section id="popup-validation-section">
      <div class="v-overlay overlay"></div>
      <div class="popup popup-validation">
        <h3>Please Insert Title Or Description</h3>
        <div class="popup-buttons">
          <button class="popup-button okay popup-Okay"><span class="material-symbols-outlined okay">done</span>Okay
          </button>
      </div>
    </section>`;
  }

  _todoMarkup(todo) {
    return `<li class="todo ${todo.checked ? 'todo-checked' : ''}" data-id="${
      todo.id
    }">
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
                  Delete<span class="material-symbols-outlined delete-icon"> delete </span>
                </button>
              </div>

              <div class="cheked">
                <input type="checkbox" ${
                  todo.checked ? 'checked' : ''
                } name="todo-checked" id="todo-checked" class="todo-input-checked" />
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

  _checkedTodoHandler() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('#todo-checked')) {
        const todo = e.target.closest('.todo');
        const id = todo.dataset.id;
        this.#currentId = id;
        this.#currentTodo = todo;
        // this.checkedTodoPopUpHandler(todo, id, functionHandler);
        this.renderPopUp(this._checktodoMarkup());
      }
    });
  }

  checkedTodoPopUpHandler(functionHandler) {
    document.addEventListener('click', (x) => {
      if (x.target.matches('.check-yes')) {
        x.target.closest('#popup-checked-todo').remove();
        this.#currentTodo.checked = true;
        this.#currentTodo.classList.add('todo-checked');
        this.#currentTodo.querySelector('.todo-input-checked').checked = true;
        functionHandler(this.#currentId);
      }
      if (x.target.matches('.check-no') || x.target.matches('.c-overlay')) {
        x.target.closest('#popup-checked-todo').remove();
        this.#currentTodo.querySelector('.todo-input-checked').checked = false;
      }
    }); 
  }

  _deleteTodoHandler() {
    document.addEventListener('click', (e) => {
      if (
        e.target.matches('.todo-delete') ||
        e.target.matches('.delete-icon')
      ) {
        const todo = e.target.closest('.todo');
        const id = todo.dataset.id;

        this.#currentId = id;
        this.#currentTodo = todo;
        // functionHandler(id);
        // todo.remove();
        // this._deleteTodoPopupHandler(todo, id, functionHandler);
        this.renderPopUp(this._deleteTodoMarkup());
      }
    });
  }

  deleteTodoPopupHandler(functionHandler) {
    document.addEventListener('click', (x) => {
      if (x.target.matches('.del-yes')) {
        this.#currentTodo.classList.add('todo-animate');
        x.target.closest('#popup-delete-todo').remove();
        this.#currentTodo.style.opacity = '0';
        setTimeout(() => {
          this.#currentTodo.remove();
        }, 400);
        functionHandler(this.#currentId);
      }
      if (x.target.matches('.del-no') || x.target.matches('.d-overlay')) {
        x.target.closest('#popup-delete-todo').remove();
      }
    });
  }

  _validationPopUpHandler() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.okay') || e.target.matches('.v-overlay')) {
        const popupSection = e.target.closest('#popup-validation-section');
        popupSection.remove();
      }
    });
  }
}

export default new Todos();
