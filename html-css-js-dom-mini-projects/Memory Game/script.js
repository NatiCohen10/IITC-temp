let board = document.querySelector(".board");
let playerName = document.querySelector('#userName')
let numberOfCards;
let gameCards;
let openCardCounter = 0;
let openCard1Id;
let openCard2Id;
let score = 0;
let mistakes = 0;
let moves = 0;
const gamesHistory = [];
let startCount;
let totalTime;
let startTime;
let timerInterval;

// //////////////////////////////
// Timer function(credit to Elad)
// /////////////////////////////
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second
  }
  function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const formattedTime = padNumber(minutes) + ":" + padNumber(seconds);
    document.getElementById("timer").textContent =
      "Timer: " + formattedTime;
  }

  function padNumber(number) {
    return (number < 10 ? "0" : "") + number; // Add leading zero if needed
  }
  function stopTimer() {
    clearInterval(timerInterval);

  }


///////////////////
// game functions
//////////////////
// after submitting name, goes to size select page
function goToInitPage(){
    document.querySelector('.getDetails').style.display = 'none'
    document.querySelector('.initPage').style.display = 'flex'
}


// create board by the size the user chose.
function createBoard(sizeByUser) {
    // make the board in the style of a grid
  document.querySelector(".board").style.gridTemplateColumns =
    "repeat(" + sizeByUser + ", 85px)";
    // if the board is 4x4 the number of cards is 16
  numberOfCards = sizeByUser ** 2;
  document.querySelector(".initPage").style.display = "none";
  document.querySelector(".board").style.display = 'grid';
  document.querySelector('.utilityButtons').style.display = 'flex';
  document.querySelector('.top').style.display = 'flex';
  document.querySelector('#winMessage').innerText = '';
    // adds 1 card for the available number of cards 
  for (let i = 1; i <= numberOfCards; i++) {
    board.innerHTML += `<div class="card" id = "card${i}">
        <button class="gameButton" id="button${i}" onclick="revealCard(${i})"></button></div>`;
        document.querySelector(`#button${i}`).style.display = 'none'
  }
  gameCards = createCardArray();
  assignPicturesToCards();
    // cards dissappear after some time, dependant on board size
  setTimeout(hideCards, 1000 * (sizeByUser / 2));


}

function createCardArray() {
  let cardArray = [];
  let pictureArray = [];
  let functionResultArray = [];

  // Populate pictureArray with random picture IDs
  while (pictureArray.length < numberOfCards / 2) {
    let randomPictureId = Math.floor(Math.random() * 21) + 1;
    if (!pictureArray.includes(randomPictureId)) {
      pictureArray.push(randomPictureId);
    }
  }

  // Populate cardArray with unique card IDs
  while (cardArray.length < numberOfCards) {
    let randomCardId = Math.floor(Math.random() * numberOfCards) + 1;
    if (!cardArray.includes(randomCardId)) {
      cardArray.push(randomCardId);
    }
  }

  // Generate pairs of card IDs and one picture ID
  for (let i = 0; i < numberOfCards / 2; i++) {
    let randomCard1Id = cardArray.pop();
    let randomCard2Id = cardArray.pop();
    let randomPictureId = pictureArray.pop();
    // add the card and picture ids to an object and pushing it to an array, used to iterate over
    functionResultArray.push({
      card1Id: randomCard1Id,
      card2Id: randomCard2Id,
      pictureId: randomPictureId,
    });
  }
    // the list of cards for me to cheat
  console.log(functionResultArray);
  return functionResultArray;
}


function updateMovesAndMistakes() {
    document.querySelector("#gameMoves").textContent = "Moves: " + moves;
    document.querySelector("#gameMistakes").textContent =
      "Mistakes: " + mistakes;
  }

//   iterates over an array of objects, assigns 1 random picture id to the card ids that are in the same object as them
function assignPicturesToCards() {
  for (let obj of gameCards) {
    document.querySelector(
      `#card${obj.card1Id}`
    ).innerHTML += `<img id = "img${obj.card1Id}" class= "card" src="/images/${obj.pictureId}.jpg">`;
    document.querySelector(
      `#card${obj.card2Id}`
    ).innerHTML += `<img id = "img${obj.card2Id}" class= "card" src="/images/${obj.pictureId}.jpg">`;
  }
}


