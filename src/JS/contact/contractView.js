class ContractView {
  #contactButton = document.querySelector('#contact-me');
  #Conatactcontainer = document.querySelector('.Conatact-container');
  #contactOverlay = document.querySelector('.contact-overlay');
  #arrowButton = document.querySelector('.contact-arrow');
  constructor() {}
  openFrom() {
    this.#contactButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.#Conatactcontainer.classList.remove('hide-display');
      this.#contactOverlay.classList.remove('hide-display');
      setTimeout(() => {
        this.#Conatactcontainer.classList.add('Contact-animate');
      }, 10);
    });
  }

  closeFrom() {
    this.#arrowButton.addEventListener('click', (e) => {
      this.#contactOverlay.classList.add('hide-display');
      this.#Conatactcontainer.classList.remove('Contact-animate');
    })
    
    this.#contactOverlay.addEventListener('click', (e) => { 
      this.#contactOverlay.classList.add('hide-display');
      this.#Conatactcontainer.classList.remove('Contact-animate');
    })

    setTimeout(() => {
      this.#Conatactcontainer.classList.remove('Contact-animate');
    }, 10);
  }
}

export default new ContractView();