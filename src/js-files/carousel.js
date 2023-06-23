import { API_KEY, BASE_URL } from './utils';
import { showWarning } from './loader';

export const fetchPopularMovies = async () => {
  try {
    const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`;
    const resp = await fetch(url);
    const data = await resp.json();
    const movies = data.results;
    displayMovies(movies);
    startCarousel();
  } catch (err) {
    console.log(err);
    showWarning();
  }
};

const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const cardHolder = document.querySelector('.swiper__wrapper');
const slideWidth = 200;
let currentPosition = 0;

const displayMovies = movies => {
  cardHolder.innerHTML = '';

  movies.forEach((movie, index) => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('swiper__slide');
    movieItem.dataset.index = index;

    const image = document.createElement('img');
    image.classList.add('swiper__image');
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    image.alt = movie.title;

    movieItem.appendChild(image);
    cardHolder.appendChild(movieItem);
  });
};

const startCarousel = () => {
  const totalSlides = cardHolder.children.length;
  const visibleSlides = Math.floor(cardHolder.offsetWidth / slideWidth);
  const maxPosition = totalSlides - visibleSlides;

  prevButton.addEventListener('click', () => {
    currentPosition = (currentPosition - 1 + totalSlides) % totalSlides;
    slideCardHolder();
  });

  nextButton.addEventListener('click', () => {
    currentPosition = (currentPosition + 1) % totalSlides;
    slideCardHolder();
  });

  const slideCardHolder = () => {
    const translateX = -currentPosition * slideWidth;
    cardHolder.style.transition = 'transform 0.5s';
    cardHolder.style.transform = `translateX(${translateX}px)`;

    if (currentPosition === maxPosition) {
      setTimeout(() => {
        cardHolder.style.transition = 'none';
        currentPosition = 0;
        cardHolder.style.transform = `translateX(0)`;
      }, 500);
    }
  };
  const slideItems = cardHolder.querySelectorAll('.swiper__slide');
  slideItems.forEach(slide => {
    slide.addEventListener('mouseover', () => {
      slide.querySelector('.swiper__image').style.transform = 'scale(1.1)';
    });

    slide.addEventListener('mouseout', () => {
      slide.querySelector('.swiper__image').style.transform = 'scale(1)';
    });
  });

  setInterval(() => {
    currentPosition = (currentPosition + 1) % totalSlides;
    slideCardHolder();
  }, 3000);
};
