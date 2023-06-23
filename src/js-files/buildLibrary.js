// imports
import axios from 'axios';
import {
  getIds,
  getStorageItem,
  showLoader,
  hideLoader,
} from './library/library-utils';
import { createLibraryDOM } from './library/createLibraryDOM';
import { getElement } from './library/library-utils';

const toWatch = 'toWatch';
const toQueue = 'toQueue';
const API_KEY = '53b2ac0d64cbeedea763734f4fe8a4ce';
const BASE_URL_ID = 'https://api.themoviedb.org/3/movie/';
const noMovie = getElement('.no-movie');

// https://api.themoviedb.org/3/movie/298618?api_key=53b2ac0d64cbeedea763734f4fe8a4ce

const buildsLibrary = async selectedLibrary => {
  showLoader();
  noMovie.classList.remove('is-hidden');
  try {
    let localStorageMovies = getStorageItem(selectedLibrary);
    localStorageMovies = getIds(localStorageMovies);
    const movies = await moviesDetails(localStorageMovies);
    if (movies.length !== 0) {
      noMovie.classList.add('is-hidden');
    }
    createLibraryDOM(movies);
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
};

const moviesDetails = async localStorageMovies => {
  const movieDetailsArray = [];
  await Promise.all(
    localStorageMovies.map(async movie => {
      try {
        const url = `${BASE_URL_ID}${movie}?api_key=${API_KEY}`;
        const resp = await axios.get(url);
        const data = resp.data;
        movieDetailsArray.push(data);
      } catch (err) {
        console.log(err);
      }
    })
  );
  return movieDetailsArray;
};

export const renderLibrary = async () => {
  await buildsLibrary(toWatch);
  const watchBtn = getElement('[data-whichLibrary="watched"]');
  const queueBtn = getElement('[data-whichLibrary="queue"]');
  watchBtn.addEventListener('click', async () => {
    if (queueBtn.classList.contains('active-library')) {
      queueBtn.classList.remove('active-library');
    }
    watchBtn.classList.add('active-library');
    await buildsLibrary(toWatch);
  });
  queueBtn.addEventListener('click', async () => {
    if (watchBtn.classList.contains('active-library')) {
      watchBtn.classList.remove('active-library');
    }
    queueBtn.classList.add('active-library');
    await buildsLibrary(toQueue);
  });
};

// async function fetchMovie(movie) {

// }
