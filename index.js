var yourMomCanvas = document.getElementById("yourMomCanvas");
var inputBox = document.getElementById("inputBox");
var resultsThing = document.getElementById("resultsThing");
var scoreSpan = document.getElementById("scoreSpan");

var chosenNumber = null;
var score = 0;

var images = [];
for (var i = 1; i <= 24; i++) {
  images[i] = new Image();
  images[i].src = "number_" + i + ".png";
}

inputBox.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    // enter
    setTimeout(function() {
      if (chosenNumber != null) {
        submitAnswer(parseInt(inputBox.value, 10));
      }
      next();
      update();
      inputBox.value = "";
    }, 0);
  }
});

var lastUpdateTime = null;
var timeLimit = 5000;
function update() {
  step();
  render();
  requestAnimationFrame(update);
}

function submitAnswer(answer) {
  var right = chosenNumber === answer;
  resultsThing.className = right ? "right" : "wrong";
  score += right ? 1 : -5;
  scoreSpan.innerHTML = score.toString();
}

function step() {
  if (lastUpdateTime == null) lastUpdateTime = new Date();
  if (new Date() - lastUpdateTime >= timeLimit) {
    // time up
    submitAnswer(0);
    next();
  }
}
function next() {
  lastUpdateTime = new Date();
  chosenNumber = Math.floor(Math.random() * 24) + 1;
}

function render() {
  var context = yourMomCanvas.getContext("2d");
  context.fillStyle = "#000";
  context.fillRect(0, 0, yourMomCanvas.width, yourMomCanvas.height);

  if (lastUpdateTime != null) {
    context.fillStyle = "#333";
    context.beginPath();
    context.moveTo(100, 100);
    var angle = (1 - (new Date() - lastUpdateTime)) / timeLimit * 2 * Math.PI;
    context.arc(100, 100, 100, -Math.PI/2, -angle - Math.PI/2);
    context.lineTo(100, 100);
    context.fill();
  }

  if (chosenNumber != null) {
    context.drawImage(images[chosenNumber], 200 + 100 - 61/2, 100 - 51/2, 61, 51);
  }
}
