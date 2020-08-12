const store = {
  questions: [{
                id: 1,
                question: 'Who is the main character in Star Wars Jedi: Fallen Order? ',
                choices: ['Luke Skywalker','Galen Marek','Cal Kestis','Obi-Wan Kenobi'],
                correctAnswer: 'Cal Kestis',
                image: 'images/fallen-order.jpg',
              },
              {
                id: 2,
                question: "What race are the guards at Jabba's palace?",
                choices: ['Gungan','Gamorrean','Mandalorian','Jawa'],
                correctAnswer: 'Gamorrean',
                image: 'images/gamorrean.jpeg',
              },
              {
                id: 3,
                question: 'Who was the Sith Lord before Darth Sidious?',
                choices: ['Darth Vader','Darth Revan','Darth Bane','Darth Plagueis'],
                correctAnswer: 'Darth Plagueis',
                image: 'images/sith-lord.jpg',
              },
                {
                id: 4,
                question: 'How many pods are in the Galactic Senate?',
                choices: ['248','512','1024','1524'],
                correctAnswer: '1024',
                image: 'images/galactic-senate.png',
              },
              {
                id: 5,
                question: 'What is the appropriate response to someone saying \"Hnobiello there\"?',
                choices: [`\"General Kenobi!\"`,`\"Help me Obi-Wan Ke, you\'re my only hope.\"`,`\"I hate you!\"`,`\"These aren\'t the droids you\'re looking for.\"`],
                correctAnswer: `\"General Kenobi!\"`,
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


function generateStartScreen(){
  return(`<div class="box">
  <div class="banner primary">
    <h1>Star Wars Quiz</h1>
  </div>
  <div class='primary' style="background-image: url('images/title.jpeg')">
    <button class='start'>
      Start The Quiz!
    </button>
  </div>
</div>`);
}

function generateQuestionScreen(){
  return(`<div class="box">
  <div class="banner primary">
    <h1>Star Wars Quiz</h1>
  </div>
  <div class='primary' style="background-image: url(${store.questions[store.questionNumber].image})">
    <form>
      <div class='question'>
      <div class='border'>${store.questions[store.questionNumber].question}</div>
        <input type="radio" name='question' value="${store.questions[store.questionNumber].choices[0]}" required>
        <label for='q1'>${store.questions[store.questionNumber].choices[0]}</label>
        <input type="radio" name='question' value="${store.questions[store.questionNumber].choices[1]}" required>
        <label for='q2'>${store.questions[store.questionNumber].choices[1]}</label>
        <input type="radio" name='question' value="${store.questions[store.questionNumber].choices[2]}" required>
        <label for='q3'>${store.questions[store.questionNumber].choices[2]}</label>
        <input type="radio" name='question' value="${store.questions[store.questionNumber].choices[3]}" required>
        <label for='q4'>${store.questions[store.questionNumber].choices[3]}</label>
      </div>
      <button type='submit' class='submit'>
        Submit Answer
      </button>
    </form>
    <div class='counters'>
      <div>Question ${store.questionNumber + 1} out of ${store.questions.length}</div>
      <div>${store.score} correct answers</div>
    </div>
  </div>
</div>`)
};


function generateNextQuestionScreen(){
return (`<div class="box">
<div class="banner primary">
  <h1>Star Wars Quiz</h1>
</div>
<div class='primary' style="background-image: url(${store.questions[store.questionNumber].image})">
  <div class='question'>
    <div ${feedbackClass(store.questions[store.questionNumber].choices[0])}>${store.questions[store.questionNumber].choices[0]}</div>
    <div ${feedbackClass(store.questions[store.questionNumber].choices[1])}>${store.questions[store.questionNumber].choices[1]}</div>
    <div ${feedbackClass(store.questions[store.questionNumber].choices[2])}>${store.questions[store.questionNumber].choices[2]}</div>
    <div ${feedbackClass(store.questions[store.questionNumber].choices[3])}>${store.questions[store.questionNumber].choices[3]}</div>
  </div>
  <div class='answer'>
    ${result()}
  </div>
  <button type='submit' class='next'>
  ${nextButton()}
  </button>
  <div class='counters'>
    <div>Question ${store.questionNumber + 1} out of ${store.questions.length}</div>
    <div>${store.score} correct answers</div>
  </div>
</div>
</div>`);
}

function result(){
  if (latestAnswer === store.questions[store.questionNumber].correctAnswer){
    return 'Correct!'
  }
  return 'Incorrect!'
}

function feedbackClass(x) {
  console.log(x);
  console.log(latestAnswer);
  if(latestAnswer === x) {
    if (latestAnswer === store.questions[store.questionNumber].correctAnswer) {
      console.log('correct')
      return "class='correct'";
    }
    console.log('incorrect')
    return "class='incorrect'";
  }
  console.log('nothing happened');
}


function nextButton(){
  if (store.questionNumber < store.questions.length - 1){
    return 'Next Question'
  }
  return 'Get Results'
}

function generateEndScreen(){
  return (`<div class="box">
  <div class="banner primary">
    <h1>Star Wars Quiz</h1>
  </div>
  <div class='primary' style="background-image: url('images/final.jpg')">
    <div class='answer endscreen'>
      ${message[store.score]}
    </div>
    <div class='answer endscreen'>
      Final score ${store.score} out of ${store.questions.length}
    </div>
    <button class='restart'>
      Retake The Quiz
    </button>
  </div>
</div>`);

}

////////////

function render(){
 let x = ''
 if (!store.quizStarted){
   x = generateStartScreen();
 } else if (store.questionNumber < store.questions.length){
   if (store.feedback){
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

function incCounter(){
  store.questionNumber ++;
}



function handleStart(){
  $('main').on('click', '.start', function(){
    store.quizStarted = true;
    render();
 
  });
}


function checkAnswer(userAnswer){
  if(userAnswer === store.questions[store.questionNumber].correctAnswer){
    store.score++;
  }
}

let latestAnswer = ''

function handleSubmit(){
  $('main').on('submit', 'form', function(e){
    e.preventDefault();
    console.log($('input[name="question"]:checked').val());
    checkAnswer($('input[name="question"]:checked').val());
    latestAnswer = $('input[name="question"]:checked').val()
    store.feedback = true;
    render();
  });

}

function handleNext(){
  $('main').on('click', '.next', function(){
    if (store.questionNumber < store.questions.length){
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

function reset(){
  store.score = 0;
  store.questionNumber = 0;
  store.quizStarted = false;
}

function handleRestart(){
  $('main').on('click', '.restart', function(e){
    reset();
    render();
  });
// jquery will point to our start button and will listen for a click
// on click:
//  call render function with generateStartScreen as arg
//  reset questionCounter
//  reset score counter
}

function eventHandler(){
  render();
  handleStart();
  handleSubmit();
  handleNext();
  handleRestart();
}


$(eventHandler);