function hideCards() {
  for (let i = 1; i <= numberOfCards; i++) {
    document.querySelector(`#img${i}`).style.display = "none";
    document.querySelector(`#button${i}`).style.display = "block";
  }
  startTimer()
  startCount = new Date().getTime(); 
}
// when pressing a button this function is run
function revealCard(cardId) {
    // if the counter is 0, assigns openCard1Id the pressed card id
    if (openCardCounter === 0) {
        openCardCounter++;
        openCard1Id = cardId;
        document.querySelector(`#img${cardId}`).style.display = "block";
        document.querySelector(`#button${cardId}`).style.display = "none";
        // if its 1 assigns the openCard2Id the pressed card id
    } else if (openCardCounter === 1) {
        openCardCounter++;
        openCard2Id = cardId;
        document.querySelector(`#img${cardId}`).style.display = "block";
        document.querySelector(`#button${cardId}`).style.display = "none";
        moves++
        // if the cards are the same +1 to score
        if (checkSimilarCards()) {
            score++;
            updateMovesAndMistakes()
            // if the score is the number of cards/2 (number of total pairs) then the player won
            if (score === numberOfCards / 2) {
                document.querySelector('#winMessage').innerText = 'You won!'
                const endCount = new Date().getTime();
                totalTime = (endCount - startCount) / 1000
                addGameHistory()
                stopTimer()
            }
        }
        // if the cards arent the same
        else{
            mistakes++
            disableAllButtons()
            setTimeout(flipCards, 1000);
            updateMovesAndMistakes()
        }
        

        openCardCounter = 0;
    }
}
// checks if the cards are similar
function checkSimilarCards(){
    // iterates over the list of objects
    for(let obj of gameCards){
        // if the id of the cards in the object is the same as the ids of the pressed cards
        if((obj.card1Id == openCard1Id && obj.card2Id == openCard2Id) ||
           (obj.card1Id == openCard2Id && obj.card2Id == openCard1Id)){
            return true;
        }
    }
    return false;
}
// disable buttons if the cards arent the same
function disableAllButtons(){
    let buttonList = document.querySelectorAll('.gameButton');
    // iterates over every button and disables the onclick function
    for(let button of buttonList){
        button.onclick = '';
    }
}
// enables buttons after disabling them
function enableAllButtons(){
    let buttonList = document.querySelectorAll('.gameButton');
    // iterates over every button and gives it the revealCard function onclick
    for(let buttonIndex = 1;buttonIndex<=buttonList.length;buttonIndex++){
        buttonList[buttonIndex-1].onclick = function () {
            revealCard(buttonIndex);
        }
    }
}

// if the cards are mistaken it flips the cards after 1 second
function flipCards(){
    document.querySelector(`#button${openCard1Id}`).style.display = 'block';
    document.querySelector(`#img${openCard1Id}`).style.display = 'none';
    document.querySelector(`#button${openCard2Id}`).style.display = 'block';
    document.querySelector(`#img${openCard2Id}`).style.display = 'none';
    enableAllButtons()
}

// if the player won it adds their stats to the table
function addGameHistory() {
    const gameHistory = {
        name: playerName.value,
        numberOfMoves: moves,
        numberOfMistakes: mistakes,
        time: totalTime, 
    };
    gamesHistory.push(gameHistory);
}
// on button click it creates the history table
function showHistory() {
    const tableOfHistory = document.querySelector('#historyTable');
    tableOfHistory.innerHTML = '<tr><th>Player name</th><th>Number of moves</th><th>Number of mistakes</th><th>Time taken</th></tr>';
    for (const gameHistory of gamesHistory) {
        // creates a table row with stats from the gameHistory list
        const historyEntry = `<tr><td>${gameHistory.name}</td><td>${gameHistory.numberOfMoves}</td><td>${gameHistory.numberOfMistakes}</td><td>${gameHistory.time} seconds</td></tr>`;
        tableOfHistory.innerHTML += historyEntry;
    }
}
// resets all the vars when the new game button is pressed
function newGame(){
    openCardCounter = 0;
    openCard1Id = 0;
    openCard2Id = 0;
    score = 0;
    mistakes = 0;
    moves = 0;
    playerName.value = '';
    updateMovesAndMistakes();
    document.querySelector(".board").innerHTML = "";
    document.querySelector(".board").style.gridTemplateColumns = "";
    document.querySelector('.getDetails').style.display = 'flex';
    document.querySelector('.initPage').style.display = 'none';
    document.querySelector('.board').style.display = 'none';
    document.querySelector('.utilityButtons').style.display = 'none';
    document.querySelector('.top').style.display = 'none'
    let winAnnounce = document.querySelector('#winMessage');
    winAnnounce.innerText = '';
    const tableOfHistory = document.querySelector('#historyTable')
    tableOfHistory.innerHTML = '';
    stopTimer();
    document.querySelector("#timer").textContent = "Timer: 00:00";
}