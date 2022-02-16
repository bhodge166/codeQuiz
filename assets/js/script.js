// button event on start button. have some show an dhide events for elemnts when click. cycling through array of questions and answers. penalty on timer. timer and update with button clicks. display and not dispalyed when click. array of questions and new questions with new answers
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
        question: "String values must be enclosed within __ when being assigned to variables.",
        answers: {
            a: "commas",
            b: "curly brackets",
            c: "quotes",
            d: "parentheses",
        },
        correct: "c",

    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            a: "JavaScript",
            b: "terminal/bash",
            c: "for loops",
            d: "console.log",
        },
        correct: "d",

    },

] 

var startButton = document.querySelector(".startButton")
var quiz = document.getElementById("quiz")
var options = document.querySelector(".options")
var timer = document.querySelector(".timer")
var paragraph = document.querySelector("p")
var 
var secondsLeft = 70
var score;


function startGame () {
    // resetGame();
    populateArray();
    showQuestion(1);
    startTimer();

    paragraph.style.display = "none"
}
var combinedQuestions = [];
    
    function populateArray() {	
        for(var i=0; i<quizQuestions.length; i++){
		
	
		var answers = [];

		for(letter in quizQuestions[i].answers){
			answers.push(
				'<label>'
					+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
					+ letter + ': '
					+ quizQuestions[i].answers[letter]
				+ '</label>'
			);
		}

		combinedQuestions.push(
			'<div class="question">' + quizQuestions[i].question + '</div>'
			+ '<div class="answers">' + answers.join('') + '</div>'
		);
	}
}
	// quiz.innerHTML = combinedQuestions.join('');

function showQuestion (questionNumber) {
    quiz.innerHTML = combinedQuestions[questionNumber-1]
}


function endGame () {

}

function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds remaining";
    
        if(secondsLeft === 0) {
          clearInterval(timerInterval);
          endGame();
        }
        if(showQuestion = 6) {
            score = secondsLeft
            clearInterval(timerInterval)
        }
    
      }, 1000);
}

startButton.addEventListener("click", startGame)


