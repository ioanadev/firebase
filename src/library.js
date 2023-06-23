// imports
import { renderLibrary } from './js-files/buildLibrary';
import { libraryModal } from './js-files/library/library-modal';
import { libraryLocalStorageHandle } from './js-files/library/library-local-storage';
import { handleLibraryModalBtns } from './js-files/library/changeLibraryModalBtns';

const libraryInit = () => {
  renderLibrary();
  libraryModal();
  libraryLocalStorageHandle();
  handleLibraryModalBtns();
};

window.addEventListener('DOMContentLoaded', libraryInit);

const body = document.querySelector('body');
const dlBtn = document.querySelector('.dl-btn');
const iconSun = document.querySelector('.fa-sun');
const iconMoon = document.querySelector('.fa-moon');

function store(value) {
  localStorage.setItem('darkmode', value);
}

function load() {
  const darkmode = localStorage.getItem('darkmode');

  if (darkmode === null) {
    store(false);
    iconSun.style.display = 'inline';
    iconMoon.style.display = 'none';
  } else if (darkmode === 'true') {
    body.classList.add('darkmode');
    iconSun.style.display = 'none';
    iconMoon.style.display = 'inline';
  } else if (darkmode === 'false') {
    iconSun.style.display = 'inline';
    iconMoon.style.display = 'none';
  }
}

load();
dlBtn.addEventListener('click', () => {
  body.classList.toggle('darkmode');
  iconSun.classList.add('animated');
  iconMoon.classList.add('animated');

  store(body.classList.contains('darkmode'));

  if (body.classList.contains('darkmode')) {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'inline';
  } else {
    iconSun.style.display = 'inline';
    iconMoon.style.display = 'none';
  }
  setTimeout(() => {
    iconSun.classList.remove('animated');
    iconMoon.classList.remove('anmated');
  }, 500);
});
