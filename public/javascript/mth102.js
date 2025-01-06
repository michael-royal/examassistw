import { questions } from "./questions/mthquest2.js";
const start = document.querySelector('#getquestions');
const showDisclaimer = document.querySelector('#showit');
const timer = document.querySelector('#timer');
const disclaimer = document.querySelector('#show');
const questionHolder = document.querySelector('#cardbod');
const prevBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const end = document.querySelector('#end');
const restart = document.querySelector('#restart');
const attemptedQuestions = document.querySelector('#at');
const progressBar = document.querySelector('#progress')
const duration = 35 * 60 * 1000;
const startTime = new Date().getTime();
const endTimer = duration + startTime
let attemptedQuestionTracker = 0;
let correctAnswers = 0;
let inCorrectAnswers = 0;
let questionIndex = 0;
let isSelected = false
let minutes;
let seconds;
// function to get the questions
const getQuestions = ()=>{
  questions.forEach((question) =>{
    const div = document.createElement('div')
        div.classList = 'card m-2'

        div.innerHTML = `
            <div class= "card-body m-2 text-white bg-primary p-2">${question.question}</div>
            <ul class ="list-group m-2" >
                <li class ="list-group-item p-2">${question.options[0]}</li>
                <li class ="list-group-item p-2">${question.options[1]}</li>
                <li class ="list-group-item p-2">${question.options[2]}</li>
                <li class ="list-group-item p-2">${question.options[3]}</li>
                <li class ="list-group-item p-2">${question.options[4]}</li>
            </ul>
            <div class= "bg-white text-white p-2 m-2 cor">${question.answer}</div>

           
        `

    questionHolder.append(div);
  })
}

getQuestions();

const arr = questionHolder.childNodes;

// function to clear the question holder
const clear = ()=>{
    arr.forEach((arr)=>{
        arr.style.display = 'none';
    })
}

// function to get the first question 
const init = ()=>{
    clear();
    isSelected = false
  arr[questionIndex].style.display = 'block';
}


// function to get the next question

const getNext = ()=>{
    if (questionIndex < 50) {
        questionIndex++;
        init()
    }else{
        endQuiz()
    }
}

// adding the event of click to the previous button
prevBtn.addEventListener('click', ()=>{
    if (questionIndex > 0) {
        questionIndex--;
        init()
    }
})


// adding the event of click to the next btn
nextBtn.addEventListener('click', ()=>{
    getNext()
})


// initializing the function to search for list group item and cross check correct answer

const selectOption = (e)=>{
    if(e.target.classList.contains('list-group-item')){
        if (!isSelected) {
            isSelected = true;
            attemptedQuestionTracker++;
            attemptedQuestions.innerHTML = `Attempted ${attemptedQuestionTracker}/50`
            e.target.classList.add('bg-warning')
            const correct = e.target.parentElement.nextElementSibling

            if (e.target.innerHTML === correct.innerHTML) {
                correctAnswers++;

            }else{
                inCorrectAnswers++;
            }
            
        }
    }
}





// function to get the timer running 

const startTim = ()=>{
    disclaimer.classList.add('d-none')
    const intervalId = setInterval(() => {
        const currentTime = new Date().getTime()
        const distance = endTimer - currentTime

        minutes = Math.floor(distance % (60 * 60 * 1000)/(60 * 1000))
        seconds = Math.floor(distance % (60 * 1000)/1000)
        timer.innerHTML = `${minutes}m : ${seconds}s`

        const progressValue = ((distance / duration) * 100)
        progressBar.value = progressValue;

        if(distance < 0){
            clearInterval(intervalId)
            timer.innerHTML = "00m : 00s | Quiz Ended"
            endQuiz()
        }

        end.addEventListener('click', ()=>{
            clearInterval(intervalId)
            endQuiz()
        })
// adding a click event to the body of the question holder to search the list-group-items

    questionHolder.addEventListener('click', selectOption)



    }, 1000);
}

// function to end quiz

const endQuiz = ()=>{
    cardbod.innerHTML = `
    <h1 m-4>Quiz Over</h1>
    <div class="card p-3 m-3 bg-dark text-white">You attempted ${attemptedQuestionTracker} out of 50 questions</div>
    <div class=" card p-3 m-3 bg-dark text-white">You had a total of ${correctAnswers} questions correct and ${inCorrectAnswers} questions incorrect</div> `
    timer.innerHTML = "00m : 00s | Quiz Ended"
    attemptedQuestions.style.display = 'none'
    prevBtn.classList = 'btn btn-success text-white m-2 d-none'
    nextBtn.classList = 'btn btn-warning text-white m-2 d-none'
    end.classList = 'btn btn-danger text-white m-2 d-none'
    restart.classList = 'btn btn-success text-white m-2 d-block'
}




// setting the event on the start button 

start.addEventListener('click', startTim)

init()