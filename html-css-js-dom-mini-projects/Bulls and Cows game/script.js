let computerGeneratedArr = [];
let playerArr = [0,1,2,3];
const gamesHistory = [];
let bullsGuess;
let cowsGuess;
let counter = 0;
let startCount;
let endCount;
let totalTime;
let playerName = document.querySelector('#playerName')
const guessTable = document.querySelector('#guessTable')

// initialize computer generated array
function initializeComputerArr(){
    // as long as the list's length is less than 5
    while (computerGeneratedArr.length < 4) {
    // var random number is random from 1-10, rounded down
    let randomNumber = Math.floor(Math.random() * 10)
    // check if the computer generated array includes the random number
    if(!computerGeneratedArr.includes(randomNumber)){
        // if it doesnt, push the number into the array
        computerGeneratedArr.push(randomNumber)
    }
}
console.log(`computer array is ${computerGeneratedArr}`);
}

function getNumbersFromUser(value){
    // button is a var thats equal to the button thats currently pressed
    let button = document.querySelector(`#button${value + 1}`)
    // currentNumber is the value of the button, converted to a number
    let currentNumber = parseInt(button.innerText)
    // if current number isnt 9 it increments the currentNumber by 1 for each click
    if (currentNumber != 9){
        currentNumber++
    }
    // if it is 9 then it sets the value to 0
    else if(currentNumber == 9){
        currentNumber = 0
    }
    // updating the display of the button after each press
    button.innerText = currentNumber;
    // inserting the new currentNumber to the player's list at the index of the button pressed
    playerArr[value] = currentNumber;
}

function checkForSimilar(){
    let bulls = 0;
    let cows = 0;
    for(let i = 0; i<computerGeneratedArr.length;i++){
        if (computerGeneratedArr[i] === playerArr[i]){
            bulls++
        }
        else if(computerGeneratedArr.includes(playerArr[i]))
            cows++
    }
    bullsGuess = bulls
    cowsGuess = cows
    bulls = 0
    cows = 0
}

function submitResults(){
    checkForSimilar()
    if(checkForDuplicates()){
        guessingTable()
    }
    if(!checkForWin()){
        counter++
    }
    
}

function initializeGuessingTable(){
    button1.innerText = 0;
    button2.innerText = 1;
    button3.innerText = 2;
    button4.innerText = 3;
    guessTable.innerHTML = `<tr>
    <th style="color: rgb(7, 65, 115);">?</th>
    <th style="color: rgb(7, 65, 115);">?</th>
    <th style="color: rgb(7, 65, 115);">?</th>
    <th style="color: rgb(7, 65, 115);">?</th>
    <th style="color: rgb(93, 235, 215);">Bulls</th>
    <th style="color: rgb(197, 255, 149);">Cows</th>
</tr>`;


        
}


function guessingTable(){
    const elemGuess= `<tr><td>${playerArr[0]}</td><td>${playerArr[1]}</td>
        <td>${playerArr[2]}</td><td>${playerArr[3] }</td><td>${bullsGuess}</td><td>${cowsGuess}</td></tr>`
        guessTable.innerHTML += elemGuess
}

function checkForDuplicates(){
    let duplicateAlert = document.querySelector('#duplicateCheck')
    let hasDuplicate = false
    for(let i = 0;i<playerArr.length;i++){
        let currentNum = playerArr[i]
        for(let j = i+1;j<playerArr.length;j++){
            if(playerArr[j] === currentNum){
                hasDuplicate = true
                break
            }
        }
        if(hasDuplicate){
            break
        }
    }
    if(hasDuplicate){
        duplicateAlert.innerText = 'Duplicate!'
        return false
    }
    duplicateAlert.innerText = ''
    return true
}

function checkForWin(){
    let winAnnounce = document.querySelector('#winAnnounce')
    let submitButtonHide = document.querySelector('#submitButton')
    if(bullsGuess === 4){
        counter++
        endCount = new Date().getTime(); 
        totalTime = (endCount - startCount) / 1000
        winAnnounce.innerText = 'You win!';
        submitButtonHide.style.display = 'none';
        let tableHeader = `<tr><th>${computerGeneratedArr[0]}</th><th>${computerGeneratedArr[1]}</th>
        <th>${computerGeneratedArr[2]}</th><th>${computerGeneratedArr[3]}</th><th class="bullsDesign">Bulls</th>
        <th class="cowsDesign">Cows</th></tr>`;
        guessTable.querySelector('tr').innerHTML = tableHeader;
        addGameHistory()
    }
}

function runGame(){
    initializeComputerArr()
    initializeGuessingTable()
}

function addGameHistory(){
    const gameHistory = {
        name : playerName.value,
        correctAnswer : computerGeneratedArr,
        numberOfTries : counter,
        time : totalTime,
    }
    gamesHistory.push(gameHistory)
}

function showHistory(){
    const tableOfHistory = document.querySelector('#historyTable')
    tableOfHistory.innerHTML = '<tr><th>Player name</th><th>Correct answer</th><th>Number of tries</th><th>Time taken</th></tr>';
    for (const gameHistory of gamesHistory) {
        const historyEntry = `<tr><td>${gameHistory.name}</td><td>(${gameHistory.correctAnswer})</td><td>${gameHistory.numberOfTries}</td><td>${gameHistory.time}</td></tr>`;
        tableOfHistory.innerHTML += historyEntry;
}}

function startGame(){
    if(playerName.value == ""){
    document.querySelector("#playerName").placeholder= "Insert your name first!";}
    else
   { document.getElementById("startGameContainer").style.display = "none";
    document.querySelector('#gameContainer').style.display = 'flex';
    document.getElementById('utilityButtons').style.display = 'flex';
    document.getElementById('guessingTableStyle').style.display = 'flex';
    startCount = new Date().getTime(); 
    runGame();}
    
}

function startNewGame(){
    document.getElementById("startGameContainer").style.display = "flex";
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById('utilityButtons').style.display = 'none';
    document.getElementById('guessingTableStyle').style.display = 'none';
    document.getElementById('submitButton').style.display = 'block'
    computerGeneratedArr = [];
    playerArr = [0,1,2,3]
    playerName.value = '';
    let winAnnounce = document.querySelector('#winAnnounce');
    winAnnounce.innerText = '';
    const tableOfHistory = document.querySelector('#historyTable')
    tableOfHistory.innerHTML = '';
    counter = 0
}