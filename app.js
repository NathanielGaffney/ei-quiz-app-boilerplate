//a button that triggers the start of the quiz

//the first of five questions with four possible answers will appear
//  only one choice can be selected at a time
//  the selcted answer will be logged when the submit button is clicked
//  an alert will appear with a message showing either "correct" or the correct answer if wrong choice selected
//  the submit button should then become the next question button
//  clicking the next question button should reset the screen for the next question

//The bottom left corner should display the current question number out of 5
//The bottom right corner should track the amount of correct answers as the user progresses throug the quiz

//After the final question has been answered the submit button should display "see results"
//  This will take the user to the final screen which will show their final score
//  There should be a special message tied to the test results, displayed
//  A button should appear that allows the user to restart the quiz from the "start quiz" display

const store = {
  questions: [{
                id: 1,
                question: '',
                choices: ['a','b','c','d'],
                correctAnswer: 'a',
              },
              {
                id: 2,
                question: '',
                choices: ['1','2','3','4'],
                correctAnswer: '3',
              },
              {
                id: 3,
                question: '',
                choices: ['cat','dog','rat','bat'],
                correctAnswer: 'bat',
              },
                {
                id: 4,
                question: '',
                choices: ['sam','fran','dan','man'],
                correctAnswer: 'fran',
              },
              {
                id: 5,
                question: '',
                choices: ['SF','NYC','LA','TK'],
                correctAnswer: 'LA',
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
  <div class='primary' style="background-image: url('images/galatic-senate.png')">
    <form>
      <div class='question'>
      <div>Question</div>
        <input type="radio" id="q1" name='question' value=${store.questions[store.questionNumber].choices[0]} required>
        <label for='q1'>${store.questions[store.questionNumber].choices[0]}</label>
        <input type="radio" id="q2" name='question' value=${store.questions[store.questionNumber].choices[1]} required>
        <label for='q2'>${store.questions[store.questionNumber].choices[1]}</label>
        <input type="radio" id="q3" name='question' value=${store.questions[store.questionNumber].choices[2]} required>
        <label for='q3'>${store.questions[store.questionNumber].choices[2]}</label>
        <input type="radio" id="q4" name='question' value=${store.questions[store.questionNumber].choices[3]} required>
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




  // html image tag location
// display question form based on questionNumber
// display score and question count
// question form has radio buttons and submit button
// shows updated question counter 
//}

function generateNextQuestionScreen(){
return (`<div class="box">
<div class="banner primary">
  <h1>Star Wars Quiz</h1>
</div>
<div class='primary' style="background-image: url('images/galatic-senate.png')">
  <div class='question'>
    <div ${feedbackClass(store.questions[store.questionNumber].choices[0])}>${store.questions[store.questionNumber].choices[0]}</div>
    <div ${feedbackClass(store.questions[store.questionNumber].choices[1])}>${store.questions[store.questionNumber].choices[1]}</div>
    <div ${feedbackClass(store.questions[store.questionNumber].choices[2])}>${store.questions[store.questionNumber].choices[2]}</div>
    <div ${feedbackClass(store.questions[store.questionNumber].choices[3])}>${store.questions[store.questionNumber].choices[3]}</div>
  </div>
  <div class='answer'>
    Correct!
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
    <div class='answer'>
      ${message[store.score]}
    </div>
    <div class='answer'>
      Final score ${store.score} out of ${store.questions.length}
    </div>
    <button class='restart'>
      Retake The Quiz
    </button>
  </div>
</div>`);
// html image tag location
// congrats message from array, based on score
// score
// button to re take quiz 
}

// Leaving just incase we decide to use it later
// function generateScreen{
// this function calls the correct generate function based on a conditional
// if the questionNumber is 0 then generateStartScreen
// if the questionNumber is 1-5 generateQuestion screen
// if the questionNumber is 6 generateEndScreen
//}

////////////

function render(){
 // varible is  = arg, which could be generateScreen() or generateNextQuestionScreen;
 // jquery location .html(variable)
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
  console.log(store.questionNumber);
}

// We could potentially pass in all other generate functions as an argument (arg) in our render function

function handleStart(){
  $('main').on('click', '.start', function(){
    store.quizStarted = true;
    render();
 
  });
};

// jquery will point to our start button and will listen for a click
// on click:
//  increment questionNumber counter
//  call render function


function checkAnswer(userAnswer){
  if(userAnswer === store.questions[store.questionNumber].correctAnswer){
    store.score++;
  }
}

let latestAnswer = ''

function handleSubmit(){
  $('main').on('submit', 'form', function(e){
    e.preventDefault();
    checkAnswer($('input[name="question"]:checked').val());
    latestAnswer = $('input[name="question"]:checked').val()
    store.feedback = true;
    render();
  });
// jquery will point to our start button and will listen for a click
// on click:
//  run generate nextQuestionScreen
//  call render function 
//  this will call checkAnswer()

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
  //$(render(generateStartScreen));
  
  handleStart();
  handleSubmit();
  handleNext();
  handleRestart();
}


$(eventHandler);










/**
 * Example store structure
 */
//const store = {
  // 5 or more questions are required
 /* questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  //quizStarted: false,
  //questionNumber: 0,
  //score: 0
};*/

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)