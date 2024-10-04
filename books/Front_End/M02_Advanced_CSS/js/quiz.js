// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 36;
let timer;
let score = 0;

// Example questions array
let questions = [
  {
    question: "Which value of the position property will make an element stay in the same place when scrolling?",
    options: ["A)static", 
              "B)absolute", 
              "C)fixed"],
    answer: "C)fixed",
  },
  {
    question: "Which of the following is a valid media query for screens larger than 768px?",
    options: ["A)@media (max-width: 768px)",
              "B)@media (min-width: 768px)",
              "C)@media (screen-width: 768px)"
            ],
    answer: "B)@media (min-width: 768px)",
  },
  {
    question: "What is the primary purpose of wireframing in web design?",
    options: [
      "A) Creating a detailed design for the final website",
      "B)Defining the structure and layout of a webpage without focusing on design elements",
      "C)Writing CSS code for the design of a webpage",
    ],
    answer: "B) Defining the structure and layout of a webpage without focusing on design elements",
  },
  {
    question: "What does the justify-content property in a flexbox do?",
    options: [
      "A)Aligns items horizontally",
      "B)Aligns items vertically",
      "C)Controls the space distribution between items",
    ],
    answer: "C)Controls the space distribution between items",
  },
  {
    question: "What is the purpose of a CSS pseudo-class?",
    options: [
      "A)To add special effects to an element",
      "B)To style an element based on its state or interaction (like :hover or :active)",
      "C)To define variables in CSS",
    ],
    answer: "B)To style an element based on its state or interaction (like :hover or :active)",
  },
  {
    question: "What does the align-items property control in a flexbox layout?",
    options: [
      "A)Horizontal alignment of items",
      "B)Vertical alignment of items",
      "C)Spacing between items",
    ],
    answer: " B) Vertical alignment of items",
  },
  {
    question: "Which pseudo-class would you use to style an input field when it is in focus?",
    options: [
      "A):hover",
      "B):focus",
      "C):checked",
    ],
    answer: "B):focus",
  },
  {
    question: "Which of the following is a valid use of the CSS flex-direction property?",
    options: [
      "A)flex-flow: row",
      "B)flex-direction: column-reverse",
      "C)flex-direction: grid",
    ],
    answer: " B)flex-direction: column-reverse",
  },
  {
    question: "Which CSS property is used to define the gap between rows in a grid layout?",
    options: [
      "A)row-gap",
      "B)grid-gap",
      "C)line-gap",
    ],
    answer: "A)row-gap",
  },
  {
    question: "What does the :first-of-type pseudo-class do?",
    options: [
      "A)Targets the first element of any type in the document",
      "B)Targets the first child element of a specific type within its parent",
      "C)Selects the first element of a certain type regardless of its parent",
    ],
    answer: "B)Targets the first child element of a specific type within its parent",
  },
];

// Function to start the quiz
function startQuiz() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter your name.");
    return;
  }

  // Hide the start screen and show the quiz screen
  document.getElementById("start-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  // Shuffle the questions to randomize the quiz
  questions = shuffleArray(questions);

  // Display the first question
  displayQuestion();

  // Start the timer
  startTimer();
}

// Function to display a question and its options
function displayQuestion() {
  const questionContainer = document.getElementById("question");

  // Get the current question and its options
  const questionText = questions[currentQuestion].question;
  const options = questions[currentQuestion].options;

  // Create the HTML for the question and options
  const questionHtml = `
        <div class="question-number">Question ${currentQuestion + 1}:</div>
        <div class="question-text">${questionText}</div>
        <div class="options">
            ${options.map((option) => createOption(option)).join("")}
        </div>
    `;

  // Set the HTML inside the question container
  questionContainer.innerHTML = questionHtml;

  // Show the "Next" button after the question is displayed
  document.getElementById("next-question").style.display = "block";
}

// Function to create the HTML for an option
function createOption(option) {
  return `
        <div class="option">
            <input type="radio" name="answer" value="${option}"> ${option}
        </div>`;
}

// Function to start the countdown timer
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
    } else {
      clearInterval(timer);
      document.getElementById("time").textContent = "Time's up!";
      disableOptions();
      setTimeout(nextQuestion, 2000);
    }
  }, 1000);
}

// Function to check the selected answer
function checkAnswer() {
  clearInterval(timer); // Stop the timer
  const selectedAnswer = document.querySelector('input[name="answer"]:checked'); //option was already created, but added checked there for this answer
  const feedback = document.getElementById("feedback");

  if (!selectedAnswer) {
    feedback.textContent = "Please select an answer!";
    return;
  }

  const answer = selectedAnswer.value;
  if (answer === questions[currentQuestion].answer) {
    score++;
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = `Incorrect. The correct answer is ${questions[currentQuestion].answer}.`;
  }

  disableOptions();
  setTimeout(nextQuestion, 1000); // Move to the next question after a short delay
}

// Function to disable all options (used after the answer is selected or time runs out)
function disableOptions() {
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.disabled = true;
  });
}

// Function to move to the next question
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    timeLeft = 36; // Reset the timer
    displayQuestion(); // Show the next question
    startTimer(); // Start the timer again
    document.getElementById("feedback").textContent = "";
  } else {
    showResult(); // Show the result if the quiz is finished
  }
}

// Function to show the final result
function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  const username = document.getElementById("username").value;
  const percentage = (score / questions.length) * 100;

  let resultText;
  if (percentage >= 50) {
    resultText = `<span class="pass">You Pass!</span>`;
  } else {
    resultText = `<span class="fail">You Fail!</span>`;
  }

  document.getElementById("result").innerHTML = `
        ${username}, you scored ${score} out of ${questions.length}!<br>${resultText}`;
}

// Function to restart the quiz
function testAgain() {
  currentQuestion = 0;
  timeLeft = 36;
  score = 0;
  questions = shuffleArray(questions);

  document.getElementById("result-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  displayQuestion();
  startTimer();
}

// Function to shuffle an array (used to randomize questions and options)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}