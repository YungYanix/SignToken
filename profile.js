// Отображение данных на странице
function displayData(data) {
  const container = document.getElementById('container');
  data = JSON.parse(data);
  // Создание элементов для каждого объекта в данных
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const name = document.createElement('h2');
    name.textContent = item.name;

    const description = document.createElement('p');
    description.textContent = item.description;

    const image = document.createElement('img');
    image.src = item.image_url;

    // Добавление элементов в карточку
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(image);

    // Добавление карточки в контейнер
    container.appendChild(card);
  });
}

// Загрузка данных из API
function loadData() {
  fetch('http://127.0.0.1:3000/api/main')
    .then(response => response.json())
    .then(data => displayData(data))
    .catch(error => console.error(error));
}

// Вызов функции загрузки данных при загрузке страницы
window.onload = loadData;
