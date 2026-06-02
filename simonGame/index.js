var gamePattern = [];
var userChosenColores = [];
var buttons = document.querySelectorAll(".btn");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var key = this.id;
    userChosenColores.push(key);
    checkAnswer(userChosenColores.length - 1);
    playSound(key);
    flashButton(this);
  });
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenColores[currentLevel]) {
    console.log("success");

    if (userChosenColores.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    document.querySelector("h1").textContent =
      "Game Over, Press Any Key to Restart";
    gameOverBackground();
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    startOver();
  }
}

function test() {
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonColours = ["red", "blue", "green", "yellow"];
  var randomChosenColour = buttonColours[randomNumber];
  var buttonSelected = document.querySelector("#" + randomChosenColour);

  gamePattern.push(randomChosenColour);
  flashButton(buttonSelected);
  playSound(randomChosenColour);
  console.log(gamePattern);
}

function flashButton(button) {
  button.classList.add("flash");

  setTimeout(function () {
    button.classList.remove("flash");
  }, 150);
}

function gameOverBackground() {
  document.querySelector("body").classList.add("game-over");

  setTimeout(function () {
    document.querySelector("body").classList.remove("game-over");
  }, 100);
}

function playSound(button) {
  var audio = new Audio("./sounds/" + button + ".mp3");
  audio.play();
}

var level = 0;
var started = false;

document.addEventListener("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userChosenColores = [];

  level++;
  document.querySelector("h1").textContent = "Level " + level;

  test();
}

function startOver() {
  level = 0;

  gamePattern = [];

  userChosenColores = [];

  started = false;
}

// test();
