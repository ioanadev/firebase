import { getElement } from './library-utils';
import { getStorageItem, getIds } from './library-utils';

const toWatch = 'toWatch';
const toQueue = 'toQueue';
const libraryModal = getElement('.library-film_info_modal .modal');
const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export const libraryLocalStorageHandle = () => {
  libraryModal.addEventListener('click', e => {
    const clickedElement = e.target;
    const id = e.currentTarget.dataset.movieId;
    let watchStorage = getStorageItem(toWatch);
    let queueStorage = getStorageItem(toQueue);
    const watchIds = getIds(watchStorage);
    const queueIds = getIds(queueStorage);
    const movie = { id: id };
    if (clickedElement.dataset.action === 'toWatch') {
      if (!watchIds.includes(id)) {
        watchStorage.push(movie);
        setStorageItem(toWatch, watchStorage);
        clickedElement.textContent = 'REMOVE FROM WATCHED';
        clickedElement.dataset.action = 'toWatchRmv';
      }
    } else if (clickedElement.dataset.action === 'toQueue') {
      if (!queueIds.includes(id)) {
        queueStorage.push(movie);
        setStorageItem(toQueue, queueStorage);
        clickedElement.textContent = 'REMOVE FROM QUEUE';
        clickedElement.dataset.action = 'toQueueRmv';
      }
    } else if (clickedElement.dataset.action === 'toWatchRmv') {
      watchStorage = watchStorage.filter(movie => movie.id !== id);
      setStorageItem(toWatch, watchStorage);
      clickedElement.textContent = 'TO WATCHED';
      clickedElement.dataset.action = 'toWatch';
    } else if (clickedElement.dataset.action === 'toQueueRmv') {
      queueStorage = queueStorage.filter(movie => movie.id !== id);
      setStorageItem(toQueue, queueStorage);
      clickedElement.textContent = 'ADD TO QUEUE';
      clickedElement.dataset.action = 'toQueue';
    }
  });
};
