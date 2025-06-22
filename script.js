
function chooseClass(className) {
    localStorage.setItem('class', className);
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quest-screen').style.display = 'block';
    document.getElementById('chosen-class').innerText = className;
}

function checkAnswer(button, isCorrect) {
    button.classList.remove("correct", "incorrect");
    if (isCorrect) {
        button.classList.add("correct");
    } else {
        button.classList.add("incorrect");
    }
}

function nextQuest() {
    alert("Next quest coming soon!");
}

window.onload = function () {
    const savedClass = localStorage.getItem('class');
    if (savedClass) {
        chooseClass(savedClass);
    }
};
