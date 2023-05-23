var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var isDrawing = false;
var lastX = 0;
var lastY = 0;

const backButton = document.getElementById("back-button");
const history = [];

backButton.addEventListener('click', () => {
  undoLastChange();
});

canvas.addEventListener("mousedown", function(e) {
  isDrawing = true;
  lastX = e.pageX - canvas.offsetLeft;
  lastY = e.pageY - canvas.offsetTop;
});

canvas.addEventListener("mousemove", function(e) {
  if (isDrawing) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    updateDrawingSettings();
    drawLine(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }
  
});

function saveDrawingState() {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  history.push(imageData);
}

function undoLastChange() {
  if (history.length > 1) {
    history.pop();
    const previousState = history[history.length - 1];
    context.putImageData(previousState, 0, 0);
  }
}

canvas.addEventListener("mouseup", function() {
  isDrawing = false;
  saveDrawingState();
});

const clearButton = document.getElementById("clear-button");

clearButton.addEventListener('click', () => {
  clearCanvas();
});

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function updateDrawingSettings() {
  const colorPicker = document.getElementById("color-picker");
  const thicknessInput = document.getElementById("thickness-input");
  context.strokeStyle = colorPicker.value;
  context.lineWidth = thicknessInput.value;
}


function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

const logout = document.getElementById("exit");

logout.addEventListener('click', (event) => {
  localStorage.removeItem('accessToken');
  window.location.replace("./login.html");
updateDrawingSettings();

});