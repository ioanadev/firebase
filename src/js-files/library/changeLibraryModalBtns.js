import { getStorageItem, getElement, getIds } from './library-utils';

const toWatch = 'toWatch';
const toQueue = 'toQueue';
const modal = getElement('.library-film_info_modal .modal');
const gallery = getElement('.library-gallery');

const adjunstWatchBtns = (watchStorage, watchBtn, id) => {
  const watchedIds = getIds(watchStorage);
  if (watchBtn.dataset.action === 'toWatch') {
    if (watchedIds.includes(id)) {
      watchBtn.textContent = 'REMOVE FROM WATCHED';
      watchBtn.dataset.action = 'toWatchRmv';
    }
  }
  if (watchBtn.dataset.action === 'toWatchRmv') {
    if (!watchedIds.includes(id)) {
      watchBtn.textContent = 'TO WATCHED';
      watchBtn.dataset.action = 'toWatch';
    }
  }
};

const adjunstQueueBtns = (queueStorage, queueBtn, id) => {
  const watchedIds = getIds(queueStorage);
  if (queueBtn.dataset.action === 'toQueue') {
    if (watchedIds.includes(id)) {
      queueBtn.textContent = 'REMOVE FROM QUEUE';
      queueBtn.dataset.action = 'toQueueRmv';
    }
  }
  if (queueBtn.dataset.action === 'toQueueRmv') {
    if (!watchedIds.includes(id)) {
      queueBtn.textContent = 'ADD TO QUEUE';
      queueBtn.dataset.action = 'toQueue';
    }
  }
};

const galleryClick = e => {
  const card = e.target.parentNode;
  const watchBtn = modal.querySelector('.watch');
  const queueBtn = modal.querySelector('.queue');
  const id = card.dataset.id;
  const toWatchList = getStorageItem(toWatch);
  const toQueueList = getStorageItem(toQueue);
  adjunstWatchBtns(toWatchList, watchBtn, id);
  adjunstQueueBtns(toQueueList, queueBtn, id);
};

export const handleLibraryModalBtns = () => {
  gallery.addEventListener('click', galleryClick);
};
