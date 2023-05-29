const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const title = urlParams.get('title');

const metadataForm = document.getElementById("metadata-form");
metadataForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const description = document.getElementById("description").value;

  // Сохранение канвы в файл с названием из поля "Название"
  const fileName = `images/${title}.png`;
  saveCanvasToFile(fileName);

  // Дополнительно можно отправить данные на сервер или выполнить другие операции

  // Перенаправление обратно на главную страницу
  window.location.href = "mainPage.html";
});

function saveCanvasToFile(fileName) {
  const canvasDataUrl = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = canvasDataUrl;
  link.download = fileName;
  link.click();
}

