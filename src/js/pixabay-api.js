import axios from 'axios'; // Імпортуємо бібліотеку axios для зручної роботи з HTTP-запитами

// Основні параметри Pixabay API
const BASE_URL = 'https://pixabay.com/api/'; // Базова URL-адреса API
const API_KEY = '47732907-b8d033787a8c1460109d1a6df'; // Ключ доступу до Pixabay API

// Функція для отримання зображень
export async function fetchImages(query, page = 1, perPage = 15) {
  // Параметри запиту до API
  const params = {
    key: API_KEY, // Ключ API
    q: query, // Ключове слово для пошуку
    image_type: 'photo', // Тип зображення (фото)
    orientation: 'horizontal', // Орієнтація зображення (горизонтальна)
    safesearch: true, // Увімкнення безпечного пошуку
    page, // Номер сторінки результатів
    per_page: perPage, // Кількість зображень на сторінку
  };

  try {
    // Виконуємо запит і повертаємо отримані дані
    const response = await axios.get(BASE_URL, { params });
    return response.data; // Повертаємо об'єкт із результатами
  } catch (error) {
    // Обробляємо помилки запиту
    console.error('Помилка запиту до Pixabay API:', error);
    throw error; // Повторно кидаємо помилку, щоб обробити її в основному коді
  }
}
