const store = {
  questions: [{
    id: 1,
    question: 'Who is the main character in Star Wars Jedi: Fallen Order? ',
    choices: ['Luke Skywalker', 'Galen Marek', 'Cal Kestis', 'Obi-Wan Kenobi'],
    correctAnswer: 'Cal Kestis',
    image: 'images/fallen-order.jpg',
  },
  {
    id: 2,
    question: "What race are the guards at Jabba's palace?",
    choices: ['Gungan', 'Gamorrean', 'Mandalorian', 'Jawa'],
    correctAnswer: 'Gamorrean',
    image: 'images/gamorrean.jpeg',
  },
  {
    id: 3,
    question: 'Who was the Sith Lord before Darth Sidious?',
    choices: ['Darth Vader', 'Darth Revan', 'Darth Bane', 'Darth Plagueis'],
    correctAnswer: 'Darth Plagueis',
    image: 'images/sith-lord.jpg',
  },
  {
    id: 4,
    question: 'How many pods are in the Galactic Senate?',
    choices: ['248', '512', '1024', '1524'],
    correctAnswer: '1024',
    image: 'images/galactic-senate.png',
  },
  {
    id: 5,
    question: 'What is the appropriate response to someone saying "Hello there"?',
    choices: ["General Kenobi!", "Help me Obi-Wan Kenobi, you're my only hope.", "I hate you!", "These aren't the droids you're looking for."],
    correctAnswer: "General Kenobi!",
    image: 'images/hello.png'
  }],
  score: 0,
  questionNumber: 0,
  quizStarted: false,
  feedback: false,
}


const message = [
  'You are Bantha Fodder',
  'You are a Jedi Youngling',
  'You are a Jedi Padawan',
  'You are a Jedi Knight',
  'You are a Jedi Master',
  'You are a Jedi Grand Master'
]


function generateStartScreen() {
  return (`<div class="box">
  <section class="banner">
    <h1>STAR WARS QUIZ</h1>
  </section>
  <section class='primary title' style="background-image: url('images/title.jpeg')">
    <button class='start'>
      Start The Quiz!
    </button>
  </section>
</div>`
);
}

function generateQuestionScreen() {
  return (`<div class="box">
  <section class="banner">
    <h1>STAR WARS QUIZ</h1>
  </section>
   <div class='primary'>
     <img src=${store.questions[store.questionNumber].image} alt='Jedi:Fallen Order' width='500'>
    </div>
    <form id="question_head" role='group' aria-labelledby='question_head'>
      <section class='question'>
        <label class='question' for="question_head">${store.questions[store.questionNumber].question}</label>
        <input type="radio" id='question_1' name='question' value="${store.questions[store.questionNumber].choices[0]}" required>
        <label for='question_1'>${store.questions[store.questionNumber].choices[0]}</label>
        <input type="radio" id='question_2' name='question' value="${store.questions[store.questionNumber].choices[1]}" required>
        <label for='question_2'>${store.questions[store.questionNumber].choices[1]}</label>
        <input type="radio" id='question_3' name='question' value="${store.questions[store.questionNumber].choices[2]}" required>
        <label for='question_3'>${store.questions[store.questionNumber].choices[2]}</label>
        <input type="radio" id='question_4' name='question' value="${store.questions[store.questionNumber].choices[3]}" required>
        <label for='question_4'>${store.questions[store.questionNumber].choices[3]}</label>
      </section>
      <button type='submit' class='submit'>
        Submit Answer
      </button>
    </form>
    <div class='counters'>
      <span>Question ${store.questionNumber + 1} out of ${store.questions.length}</span>
      <span>${store.score} correct answers</span>
    </div>
  
</div>`)
};


