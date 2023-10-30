const data = [
  {
    id: 1,
    question: "Which of these fish is actually a fish?",
    answers: [
      { answer: "swordfish", isCorrect: true },
      { answer: "jellyfish", isCorrect: false },
      { answer: "starfish", isCorrect: false },
      { answer: "crayfish", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "A flutter is a group of:",
    answers: [
      { answer: "bees", isCorrect: false },
      { answer: "penguins", isCorrect: false },
      { answer: "butterflies", isCorrect: true },
      { answer: "camels", isCorrect: false },
    ],
  },
  {
    id: 1,
    question: "A group of which animals is referred to as a wake?",
    answers: [
      { answer: "bats", isCorrect: false },
      { answer: "vultures", isCorrect: true },
      { answer: "ants", isCorrect: false },
    ],
  },
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const play = document.querySelector(".play");

let qIndex = 0;// Question Index in the array..
let correctCount = 0; // Correct Answer
let wrongCount = 0;
let total = 0;
let selectedAnswer; // Selected Answer.
const playAgain= ()=>{
   qIndex = 0;
   correctCount = 0; 
   wrongCount = 0;
   total = 0;
  showQuestion(qIndex);
}

play.addEventListener("click",()=>{
  resultScreen.style.display="none";
  gameScreen.style.display="block";
  playAgain();
})

const showResult=()=>{
  resultScreen.style.display="block";
  gameScreen.style.display="none";
  resultScreen.querySelector(".correct").textContent =`Correct Answer :${correctCount}`
  resultScreen.querySelector(".wrong").textContent =`Wrong Answer :${wrongCount}`
  resultScreen.querySelector(".score").textContent =`Score :${(correctCount-wrongCount) *10}`
}

const showQuestion = (qNumber) => {

  if(qIndex === data.length) return showResult();
  selectedAnswer=null;
  question.textContent = data[qNumber].question;
  answersContainer.innerHTML = data[qNumber].answers.map((item, index) => 
    `
      <div class="answer">
      <input name="answer" type="radio" id="${index}" value="${item.isCorrect}">
      <label for="${index}">${item.answer}</label>
      </div>
      
      `
  ).join("")// join function remove "," it really needfull because we are mapping array
  // without this function "," those will come on screen
  selectAnswer()
}

const selectAnswer = ()=>{
  answersContainer.querySelectorAll("input").forEach((el)=>{
    el.addEventListener("click" , (e)=>{
      selectedAnswer= e.target.value; 
     // console.log(e.target.value);
//e represents the event object, and e.target refers to the element that was clicked
//that element is an <input> element, then e.target.value will give you
// the value of that input element.
    });
  });
}

const submitAnswer =()=>{
  submit.addEventListener("click", ()=>{
    if(selectedAnswer !== null){

    
    selectedAnswer === "true" ? correctCount++ : wrongCount++ ;
    qIndex++;
    showQuestion(qIndex);
    }else{
      alert("Select an Answer");
    }
  })
}
showQuestion(qIndex);
submitAnswer();
