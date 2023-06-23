// imports
import { getElement } from './library-utils';

// vars
const modal = getElement('.library-film_info_modal');
const modalImageContainer = getElement('.img_content');
const modalVotes = getElement('.film-detail_votes');
const modalFilmName = getElement('.film_title');
const modalFilmPopularity = getElement('.film-detail_popularity');
const modalOriginaFilmTitle = getElement('.film-detail_original-title');
const modalFilmGenre = getElement('.film-detail_genre');
const modalFilmDescription = getElement('.film-detail_description');
const closeModal = getElement('#close-button');
const gallery = getElement('.library-gallery');

export const libraryModal = () => {
  gallery.addEventListener('click', e => {
    const element = e.target.parentNode;

    //average work
    const elementInfo = element.querySelector('.modal-info');
    const voteCount = elementInfo.getAttribute('data-vote-count');
    const average = elementInfo.getAttribute('data-vote-avg');
    modalVotes.innerHTML = `Vote / Votes: ${average} / ${voteCount}`;
    // add movie id to the modal
    const modalContainer = getElement('.modal');
    const movieId = element.dataset.id;
    modalContainer.dataset.movieId = movieId;
    //image work
    const movieImage = element.querySelector('img');
    const imageLink = movieImage.getAttribute('src');
    modalImageContainer.innerHTML = `<img src="${imageLink}">`;
    //film title
    const containerInfoTitle = element.querySelector('.container-info b');
    const filmName = containerInfoTitle.textContent;
    modalFilmName.innerHTML = ` ${filmName} `;
    //film popularity
    const filmPopularity = elementInfo.getAttribute('data-popularity');
    modalFilmPopularity.innerHTML = `Popularity: ${filmPopularity} `;
    //film original title
    const filmOriginalName = elementInfo.getAttribute('data_original_title');
    const originalTitle =
      filmOriginalName === 'undefined' ? filmName : filmOriginalName;
    modalOriginaFilmTitle.innerHTML = `Original-title: ${originalTitle} `;
    //film genre
    const containerInfo = element.querySelector('.container-info');
    const description = containerInfo.querySelector('.cont-descr');
    const genre = description.querySelector('p').textContent;
    modalFilmGenre.innerHTML = `Genre: ${genre}`;
    //about film
    const filmDescription = elementInfo.getAttribute('data-about');
    modalFilmDescription.innerHTML += ` ${filmDescription} `;
    modal.showModal();
  });
};

closeModal.addEventListener('click', () => {
  clearModalOnClose();
  modal.close();
});
function clearModalOnClose() {
  const modalDataElements = modal.querySelectorAll('[class*="film-detail"]');
  modalDataElements.forEach(element => {
    element.innerHTML = '';
  });
}
