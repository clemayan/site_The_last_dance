/* scroll vers le bas : la barre de navigation se cache, scrolle vers le haut : la barre de navigation s'affiche */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-22%";
  }
  prevScrollpos = currentScrollPos;
}


/*LOADER*/
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("loader-container").style.display = "none";
  }, 500);
});

/*bouton play musique de fond pages */
var mySong=document.getElementById("mySong")
var icon=document.getElementById("icon")

icon.onclick = function(){
  if (mySong.paused){
    mySong.play();
    icon.src="../images/pause.png"
  }else{
    mySong.pause();
    icon.src="../images/play.png"
  }

}


/* Barre de navigation, menu burger format mobile */
function openNav() {
  document.getElementById("mySidenav").style.width = "70%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/******* QUIZ *******/
(function() {
  "use strict";

  let questions = [
    {
      question: "Quel évènement a provoqué la première pause de MJ ?",
      answers: ["la mort de son père", "une blessure au genou", "la perte d'un match", "un malentendu avec son entraineur"],
      correctAnswer: 1
    },
    {
      question: "En quelle année Michael Jordan est entré au Hall of Fame (le panthéon du basket) ?",
      answers: ["1994","2001", "2003", "2009"],
      correctAnswer: 4
    },
    {
      question: "Avec quelle marque Michael Jordan a-t-il collaboré ?",
      answers: ["Nike", "Addidas", "Decathlon", "Puma"],
      correctAnswer: 1
    },
    {
      question: "Quel est le numéro de maillot de Michael Jordan ?",
      answers: ["03", "13", "23", "33"],
      correctAnswer: 3
    },
    {
      question: "À quelle valeur s'élève la richesse de Michael Jordan en 2019 ?",
      answers: ["910 millions de $", "1,9 milliards de $", "3,1 milliards de $", "2,8 milliards de $"],
      correctAnswer: 2
    },
    {
      question: "Quel est le nom du groupe de joueur dont fait partie Michael Jordan ?",
      answers: ["la 'Best Team'", "la 'Champions Team'", "la 'Winning Team'", "la 'Dream Team'"],
      correctAnswer: 4
    },
    {
      question: "En quelle année Michael Jordan fera son dernier match ?",
      answers: ["2003", "2006", "2009", "2012"],
      correctAnswer: 1
    }
  ];

  let questionIndex,
    currentQuestion,
    score,
    timeSpent,
    quizTimer,
    questionIsAnswered,
    isQuizDone;
  let quiz = document.getElementById("quiz");

  function initQuiz() {
    quiz.classList.remove("quiz-intro");
    quiz.classList.add("quiz-started");

    questionIndex = 0;
    currentQuestion = 1;
    questionIsAnswered = 0;
    score = 0;
    timeSpent = "00:00";

    quiz.innerHTML = `<div id="progress-container"><span id="progress"></span></div>
    <div id="stats">
    <p>Question : <span id="questionNumber">${currentQuestion}/${
      questions.length
    }</span></p>
    <p>Score : <span id="score">${score}</span></p>
    <p>Temps : <span id="timer">00:00</span></p>
    </div>
    <section id="answers"></section>`;

    displayQuestion();
    startTimer();
  }

  function displayQuestion() {
    let question = questions[questionIndex];
    let answers = document.getElementById("answers");
    let answerNumber = 0;
    let output = `<h2 class="text-center bold">${currentQuestion}. ${
      question.question
    }</h2>`;

    for (let i in question.answers) {
      answerNumber++;
      output += `<div class="answer">
      <input type="radio" id="answer-${answerNumber}" name="answers" value="${answerNumber}">
      <label for="answer-${answerNumber}">
      <span class="answer-number">${answerNumber}.</span> ${question.answers[i]}
      </label>
      </div>`;
    }

    answers.innerHTML = output;
  }

  function startTimer() {
    let s = 0;
    let m = 0;
    let h = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let timer = document.getElementById("timer");

    quizTimer = setInterval(function() {
      s++;

      if (s > 59) {
        s = 0;
        m++;
        seconds = "0" + s;
      }

      if (m > 59) {
        m = 0;
        h++;
        minutes = "00";
      }

      seconds = s > 9 ? s : "0" + s;
      minutes = m > 9 ? m : "0" + m;
      hours = h > 9 ? h : "0" + h;

      timeSpent = h
        ? hours + ":" + minutes + ":" + seconds
        : minutes + ":" + seconds;
      timer.textContent = timeSpent;
    }, 1000);
  }

  function displayResults() {
    let notification = document.getElementById("notification");
    notification.parentElement.removeChild(notification);
    quizTimer = null;
    isQuizDone = 1;

    let pageURL = window.location.href;

    quiz.innerHTML = `<section id="results" class="text-center">
    <h2 class="bold">Voici votre score :</h2>
    <p id="percentage">${scorePercentage()}%</p>
    <p>Vous avez eu <span class="bold">${score}</span> bonne(s) réponse(s) sur <span class="bold">${
      questions.length
    }</span> questions.</p>
    <p style="margin-top: 10px;">Temps écoulé: <span class="bold">${timeSpent}</span></p>

    <button type="button" id="start-over-btn" class="btn blue-btn">Recommencer</button>
    </section>`;
  }

  function goToNextQuestion() {
    currentQuestion++;
    questionIndex++;
    questionIsAnswered = 0;

    let notification = document.getElementById("notification");
    notification.parentElement.removeChild(notification);

    let questionNumber = document.getElementById("questionNumber");
    questionNumber.textContent = `${currentQuestion}/${questions.length}`;

    displayQuestion();
  }

  function submitAnswer(e) {
    let selectedAnswer = Number(e.target.value);
    let rightAnswer = questions[questionIndex].correctAnswer;
    let answers = document.getElementsByName("answers");
    let progress = document.getElementById("progress");

    questionIsAnswered = 1;

    progress.style.width = progressPercentage() + "%";

    let notification = document.createElement("div");
    let message = document.createElement("p");
    let label = e.target.nextElementSibling;
    notification.id = "notification";

    if (selectedAnswer === rightAnswer) {
      score++;
      message.textContent = "Bonne réponse :)";
      label.classList.add("green-bg");
    } else {
      message.textContent = "Mauvaise réponse :(";
      label.classList.add("red-bg");

      answers.forEach(answer => {
        if (Number(answer.value) !== rightAnswer) return;

        answer.nextElementSibling.classList.add("green-bg");
      });
    }

    let button = document.createElement("button");
    button.classList.add("blue-btn");

    if (isLastQuestion()) {
      button.id = "show-results-btn";
      button.textContent = "Afficher les résultats";
      clearInterval(quizTimer);
      quizTimer = null;
    } else {
      button.id = "next-btn";
      button.textContent = "Suivant";
    }

    notification.appendChild(message);
    notification.appendChild(button);
    quiz.insertAdjacentElement("afterend", notification);

    button.focus();

    answers.forEach(answer => (answer.disabled = "disabled"));

    document.getElementById("score").textContent = score;
  }

  let scorePercentage = () => (score / questions.length * 100).toFixed(0);
  let progressPercentage = () =>
    (currentQuestion / questions.length * 100).toFixed(0);
  let isLastQuestion = () => currentQuestion === questions.length;

  function spaceBarHandler() {
    if (document.querySelector(".quiz-intro")) {
      initQuiz();
    }

    if (questionIsAnswered && quizTimer) {
      goToNextQuestion();
    }

    if (!quizTimer && !isQuizDone) {
      displayResults();
      console.log("last");
    }
  }

  function numericKeyHandler(e) {
    let answers = document.getElementsByName("answers");

    answers.forEach(answer => {
      if (answer.value === e.key) {
        if (questionIsAnswered) return;

        answer.checked = "checked";

        let event = new Event("change");
        answer.dispatchEvent(event);
        submitAnswer(event);

        questionIsAnswered = 1;
      }
    });
  }

  document.addEventListener("click", function(e) {
    if (
      e.target.matches("#start-quiz-btn") ||
      e.target.matches("#start-over-btn")
    )
      initQuiz();
    if (e.target.matches("#next-btn")) goToNextQuestion();
    if (e.target.matches("#show-results-btn")) displayResults();
  });

  document.addEventListener("change", function(e) {
    if (e.target.matches('input[type="radio"]')) submitAnswer(e);
  });

  document.addEventListener("keyup", function(e) {
    if (e.keyCode === 32) spaceBarHandler(); // init quiz / go to next question
    if (e.keyCode >= 48 && e.keyCode <= 57) numericKeyHandler(e); // choose an answer
  });

  document
    .getElementById("shortcuts-info-btn")
    .addEventListener("click", function() {
      let info = document.querySelector(".shortcuts-info");
      info.classList.toggle("display-block");
    });
})();

/******* Fin quiz *******/