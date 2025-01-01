import { fetchImages } from './js/pixabay-api.js'; // Імпортуємо функцію для запитів до API
import { createGalleryMarkup, renderGallery, clearGallery } from './js/render-functions.js'; // Імпортуємо функції для роботи з DOM

// Знаходимо основні елементи DOM
const form = document.querySelector('.search-form'); // Форма для пошуку
const gallery = document.querySelector('.gallery'); // Контейнер для галереї
const loadMoreBtn = document.querySelector('.load-more'); // Кнопка "Load More"
const endMessage = document.querySelector('.end-message'); // Повідомлення про кінець результатів
const loader = document.querySelector('.loader'); // Лоадер

// Початкові значення змінних
let query = ''; // Змінна для збереження пошукового запиту
let page = 1; // Початковий номер сторінки
const perPage = 15; // Кількість зображень на одну сторінку

// Ховаємо кнопки і повідомлення на старті
loadMoreBtn.style.display = 'none';
endMessage.style.display = 'none';
loader.style.display = 'none'; // Лоадер спочатку прихований

// Функція для показу лоадера
function showLoader() {
  loader.style.display = 'block';
}

// Функція для приховування лоадера
function hideLoader() {
  loader.style.display = 'none';
}

// Обробник події для відправки форми
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки

  query = event.target.elements.searchQuery.value.trim(); // Отримуємо значення поля пошуку

  if (!query) return; // Якщо поле пусте, нічого не робимо

  page = 1; // Скидаємо номер сторінки
  clearGallery(gallery); // Очищаємо попередні результати
  loadMoreBtn.style.display = 'none'; // Ховаємо кнопку "Load More"
  endMessage.style.display = 'none'; // Ховаємо повідомлення

  try {
    showLoader(); // Показуємо лоадер
    // Виконуємо запит до API
    const data = await fetchImages(query, page, perPage);

    if (data.hits.length === 0) {
      // Якщо результатів немає, показуємо сповіщення
      alert('За вашим запитом нічого не знайдено. Спробуйте ще раз.');
      return;
    }

    // Створюємо розмітку і додаємо її до галереї
    const markup = createGalleryMarkup(data.hits);
    renderGallery(gallery, markup);

    // Якщо є ще сторінки, показуємо кнопку "Load More"
    if (data.totalHits > perPage) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    // Обробка помилок
    console.error(error);
    alert('Щось пішло не так. Спробуйте пізніше.');
  } finally {
    hideLoader(); // Ховаємо лоадер
  }
});

// Обробник події для кнопки "Load More"
loadMoreBtn.addEventListener('click', async () => {
  page += 1; // Збільшуємо номер сторінки

  try {
    showLoader(); // Показуємо лоадер
    // Виконуємо запит до API для нових сторінок
    const data = await fetchImages(query, page, perPage);

    // Створюємо розмітку і додаємо її до галереї
    const markup = createGalleryMarkup(data.hits);
    renderGallery(gallery, markup);

    // Перевіряємо, чи досягнуто кінця результатів
    if (page * perPage >= data.totalHits) {
      loadMoreBtn.style.display = 'none'; // Ховаємо кнопку "Load More"
      endMessage.style.display = 'block'; // Показуємо повідомлення
    }

    // Плавне прокручування сторінки вниз
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect(); // Отримуємо висоту першої карточки
    window.scrollBy({
      top: cardHeight * 2, // Прокручуємо на дві висоти карточки
      behavior: 'smooth', // Задаємо плавну анімацію
    });
  } catch (error) {
    // Обробка помилок
    console.error(error);
    alert('Щось пішло не так. Спробуйте пізніше.');
  } finally {
    hideLoader(); // Ховаємо лоадер
  }
});
