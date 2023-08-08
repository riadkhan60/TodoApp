const aboutContent = document.querySelector('.about-content');
const aboutImg = document.querySelector('.about-img');
const aboutMe = document.querySelector('#about-me');
const aboutSection = document.querySelector('#aboutSection');
const closeButton = document.querySelector('.about-close');


export function aboutView() {
  aboutMe.addEventListener('click', (e) => {
    e.preventDefault();
    aboutSection.classList.remove('hide-display');
    closeButton.classList.remove('hide-display');
    setTimeout(() => {
      aboutImg.classList.add('about-animation');
      aboutContent.classList.add('about-animation');
      closeButton.classList.add('about-close-animate');
    }, 10);
  });
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    aboutClose();
  })
  document.addEventListener('click', (e) => { 
    if (e.target.contains(aboutImg)) {
      aboutClose();
    }
  })
}



function aboutClose() {
  aboutImg.classList.remove('about-animation');
  aboutContent.classList.remove('about-animation');
  closeButton.classList.add('hide-display');
  closeButton.classList.remove('about-close-animate');
  setTimeout(() => {
    aboutSection.classList.add('hide-display');
  }, 400);
}

