import getElement from './getElement';

export const setupGallery = (data, movieTypes, moviesGallery) => {
  moviesGallery.innerHTML = '';
  const galleryContent = data
    .map(movie => {
      let {
        genre_ids: movieType,
        title: name,
        name: nameAlternativ,
        poster_path: movieImg,
        release_date: releaseDate,
        id,
      } = movie;
      movieType = displaMovieType(movieType, movieTypes);
      releaseDate = getRealeaseDate(releaseDate);
      name = name ? name : nameAlternativ;
      movieImg = movieImg
        ? `https://image.tmdb.org/t/p/w500${movieImg}`
        : `../images/no-signal-img.jpg`;
      return `<div class="photo-card" data-id="${id}" >
      <div
        class="modal-info"
        data-vote-avg="${movie.vote_average}"
        data-vote-count="${movie.vote_count}"
        data-popularity="${movie.popularity}"
        data-about="${movie.overview}"
        data_original_title="${movie.original_title}"
        >
      </div>
    <img src="${movieImg}" class="image" alt="${name}" />
  <div class="container-info">
    <b class="title">${name}</b>
    <div class="cont-descr">
      <p class="descr-item">${movieType}</p>
      <p class="descr-item">|</p>
      <p class="descr-item">${releaseDate}</p>
    </div>
  </div>
</div>`;
    })
    .join('');
  moviesGallery.innerHTML = galleryContent;
};

function getRealeaseDate(realeaseDate) {
  const year = realeaseDate ? realeaseDate.split('-')[0] : 'Unknown';
  return year;
}

function displaMovieType(genreArray, movieTypes) {
  let types = '';
  movieTypes.forEach(type => {
    if (genreArray.includes(type.id)) {
      types = types + type.name + ', ';
    }
  });
  types = types ? types.slice(0, -2) : 'Unknown';
  return types;
}
