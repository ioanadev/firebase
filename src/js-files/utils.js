export const API_KEY = '53b2ac0d64cbeedea763734f4fe8a4ce';
export let currentPage = 1;
export const BASE_URL = 'https://api.themoviedb.org/3';

// https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=53b2ac0d64cbeedea763734f4fe8a4ce
// https://api.themoviedb.org/3/genre/movie/list?api_key=53b2ac0d64cbeedea763734f4fe8a4ce
// location.href = location.href;

import getElement from './getElement';
import { fetchAllMovies } from './fetchMovies';

// exports
export const handlePagination = () => {
  const btnsContainer = getElement('.pagination');
  btnsContainer.addEventListener('click', goToPage);
};
// functions

function goToPage(e) {
  const btn = e.target;
  if (btn.dataset.page) {
    let pageNum = btn.dataset.page;
    pageNum = Number(pageNum);
    currentPage = pageNum;
    fetchAllMovies();
  }
  if (btn.dataset.prev) {
    currentPage = currentPage - 1;
    fetchAllMovies();
  }
  if (btn.dataset.next) {
    currentPage = currentPage + 1;
    fetchAllMovies();
  }
}
