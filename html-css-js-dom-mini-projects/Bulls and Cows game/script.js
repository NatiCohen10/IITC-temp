const computerGeneratedArr = [];
const playerArr = [0,1,2,3];
let cowsText = document.querySelector('#cows');
let bullsText = document.querySelector('#bulls');
let bulls = 0;
let cows = 0;
let bullsGuess;
let cowsGuess;
button1.innerText = 0;
button2.innerText = 1;
button3.innerText = 2;
button4.innerText = 3;
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
initializeComputerArr()

// Increment the button numbers whenever pressing them
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
    checkForWin()
    
}

function initializeGuessingTable(){
    button1.innerText = 0;
    button2.innerText = 1;
    button3.innerText = 2;
    button4.innerText = 3;
    guessTable.innerHTML = `<tr><th>?</th><th>?</th><th>?</th><th>?</th><th>Bulls</th><th>Cows</th></tr>`

        
}
initializeGuessingTable()

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
        winAnnounce.innerText = 'You win!';
        submitButtonHide.style.display = 'none';
        let tableHeader = `<tr><th>${computerGeneratedArr[0]}</th><th>${computerGeneratedArr[1]}</th>
        <th>${computerGeneratedArr[2]}</th><th>${computerGeneratedArr[3]}</th><th>Bulls</th><th>Cows</th></tr>`;
        guessTable.querySelector('tr').innerHTML = tableHeader;
    }
}