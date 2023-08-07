class Todos {
  _today = new Date();
  #addTodoButton = document.querySelector('#add-todo-btn');
  #currentId;
  #currentTodo;

  constructor() {
    this._validationPopUpHandler();
    this._checkPopUpPermissions();
    this._deletePopUpPermisson();
  }

  _generatedate(date) {
    if (!date) return '';
    return Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  }

  _todoMarkup(todo) {
    return `<li class="todo ${todo.checked ? 'todo-checked' : ''}" data-id="${
      todo.id
    }">
              <h5>${todo.createdDate}</h5>
              <div class="todo-list-content">
                <h2 ${
                  todo.titleValue.length > 6 ? 'style="font-size:2.5rem"' : ''
                } >
                  <span class="todo-title">${todo.titleValue}</span>
                  <span class="todo-list-content-date" ${
                    todo.titleValue.length > 6 ? 'style="font-size:1rem"' : ''
                  } >${''}${
      todo.dateValue ? 'on ' + todo.dateValue : ''
    } </span>
                </h2>
                <p class="todo-text" ${
                  todo.titleValue.length > 6 ? 'style="font-size:1.6rem"' : ''
                }>
                  ${todo.textValue}
                </p>
              </div>

              <div class="todo-list-buttons">
                <button class="todo-list-button todo-edit edit">
                  Edit <span class="material-symbols-outlined edit"> edit</span>
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

  renderMarkup(todo) {
    const todosContainer = document.querySelector('#todos');
    todosContainer.insertAdjacentHTML('afterbegin', this._todoMarkup(todo));
  }

  addTodoHandler(functionHandler) {
    this.#addTodoButton.addEventListener('click', (e) => {
      e.preventDefault();
      functionHandler();
    });
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

  renderValidationPopUp() {
    document.body.insertAdjacentHTML('beforeend', this._validationPopUp());
  }

  _validationPopUpHandler() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.okay') || e.target.matches('.v-overlay')) {
        const popupSection = e.target.closest('#popup-validation-section');
        popupSection.remove();
      }
    });
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
          <button class="popup-button popup-yes check-yes"><span class="material-symbols-outlined check-yes">done</span>Yes
          </button>
          <button class="popup-button popup-no check-no"><span class="material-symbols-outlined check-no">close</span>No
          </button>
      </div>
       <p class="popup-permisson" >Don't ask again <span class="Permisson-cheked"><input type="checkbox" id ="checked-popup-permisson">  </span> </p>
    </section>
    `;
  }

  _checkedTodoHandler(functionHandler) {
    document.addEventListener('click', (e) => {
      if (e.target.matches('#todo-checked')) {
        const todo = e.target.closest('.todo');
        const id = todo.dataset.id;
        this.#currentId = id;
        this.#currentTodo = todo;

        if (JSON.parse(localStorage.getItem('checkedpopupPermisson'))) {
          this._checkTodofunc(functionHandler);
          return;
        }
        this.renderPopUp(this._checktodoMarkup());
      }
    });
  }

  checkedTodoPopUpHandler(functionHandler) {
    document.addEventListener('click', (x) => {
      if (x.target.matches('.check-yes')) {
        x.target.closest('#popup-checked-todo').remove();
        this._checkTodofunc(functionHandler);
      }
      if (x.target.matches('.check-no') || x.target.matches('.c-overlay')) {
        x.target.closest('#popup-checked-todo').remove();
        this.#currentTodo.querySelector('.todo-input-checked').checked = false;
      }
    });
  }

  _checkTodofunc(functionHandler) {
    this.#currentTodo.checked = true;
    this.#currentTodo.classList.add('todo-checked');
    this.#currentTodo.querySelector('.todo-input-checked').checked = true;
    functionHandler(this.#currentId);
  }

  _checkPopUpPermissions() {
    document.addEventListener('change', (e) => {
      if (e.target.matches('#checked-popup-permisson')) {
        localStorage.setItem('checkedpopupPermisson', true);
      }
    });
  }

  _deleteTodoMarkup() {
    return `<section id ="popup-delete-todo">
      <div class="d-overlay overlay"></div>
      <div class="popup popup-delete">
        <h3>Are you sure to remove it? </h3>
        <div class="popup-buttons">
          <button class="popup-button popup-yes del-yes"><span class="material-symbols-outlined  del-yes">done</span>Yes
          </button>
          <button class="popup-button popup-no del-no"><span class="material-symbols-outlined del-no">close</span>No
          </button>
      </div>
       <p class="popup-permisson" >Don't ask again <span class="Permisson-cheked"><input type="checkbox" id ="delete-popup-permisson">  </span> </p>
    </section>`;
  }

  _deleteTodoHandler(functionHandler) {
    document.addEventListener('click', (e) => {
      if (
        e.target.matches('.todo-delete') ||
        e.target.matches('.delete-icon')
      ) {
        const todo = e.target.closest('.todo');
        const id = todo.dataset.id;

        this.#currentId = id;
        this.#currentTodo = todo;

        if (JSON.parse(localStorage.getItem('deletepopupPermisson'))) {
          this._deleteTodofunc(functionHandler);
          return;
        }
        this.renderPopUp(this._deleteTodoMarkup());
      }
    });
  }

  deleteTodoPopupHandler(functionHandler) {
    document.addEventListener('click', (x) => {
      if (x.target.matches('.del-yes')) {
        x.target.closest('#popup-delete-todo').remove();
        this._deleteTodofunc(functionHandler);
      }
      if (x.target.matches('.del-no') || x.target.matches('.d-overlay')) {
        x.target.closest('#popup-delete-todo').remove();
      }
    });
  }

  _deleteTodofunc(functionHandler) {
    this.#currentTodo.classList.add('todo-animate');
    this.#currentTodo.style.opacity = '0';
    setTimeout(() => {
      this.#currentTodo.remove();
    }, 500);
    functionHandler(this.#currentId);
  }

  _deletePopUpPermisson() {
    document.addEventListener('change', (e) => {
      if (e.target.matches('#delete-popup-permisson')) {
        localStorage.setItem('deletepopupPermisson', true);
      }
    });
  }

  renderEdit(todoObj) {
    Array.from(this.#currentTodo.children).forEach((element) => {
      element.classList.add('hide-display');
    });
    this.#currentTodo.insertAdjacentHTML(
      'beforeend',
      this._editViewMarkup(todoObj),
    );
  }

  _dateTimeLoaclValueFormation(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${
      String(date.getMonth()).length == 1
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${
      String(date.getDate()).length == 1 ? '0' + date.getDate() : date.getDate()
    }T${
      String(date.getHours()).length == 1
        ? '0' + date.getHours()
        : date.getHours()
    }:${
      String(date.getMinutes()).length == 1
        ? '0' + date.getMinutes()
        : date.getMinutes()
    }`;
  }

  _editViewMarkup(todoObj) {
    return `<h5>${todoObj.createdDate}</h5>
              <div class="todo-list-content-edit">
                <input class="add-todo-time edit-todo-time" type="datetime-local"  value="${
                  todoObj.dateValue
                    ? this._dateTimeLoaclValueFormation(todoObj.date)
                    : ''
                }"/>
                <label for="Title">
                  Title -
                  <br />
                  <input
                    class="todo-list-content-title"
                    type="textarea"               
                    value="${todoObj.titleValue}"
                    maxlength="20"
                  />
                </label>
                <label for="details">
                  Details -
                  <br />
                  <textarea
                    name="details"
                    class="todo-list-content-text"
                  style="height:${this.calculateTextAreaHeight(
                    todoObj.textValue.length,
                  )}px;"
                  >${todoObj.textValue}</textarea>
                </label>
              </div>
              <div class="todo-list-buttons">
                <button class="todo-list-button todo-done">
                  Done<span class="material-symbols-outlined todo-done"> done </span>
                </button>
              </div>`;
  }

  calculateTextAreaHeight(wordslength) {
    const numIterations = Math.ceil(wordslength / 44);
    const increaseInY = numIterations * 26;
    const height = numIterations === 0 ? 26 : increaseInY;
    return height;
  }

  inputboxHandler() {
    document.addEventListener('input', (e) => {
      if (!e.target.matches('.todo-list-content-text')) return;
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 10 + 'px';
    });
  }

  editTodoHandler(functionHandler) {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.edit')) {
        this.#currentTodo = e.target.closest('.todo');
        this.#currentId = this.#currentTodo.dataset.id;
        this.renderEdit(functionHandler(this.#currentId));
      }
    });
  }

  editDoneTodoHandler(functionHandler) {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.todo-done')) {
        const todo = e.target.closest('.todo');
        const id = todo.dataset.id;
        const time = todo.querySelector('.edit-todo-time');
        const title = todo.querySelector('.todo-list-content-title');
        const description = todo.querySelector('.todo-list-content-text');

        console.log(time.value);
        const editData = {
          time: this._generatedate(time.value),
          title: title.value,
          description: description.value,
        };

        const todoDate = todo.querySelector('.todo-list-content-date');

        
        todoDate.innerText = 'on ' + editData.time;
        if (!editData.time) todoDate.innerText = '';
        
        const todoTitle = todo.querySelector('.todo-title');

        todoTitle.innerText = editData.title;

        console.log(todo.querySelector('.todo-list-content-date'));

        todo.querySelector('.todo-text').innerText = editData.description;
        functionHandler(id, editData);

        Array.from(todo.children).forEach((element) => {
          if (!element.classList.contains('hide-display')) element.remove();
          else {
            element.classList.remove('hide-display');
          }
        });

        if (editData.title.length > 6) {
          todoDate.style.fontSize = '1rem';
          todoTitle.style.fontSize = '2.5rem';
        } else {
          todoDate.style.fontSize = '1.3rem';
          todoTitle.style.fontSize = '3rem';
        }
      }
    });
  }

  _messageMarkup() {
    return `<li class="emptylist-msg">
      <h2>The list is Empty</h2>
      <p>Add to show the todo list</p>
    </li>`;
  }

  renderMessage() {
    const todosContainer = document.querySelector('#todos');
    setTimeout(() => {
      todosContainer.insertAdjacentHTML('beforeend',this._messageMarkup());
    },500)
  }

  
  deleteMessage() {
    document.querySelector('.emptylist-msg').remove();
  }
}

export default new Todos();
