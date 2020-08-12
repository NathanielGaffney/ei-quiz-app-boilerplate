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

const store = [
  {
    id: 1,
    question: '',
    choices: ['a','b','c','d'],
    correctAnswer: 'a',
    answeredCorrectly: false
  },
  {
    id: 2,
    question: '',
    choices: ['1','2','3','4'],
    correctAnswer: 'a',
    answeredCorrectly: false
  },
  {
    id: 3,
    question: '',
    choices: ['cat','dog','rat','bat'],
    correctAnswer: 'a',
    answeredCorrectly: false
  },
    {
    id: 4,
    question: '',
    choices: ['sam','fran','dan','man'],
    correctAnswer: 'a',
    answeredCorrectly: false
  },
  {
    id: 5,
    question: '',
    choices: ['SF','NYC','LA','TK'],
    correctAnswer: 'a',
    answeredCorrectly: false
  }
]

let score = 0;
let questionNumber = 0;


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
        <input type="radio" id="q1" name='question' value='true' required>
        <label for='q1'>${store[questionNumber].choices[0]}</label>
        <input type="radio" id="q2" name='question' value='false' required>
        <label for='q2'>${store[questionNumber].choices[1]}</label>
        <input type="radio" id="q3" name='question' value='false' required>
        <label for='q3'>${store[questionNumber].choices[2]}</label>
        <input type="radio" id="q4" name='question' value='false' required>
        <label for='q4'>${store[questionNumber].choices[3]}</label>
      </div>
      <button type='submit' class='submit'>
        Submit Answer
      </button>
    </form>
    <div class='counters'>
      <div>Question X out 5</div>
      <div>X correct answers</div>
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
    <div>answer 1</div>
    <div class="correct">answer 2</div>
    <div>answer 3</div>
    <div>answer 4</div>
  </div>
  <div class='answer'>
    Correct!
  </div>
  <button type='submit' class='next'>
    Next Question
  </button>
  <div class='counters'>
    <div>Question X out 5</div>
    <div>X correct answers</div>
  </div>
</div>
</div>`);
}

function generateEndScreen(){
  return (`<div class="box">
  <div class="banner primary">
    <h1>Star Wars Quiz</h1>
  </div>
  <div class='primary' style="background-image: url('images/final.jpg')">
    <div class='answer'>
      Congratulations! You are a Jedi Master!
    </div>
    <div class='answer'>
      Final score 5 out of 5
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

function render(arg){
 // varible is  = arg, which could be generateScreen() or generateNextQuestionScreen;
 // jquery location .html(variable)
 let x = arg;
  $('main').html(x);
}

/////////

function incCounter(){
  questionNumber ++;
}

// We could potentially pass in all other generate functions as an argument (arg) in our render function

function handleStart(){
  $('.start').on('mouseup', function(){
    render(generateQuestionScreen);
 
  });
};

// jquery will point to our start button and will listen for a click
// on click:
//  increment questionNumber counter
//  call render function


function checkAnswer(userAnswer){
  if(userAnswer === 'true'){
    score++;
  }
}

function handleSubmit(){
  $('main').on('submit', 'form', function(e){
    e.preventDefault();
    checkAnswer($('input[name="question"]:checked').val());
    render(generateNextQuestionScreen);
  });
// jquery will point to our start button and will listen for a click
// on click:
//  run generate nextQuestionScreen
//  call render function 
//  this will call checkAnswer()

}

function handleNext(){
  $('main').on('mouseup', '.next', function(){
    incCounter();
    questionNumber === (store.length) ? render(generateEndScreen): render(generateQuestionScreen);
    console.log(questionNumber);
  });
// jquery will point to our start button and will listen for a click
// on click:
//  increment questionNumber counter
//  call render function with generateNextQUestionScreen as arg;
}

function reset(){
  score = 0;
  questionNumber = 0;
}

function handleRestart(){
  $('main').on('mouseup', '.restart', function(e){
    reset();
    e.stopPropagation()
    eventHandler();
    console.log(questionNumber);
  });
// jquery will point to our start button and will listen for a click
// on click:
//  call render function with generateStartScreen as arg
//  reset questionCounter
//  reset score counter
}

function eventHandler(){
  $(render(generateStartScreen));
  //$(render(generateStartScreen));
  
  $(handleStart);
  $(handleSubmit);
  $(handleNext);
  $(handleRestart);
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