function generateNextQuestionScreen() {
  return (//this div box is neccessary to group our sections
    `<div class="box">
<section class="banner">
  <h1>STAR WARS QUIZ</h1>
</section>
<section class='primary'>
 <img src=${store.questions[store.questionNumber].image} alt='Jedi:Fallen Order' width='500'>
 </section>
  <section class='question'>
    <p ${feedbackClass(store.questions[store.questionNumber].choices[0])}>${store.questions[store.questionNumber].choices[0]}</p>
    <p ${feedbackClass(store.questions[store.questionNumber].choices[1])}>${store.questions[store.questionNumber].choices[1]}</p>
    <p ${feedbackClass(store.questions[store.questionNumber].choices[2])}>${store.questions[store.questionNumber].choices[2]}</p>
    <p ${feedbackClass(store.questions[store.questionNumber].choices[3])}>${store.questions[store.questionNumber].choices[3]}</p>
  </section>
  <section class='answer'>
    ${result()}
  </section>
  <button type='submit' class='next'>
  ${nextButton()}
  </button>
  <section class='counters'>
    <p>Question ${store.questionNumber + 1} out of ${store.questions.length}</p>
    <p>${store.score} correct answers</p>
  </section>
</div>`);
}

function result() {
  if (latestAnswer === store.questions[store.questionNumber].correctAnswer) {
    return 'Correct!'
  }
  return 'Incorrect!'
}

function feedbackClass(x) {
  console.log(x);
  console.log(latestAnswer);
  if (latestAnswer === x) {
    if (latestAnswer === store.questions[store.questionNumber].correctAnswer) {
      return "class='correct'";
    }
    return "class='incorrect'";
  }
}


function nextButton() {
  if (store.questionNumber < store.questions.length - 1) {
    return 'Next Question'
  }
  return 'Get Results'
}

function generateEndScreen() {
  return (`<div class="box">
  <section class="banner">
    <h1>STAR WARS QUIZ</h1>
  </section>
  <div>
  <img src='images/final.jpg' alt='Jedi:Fallen Order' width='500'>
 </div>
    <section class='answer endscreen'>
      <p>${message[store.score]}</p>
    </section>
    <section class='answer endscreen'>
      <p>Final score ${store.score} out of ${store.questions.length}</p>
    </section>
    <button class='restart'>
      Retake The Quiz
    </button>
</div>`);

}

////////////

function render() {
  let x = ''
  if (!store.quizStarted) {
    x = generateStartScreen();
  } else if (store.questionNumber < store.questions.length) {
    if (store.feedback) {
      x = generateNextQuestionScreen();
    } else {
      x = generateQuestionScreen();
    }
  } else {
    x = generateEndScreen();
  }
  $('main').html(x);
}

/////////

function incCounter() {
  store.questionNumber++;
}



function handleStart() {
  $('main').on('click', '.start', function () {
    store.quizStarted = true;
    render();

  });
}


function checkAnswer(userAnswer) {
  if (userAnswer === store.questions[store.questionNumber].correctAnswer) {
    store.score++;
  }
}

let latestAnswer = ''

function handleSubmit() {
  $('main').on('submit', 'form', function (e) {
    e.preventDefault();
    console.log($('input[name="question"]:checked').val());
    checkAnswer($('input[name="question"]:checked').val());
    latestAnswer = $('input[name="question"]:checked').val()
    store.feedback = true;
    render();
  });

}

function handleNext() {
  $('main').on('click', '.next', function () {
    if (store.questionNumber < store.questions.length) {
      incCounter();
    }
    store.feedback = false;
    render();
  });
  // jquery will point to our start button and will listen for a click
  // on click:
  //  increment questionNumber counter
  //  call render function with generateNextQUestionScreen as arg;
}

function reset() {
  store.score = 0;
  store.questionNumber = 0;
  store.quizStarted = false;
}

function handleRestart() {
  $('main').on('click', '.restart', function (e) {
    reset();
    render();
  });
  // jquery will point to our start button and will listen for a click
  // on click:
  //  call render function with generateStartScreen as arg
  //  reset questionCounter
  //  reset score counter
}

function eventHandler() {
  render();
  handleStart();
  handleSubmit();
  handleNext();
  handleRestart();
}


$(eventHandler);