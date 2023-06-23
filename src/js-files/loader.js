import Notiflix from 'notiflix';

export function showLoader() {
  Notiflix.Loading.standard('Loading...');
}
export function hideLoader() {
  Notiflix.Loading.remove();
}

export function showNotification() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong. Please try again later.'
  );
}

export function showWarning() {
  Notiflix.Notify.warning('Oops! Something went wrong, but life goes on');
}
