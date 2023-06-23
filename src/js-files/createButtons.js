// imports
import getElement from './getElement';
import { currentPage } from './utils';

// variabiles
const prevBtn = getElement('#prev-btn');
const nextBtn = getElement('#next-btn');
const btnsContainer = getElement('.number-buttons');

// export
export const createButtons = pages => {
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  const displayWidth = window.innerWidth;
  if (displayWidth < 768) {
    createButtonsForMobile(pages);
  } else {
    createButtonsForDesktop(pages);
  }
};

// functions
function createButtonsForMobile(pages) {
  btnsContainer.innerHTML = '';
  if (currentPage === 1) {
    prevBtn.disabled = true;
  }
  if (currentPage === pages) {
    nextBtn.disabled = true;
  }
  if (currentPage < 3) {
    createFiveBtns(3);
  } else if (currentPage >= 3 && currentPage < pages - 2) {
    createFiveBtns(currentPage);
  } else {
    createFiveBtns(pages - 2);
  }
}

function createFiveBtns(num) {
  for (let i = num - 2; i <= num + 2; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.innerText = i;
    pageBtn.classList.add('pagination__button');
    pageBtn.dataset.page = i;
    if (currentPage === i) {
      pageBtn.classList.add('active');
    }
    btnsContainer.appendChild(pageBtn);
  }
}

function createSevenBtns(num) {
  for (let i = num - 3; i <= num + 3; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.innerText = i - 1;
    pageBtn.classList.add('pagination__button');
    pageBtn.dataset.page = i - 1;
    if (currentPage === i - 1) {
      pageBtn.classList.add('active');
    }
    btnsContainer.appendChild(pageBtn);
  }
}

function createButtonsForDesktop(pages) {
  btnsContainer.innerHTML = '';
  if (currentPage === 1) {
    prevBtn.disabled = true;
  }
  if (currentPage === pages) {
    nextBtn.disabled = true;
  }
  if (currentPage < 5) {
    createSevenBtns(5);
    createDotBtn();
    createOneBtn(pages);
  } else if (currentPage >= 5 && currentPage < pages - 4) {
    createOneBtn(1);
    createDotBtn();
    createFiveBtns(currentPage);
    createDotBtn();
    createOneBtn(pages);
  } else {
    createOneBtn(1);
    createDotBtn();
    createSevenBtns(pages - 2);
  }
}

function createDotBtn() {
  const dotBtn = document.createElement('button');
  dotBtn.innerText = '...';
  dotBtn.classList.add('dot-btn');
  dotBtn.disabled = true;
  btnsContainer.appendChild(dotBtn);
}

function createOneBtn(num) {
  const btn = document.createElement('button');
  btn.innerText = `${num}`;
  btn.classList.add('pagination__button');
  btn.dataset.page = num;
  btnsContainer.appendChild(btn);
}
