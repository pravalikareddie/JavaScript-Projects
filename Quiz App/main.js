const question = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".choice"));
console.log(choices);
score = 0;
questionCounter = 0;
const availableQuestions = [
  {
    question: "Capital of America",
    answer: "4",
    1: "India",
    2: "Washington",
    3: "Africa",
    4: "China",
  },
  {
    question: "Capital of Africa",
    answer: "2",
    1: "India",
    2: "Washington",
    3: "Africa",
    4: "China",
  },
  {
    question: "Capital of India",
    answer: "1",
    1: "India",
    2: "Washington",
    3: "Africa",
    4: "China",
  },
];
getNextQuestion = () => {
    if(availableQuestions.length>0){
  questionCounter++;

  const index = Math.floor(Math.random() * availableQuestions.length);
   currentQuestion = availableQuestions[index];
  question.innerText = currentQuestion.question;
  choices.forEach((choice) => {
    choice.innerText = currentQuestion[choice.dataset.number];
  });
  availableQuestions.splice(index, 1);
}
else{
    alert("Your score is "+ score)
}
};

choices.forEach((choice) => {
  choice.addEventListener("click", (event) => {
    selectedAnswer=event.target.dataset.number;
   
    console.log(selectedAnswer)
    console.log(currentQuestion.answer)
   


    if(selectedAnswer==currentQuestion.answer){

        choice.classList.add("correct");
        score=score+1;
    }
    else{
        choice.classList.add("incorrect");
    }
    setTimeout(() => {
        getNextQuestion();
        choice.classList.remove("incorrect");
        choice.classList.remove("correct");

    }, 3000);
    
  });
});
getNextQuestion();
