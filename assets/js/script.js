var quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: {
      a: "strings",
      b: "booleans",
      c: "alerts",
      d: "numbers",
    },
    correct: "c",
  },
  {
    question: "The condition in an if / else statement is enclosed within __.",
    answers: {
      a: "quotes",
      b: "curly brackets",
      c: "parentheses",
      d: "square brackets",
    },
    correct: "c",
  },
  {
    question: "Arrays in JavaScript can be used to store __.",
    answers: {
      a: "numbers and strings",
      b: "other arrays",
      c: "booleans",
      d: "all of the above",
    },
    correct: "d",
  },
  {
    question:
      "String values must be enclosed within __ when being assigned to variables.",
    answers: {
      a: "commas",
      b: "curly brackets",
      c: "quotes",
      d: "parentheses",
    },
    correct: "c",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
      a: "JavaScript",
      b: "terminal/bash",
      c: "for loops",
      d: "console.log",
    },
    correct: "d",
  },
];

var startButton = document.querySelector(".startButton");
var quiz = document.getElementById("quiz");
var options = document.querySelector(".options");
var timer = document.querySelector(".timer");
var paragraph = document.querySelector("p");
var evaluateAnswers = document.querySelector(".evaluateAnswer");
var endgame = document.querySelector(".endgameUl");
var clear = document.querySelector(".clear")
var secondsLeft = 70;
var score = 0;
var questionNumber = 0;
var savedScores = JSON.parse(localStorage.getItem("score")) || [];

function startGame() {
  populateArray();
  showQuestion(questionNumber);
  startTimer();

  paragraph.style.display = "none";
  startButton.style.display = "none";
}
var combinedQuestions = [];

function populateArray() {
  for (var i = 0; i < quizQuestions.length; i++) {
    var answers = [];

    for (letter in quizQuestions[i].answers) {
      answers.push(
        '<button type="button" class="questionbtn" + " value="' +
          letter +
          '">' +
          letter +
          ": " +
          quizQuestions[i].answers[letter] +
          "</button>"
      );
    }

    combinedQuestions.push(
      '<div class="question">' +
        quizQuestions[i].question +
        "</div>" +
        '<div class="answers">' +
        answers.join("") +
        "</div>"
    );
  }
}

function showQuestion(questionNumber) {
  quiz.innerHTML = combinedQuestions[questionNumber];
}

function showEndgame() {
  var initials = window.prompt(
    "Your Score is " + score + ". Please enter your initials."
  );
  var user = {
    initials,
    score,
  };
  savedScores.push(user);
  localStorage.setItem("score", JSON.stringify(savedScores));
  questionNumber = 0;
  secondsLeft = 70;
  startButton.textContent = "Play again?";
  startButton.style.display = "block";
  showScores();
}

function startTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = secondsLeft + " seconds remaining";

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timer.textContent = ""
      showEndgame();
    }
  }, 1000);
}

function evaluate(event) {
  if (event.target.className !== "questionbtn") {
    return;
  }
  var userChoice = event.target.value;
  var correctAnswer = quizQuestions[questionNumber].correct;
  if (userChoice === correctAnswer) {
    evaluateAnswers.textContent = "Correct";
  } else {
    evaluateAnswers.textContent = "Incorrect";
    secondsLeft -= 10;
  }
  questionNumber++;
  if (questionNumber >= quizQuestions.length) {
    quiz.innerHTML = "";
    score = secondsLeft;
    secondsLeft = 0;
    evaluateAnswers.textContent = "";
  } else {
    showQuestion(questionNumber);
  }
}

function showScores() {
  for (let i = 0; i < savedScores.length; i++) {
    var element = savedScores[i];
    var createLi = document.createElement("li");
    createLi.textContent = element.initials + " -- " + element.score;
    endgame.appendChild(createLi);
  }
}

function clearScores () {
    localStorage.clear ()
    savedScores = []
    endgame.innerHTML = ""
}

startButton.addEventListener("click", startGame);
quiz.addEventListener("click", evaluate);
clear.addEventListener("click", clearScores)
showScores();
