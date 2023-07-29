class Todos {
  _today = new Date();
  #addTodoButton = document.querySelector('#add-todo-btn');

  constructor() {
    this._validationPopUpHandler();
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
  _checktodoMarkup() {
    return `
    <section id = "popup-checked-todo">
      <div class="c-overlay overlay"></div>
      <div class="popup popup-complete">
        <h3>Are you sure about marking it "Completed"? </h3>
        <div class="popup-buttons">
          <button class="popup-button popup-yes yes"><span class="material-symbols-outlined yes">done</span>Yes
          </button>
          <button class="popup-button popup-no no"><span class="material-symbols-outlined no">close</span>No
          </button>
      </div>
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

  checkedTodoHandler(functionHandler) {
    document.addEventListener('change', (e) => {
      if (e.target.matches('#todo-checked')) {
        const todo = e.target.closest('.todo');
        const id = todo.dataset.id;
        this.checkedTodoPopUpHandler(todo, id, functionHandler);
      }
    });
  }

  checkedTodoPopUpHandler(todo, id, functionHandler) {
    this.renderPopUp(this._checktodoMarkup());
    document.addEventListener('click', (x) => {
      if (x.target.matches('.yes')) {
        x.target.closest('#popup-checked-todo').remove();
        todo.checked = true;
        todo.classList.add('todo-checked');
        todo.querySelector('.todo-input-checked').checked = true;
        functionHandler(id);
      }
      if (x.target.matches('.no') || x.target.matches('.c-overlay')) {
        x.target.closest('#popup-checked-todo').remove();
        todo.querySelector('.todo-input-checked').checked = false;
      }
    });
  }

  deleteTodoHandler(functionHandler) {
    document.addEventListener('click', (e) => {
      if (
        e.target.matches('.todo-delete') ||
        e.target.matches('.delete-icon')
      ) {
        const todo = e.target.closest('.todo');
        todo.classList.add('todo-animate');
        const id = todo.dataset.id;
        todo.style.opacity = '0';
        setTimeout(() => {
          todo.remove();
        }, 400);
        functionHandler(id);
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
