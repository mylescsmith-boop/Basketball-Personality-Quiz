const questions = document.querySelectorAll(".question-block");
const resultButton = document.querySelector("#show-results");
const resultContainer = document.querySelector("#result-container");
const resultText = document.querySelector("#result-text");
const message = document.querySelector("#quiz-message");
const tryAgainButton = document.querySelector("#try-again");

const answers = {};

const results = {
  leader: {
    title: "The Leader",
    description: "You bring energy, confidence, and encouragement to your team. You help your teammates stay focused and bring everyone together."
  },
  shooter: {
    title: "The Shooter",
    description: "You love putting points on the board. You are confident taking shots and enjoy being ready for the big moment."
  },
  playmaker: {
    title: "The Playmaker",
    description: "You make your teammates better. You see the floor, make smart decisions, and know how to create chances for others."
  },
  worker: {
    title: "The Hard Worker",
    description: "You bring effort every time you step on the court. Defense, hustle, and doing the little things are what make you valuable."
  }
};

// Save the answer selected for each question.
questions.forEach((question, index) => {
  const buttons = question.querySelectorAll(".answer-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      answers[index] = button.dataset.type;

      buttons.forEach((choice) => choice.classList.remove("selected"));
      button.classList.add("selected");

      message.textContent = `You answered ${Object.keys(answers).length} of ${questions.length} questions.`;
    });
  });
});

// Count the answers and show the personality with the highest score.
resultButton.addEventListener("click", () => {
  if (Object.keys(answers).length !== questions.length) {
    message.textContent = "Please answer all five questions before viewing your result.";
    return;
  }

  const scores = {
    leader: 0,
    shooter: 0,
    playmaker: 0,
    worker: 0
  };

  Object.values(answers).forEach((answer) => {
    scores[answer] += 1;
  });

  const winningType = Object.keys(scores).reduce((best, current) =>
    scores[current] > scores[best] ? current : best
  );

  resultText.innerHTML = `<strong>${results[winningType].title}</strong><br>${results[winningType].description}`;
  resultContainer.hidden = false;
  resultContainer.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Reset the quiz so it can be taken again.
tryAgainButton.addEventListener("click", () => {
  Object.keys(answers).forEach((key) => delete answers[key]);

  questions.forEach((question) => {
    question.querySelectorAll(".answer-btn").forEach((button) => {
      button.classList.remove("selected");
    });
  });

  resultContainer.hidden = true;
  message.textContent = "Choose one answer for each question.";
  document.querySelector("#quiz-form").scrollIntoView({ behavior: "smooth" });
});