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
// Timer function(credit to elad)
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
    console.log("Timer stopped"); // Add a log message for debugging

  }


///////////////////
// game functions
//////////////////
function goToInitPage(){
    document.querySelector('.getDetails').style.display = 'none'
    document.querySelector('.initPage').style.display = 'flex'
}



function createBoard(sizeByUser) {
  document.querySelector(".board").style.gridTemplateColumns =
    "repeat(" + sizeByUser + ", 85px)";
  numberOfCards = sizeByUser ** 2;
  document.querySelector(".initPage").style.display = "none";
  document.querySelector(".board").style.display = 'grid';
  document.querySelector('.utilityButtons').style.display = 'flex';
  document.querySelector('.top').style.display = 'flex';
  document.querySelector('#winMessage').innerText = '';
  for (let i = 1; i <= numberOfCards; i++) {
    board.innerHTML += `<div class="card" id = "card${i}">
        <button class="gameButton" id="button${i}" onclick="revealCard(${i})"></button></div>`;
        document.querySelector(`#button${i}`).style.display = 'none'
  }
  gameCards = createCardArray();
  assignPicturesToCards();
  setTimeout(hideCards, 1000 * (sizeByUser / 2));


}

function createCardArray() {
  let cardArray = [];
  let pictureArray = [];
  let functionResultArray = [];

  // Populate pictureArray with unique picture IDs
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

    functionResultArray.push({
      card1Id: randomCard1Id,
      card2Id: randomCard2Id,
      pictureId: randomPictureId,
    });
  }

  console.log(functionResultArray);
  return functionResultArray;
}

function updateMovesAndMistakes() {
    document.querySelector("#gameMoves").textContent = "Moves: " + moves;
    document.querySelector("#gameMistakes").textContent =
      "Mistakes: " + mistakes;
  }

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

function revealCard(cardId) {
    if (openCardCounter === 0) {
        openCardCounter++;
        openCard1Id = cardId;
        document.querySelector(`#img${cardId}`).style.display = "block";
        document.querySelector(`#button${cardId}`).style.display = "none";
    } else if (openCardCounter === 1) {
        openCardCounter++;
        openCard2Id = cardId;
        document.querySelector(`#img${cardId}`).style.display = "block";
        document.querySelector(`#button${cardId}`).style.display = "none";
        moves++
        
        if (checkSimilarCards()) {
            score++;
            updateMovesAndMistakes()
            if (score === numberOfCards / 2) {
                document.querySelector('#winMessage').innerText = 'You won!'
                const endCount = new Date().getTime();
                totalTime = (endCount - startCount) / 1000
                addGameHistory()
                stopTimer()
            }
        }
        else{
            mistakes++
            disableAllButtons()
            setTimeout(flipCards, 1000);
            updateMovesAndMistakes()
        }
        

        openCardCounter = 0;
    }
}

function checkSimilarCards(){
    for(let obj of gameCards){
        if((obj.card1Id == openCard1Id && obj.card2Id == openCard2Id) ||
           (obj.card1Id == openCard2Id && obj.card2Id == openCard1Id)){
            return true;
        }
    }
    return false;
}

function disableAllButtons(){
    let buttonList = document.querySelectorAll('.gameButton');
    for(let button of buttonList){
        button.onclick = '';
    }
}

function enableAllButtons(){
    let buttonList = document.querySelectorAll('.gameButton');
    for(let buttonIndex = 1;buttonIndex<=buttonList.length;buttonIndex++){
        buttonList[buttonIndex-1].onclick = function () {
            revealCard(buttonIndex);
        }
    }
}

function flipCards(){
    document.querySelector(`#button${openCard1Id}`).style.display = 'block';
    document.querySelector(`#img${openCard1Id}`).style.display = 'none';
    document.querySelector(`#button${openCard2Id}`).style.display = 'block';
    document.querySelector(`#img${openCard2Id}`).style.display = 'none';
    enableAllButtons()
}


function addGameHistory() {
    const gameHistory = {
        name: playerName.value,
        numberOfMoves: moves,
        numberOfMistakes: mistakes,
        time: totalTime, // Assuming totalTime is correctly calculated
    };
    gamesHistory.push(gameHistory);
}

function showHistory() {
    const tableOfHistory = document.querySelector('#historyTable');
    tableOfHistory.innerHTML = '<tr><th>Player name</th><th>Number of moves</th><th>Number of mistakes</th><th>Time taken</th></tr>';
    for (const gameHistory of gamesHistory) {
        const historyEntry = `<tr><td>${gameHistory.name}</td><td>${gameHistory.numberOfMoves}</td><td>${gameHistory.numberOfMistakes}</td><td>${gameHistory.time} seconds</td></tr>`;
        tableOfHistory.innerHTML += historyEntry;
    }
}

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
    document.querySelector('.getDetails').style.display = 'flex'
    document.querySelector('.initPage').style.display = 'none'
    document.querySelector('.board').style.display = 'none'
    document.querySelector('.utilityButtons').style.display = 'none'
    document.querySelector('.top').style.display = 'none'
    let winAnnounce = document.querySelector('#winMessage');
    winAnnounce.innerText = '';
    const tableOfHistory = document.querySelector('#historyTable')
    tableOfHistory.innerHTML = '';
    stopTimer();
    document.querySelector("#timer").textContent = "Timer: 00:00";
}