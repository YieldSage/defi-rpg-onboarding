
let correctAnswers = {1: false, 2: false};

function startGame(className) {
  document.querySelector('#game-container > p').innerText = `Chosen Class: ${className}`;
  document.getElementById("quest").style.display = "block";
}

function checkAnswer(qNum, el, correct=false) {
  if (correct) {
    correctAnswers[qNum] = true;
    el.style.backgroundColor = "#28a745";
  } else {
    el.style.backgroundColor = "#dc3545";
  }
  if (correctAnswers[1] && correctAnswers[2]) {
    document.getElementById("complete-section").style.display = "block";
  }
}

function nextQuest() {
  alert("Next quest coming soon...");
}
