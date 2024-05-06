let correctAnswers = ['d', 'b', 'd', 'b', 'd', 'b', 'c', 'b', 'b', 'c'];
let key = 'quiz'
let userAnswer =
localStorage.getItem(key)!==null?JSON.parse(localStorage.getItem(key)) : []
colorAnswersBlueOnInit()

console.log(userAnswer);

function checkAnswer(questionNumber, answer){
    let questionIndex = questionNumber - 1
    userAnswer[questionIndex] = answer
    let JsonAnswers = JSON.stringify(userAnswer)
    localStorage.setItem(key, JsonAnswers)
    if(localStorage.getItem(key) !== null){
        
    }
    console.log(userAnswer); 
    colorAnswersBlack(questionNumber)
    document.getElementById(`q${questionNumber}${answer}`).style.color = 'blue'
    
}
function colorAnswersBlueOnInit(){
    if(userAnswer.length !== 0){
        for(let answer = 0; answer < userAnswer.length; answer++){
            if(userAnswer[answer] !== null) {
                let questionNumber = answer + 1;
                document.getElementById(`q${questionNumber}${userAnswer[answer]}`).style.color = 'blue';
            }
        }
    }
}

function colorAnswersBlack(questionNumber){
    let options = document.getElementById(`q${questionNumber}`).querySelectorAll('li');
    options.forEach(option => option.style.color = '');
}

function disableOnclick(){
    for(let questionNumber = 1; questionNumber <= correctAnswers.length; questionNumber++){
        let options = document.getElementById(`q${questionNumber}`).querySelectorAll('li');
        options.forEach(option => option.onclick = '');
    }

}
function submitAnswers(){
    if(userAnswer.length === correctAnswers.length && !userAnswer.includes('null')){
        disableOnclick()
        for(let answer = 0; answer<(userAnswer.length);answer++){
            let questionNumber = answer+1
            if(userAnswer[answer] === correctAnswers[answer]){
                colorAnswersBlack(questionNumber)
                document.getElementById(`q${questionNumber}${userAnswer[answer]}`).style.color = 'green'
            }
            else{
                colorAnswersBlack(questionNumber)
                document.getElementById(`q${questionNumber}${userAnswer[answer]}`).style.color = 'red'
            }
        }}
    else{
        alert('You didnt answer all of the questions yet!')
    }
}

function clearStorage(){
    localStorage.clear()
    userAnswer = []
    for(let questionNumber = 1; questionNumber <= correctAnswers.length; questionNumber++){
        let options = document.getElementById(`q${questionNumber}`).querySelectorAll('li');
        options.forEach(option => option.style.color = '');
    }
    enableOnclick()
    console.log(userAnswer);
}

function enableOnclick(){
    for(let questionNumber = 1; questionNumber <= correctAnswers.length; questionNumber++){
        let options = document.getElementById(`q${questionNumber}`).querySelectorAll('li');
        options.forEach(option => option.onclick = function(){
            let answer = option.dataset.option;
            checkAnswer(questionNumber, answer);
        });
    }
}
