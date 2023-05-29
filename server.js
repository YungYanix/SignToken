const express = require('express');
const fs = require('fs');
const app = express();

// Настройка папки для сохранения файлов
const uploadFolder = '/images';

// Создание маршрута для сохранения файла
app.post('/upload', (req, res) => {
  const base64Data = req.body.canvasDataUrl.replace(/^data:image\/png;base64,/, '');
  const fileName = req.body.fileName;

  // Создание папки, если она не существует
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }

  // Путь к файлу
  const filePath = `${uploadFolder}/${fileName}.png`;

  // Запись файла
  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Не удалось сохранить файл.' });
    } else {
      res.json({ message: 'Файл успешно сохранен.' });
    }
  });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
