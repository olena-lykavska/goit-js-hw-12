import SimpleLightbox from 'simplelightbox'; // Імпортуємо бібліотеку SimpleLightbox для модального перегляду зображень
import 'simplelightbox/dist/simple-lightbox.min.css'; // Імпортуємо стилі для SimpleLightbox

let lightbox; // Глобальна змінна для збереження екземпляра SimpleLightbox

// Функція створення розмітки для галереї
export function createGalleryMarkup(images) {
  // Перетворюємо масив зображень у HTML-розмітку
  return images
    .map(
      ({ webformatURL, largeImageURL, tags }) => `
    <a class="gallery__item" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
  `
    )
    .join(''); // Об'єднуємо всі елементи в єдиний рядок
}

// Функція для додавання розмітки до контейнера галереї
export function renderGallery(container, markup) {
  container.insertAdjacentHTML('beforeend', markup); // Додаємо нові елементи до DOM
  if (!lightbox) {
    // Ініціалізуємо SimpleLightbox, якщо він ще не існує
    lightbox = new SimpleLightbox('.gallery__item', { captionsData: 'alt', captionDelay: 250 });
  } else {
    // Оновлюємо SimpleLightbox, якщо він вже існує
    lightbox.refresh();
  }
}

// Функція для очищення галереї
export function clearGallery(container) {
  container.innerHTML = ''; // Видаляємо весь вміст контейнера
}
