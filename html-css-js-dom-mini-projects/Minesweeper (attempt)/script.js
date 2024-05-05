// 1.create matrix for board
// 2.populate it with tiles 
// 3.populate it with mines randomly
// 4.when clicking reveal a tile
//  a. check if tile is mine or not
//  b. check how much mines are next to the tile, the number of mines is the value of the tile
//  c. when a tile isnt next to mines it opens every tile next to it and so on
// 5. if only mines are left unrevealed the player wins (either counter for blocks or counter for open tiles)

let loseMessage = document.querySelector('.lose')
let winMessage = document.querySelector('.win')
let wrapper = document.querySelector('#wrapper')


winMessage.style.display = 'none'
loseMessage.style.display ='none'

// Define the size of the grid and number of mines
const rows = 10;
const cols = 10;
const numMines = 20;

// Create the game board
const board = document.getElementById('board');
const cells = [];
function createGameBoard(){
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.row = i; // Custom attribute to store row information
    cell.col = j; // Custom attribute to store column information
    board.appendChild(cell);
    cells.push(cell);
  }
  board.appendChild(document.createElement('br')); // Add line break after each row
}
}
createGameBoard()
// Place mines randomly
const mines = [];


let minesPlaced = 0;
while (minesPlaced < numMines) {
  // Pick a random cell
  const index = Math.floor(Math.random() * cells.length);
  const selectedCell = cells[index];
  // Check if the cell is already a mine
  if (!selectedCell.classList.contains('mine')) {
    // Mark the selected cell as a mine
    selectedCell.classList.add('mine');
    console.log(selectedCell);
    mines.push(selectedCell);
    minesPlaced++;
  }
  
}


// Handle cell click
// Loop through each cell and add event listeners
for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener('click', function() {
      if (this.classList.contains('mine')) {
        this.textContent = '💣'; // Display bomb emoji if clicked cell is a mine
        loseMessage.style.display = 'block'
        
        // Handle game over logic here
      } else {
        // Handle logic for revealing cell content
        const row = this.row;
        const col = this.col;
        const numNeighboringMines = getNumNeighboringMines(row, col);
        this.textContent = numNeighboringMines || 0; // Display number of neighboring mines
      }
    });
  }
  

// Function to count neighboring mines
function getNumNeighboringMines(row, col) {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < rows && j >= 0 && j < cols && !(i === row && j === col)) {
        const neighbor = cells.find(cell => cell.row === i && cell.col === j);
        if (neighbor && neighbor.classList.contains('mine')) {
          count++;
        }
      }
    }
  }
  return count;
}
// Handle cell click
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener('click', function() {
      if (this.classList.contains('revealed')) {
          return; // Don't do anything if the cell is already revealed
      }

      if (this.classList.contains('mine')) {
          // Handle game over logic
          this.textContent = '💣';
          loseMessage.style.display = 'block';
          return;
      } else {
          // Handle logic for revealing cell content
          revealCell(this);
      }

      // Check win condition
      const remainingNonMineCells = cells.filter(cell => !cell.classList.contains('revealed') && !cell.classList.contains('mine'));
      if (remainingNonMineCells.length === 0) {
          // All non-mine cells have been revealed, player wins
          winMessage.style.display = 'block';
      }
  });
}

// Function to recursively reveal neighboring cells
function revealCell(cell) {
  const row = cell.row;
  const col = cell.col;
  const numNeighboringMines = getNumNeighboringMines(row, col);
  cell.textContent = numNeighboringMines || ''; // Display number of neighboring mines
  cell.classList.add('revealed');
  cell.removeEventListener('click', revealCell);
  cell.style.cursor = 'auto'

  // If the cell has no neighboring mines, reveal its neighbors
  if (numNeighboringMines === 0) {
      for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
              if (i >= 0 && i < rows && j >= 0 && j < cols && !(i === row && j === col)) {
                  const neighbor = cells.find(cell => cell.row === i && cell.col === j);
                  if (neighbor && !neighbor.classList.contains('revealed')) {
                      revealCell(neighbor);
                  }
              }
          }
      }
  }
}

