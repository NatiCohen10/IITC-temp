// defining vars to later change the vars themselves in various functions
let game_board = [];
let BOARD_LEN;
let size;
let sign;
let sign_player_1;
let sign_player_2;
let name_player_1;
let name_player_2;
let replay;
let game_board_1;
let start;
let end;
let count_game_wins = {};
let wins_player_1;
let wins_player_2;

// keeps track of the player wins
function game_win_counter(player_name, player_counter){
    // if the dictionary count_game_wins doesnt contain the player name it adds it(used to initialize the dict at the beginning of every round)
        if(!count_game_wins.hasOwnProperty(player_name)){
            count_game_wins[player_name] = 0
        }
        // if the dict has the player name, the player name is equal to the player counter, a var that counts wins for each player
        else if(count_game_wins.hasOwnProperty){
            count_game_wins[player_name] = player_counter
        }
    }

// create the game board where the logic will work
function create_game_board() {
    // user gives a number to decide he size of the board
    size = parseInt(
      prompt(
        '"Insert a number here to create a table (e.g., 3 for a 3x3 table): "'
      )
    );
    BOARD_LEN = size;
    // creates an empty row [] every time the outer loop runs until it reaches the number the player gave
    for (let i = 0; i < size; i++) {
        let row = []
        for (let j = 0; j <size; j++){
            // the inner loop pushes indexes so the board has indexes on it 
            row.push(`(${i},${j})`);
        }
        // pushing each finished row to the game board
        game_board.push(row); 
      }
      return game_board;
    }

// print the game board the players will see as a string
function print_game_board(board) {
    for (let i = 0; i < board.length; i++) {
        //create an empty row every time
        let row = "";
        // this iterates over the rows of the board, ensuring each column will have the values
        for (let j = 0; j < board[i].length; j++) {
            // adding strings, putting a | between each pair
            row += board[i][j] + " | ";
        }
        // printing the rows
        console.log(row);
        if (i < board.length - 1) {
            console.log("-".repeat(BOARD_LEN**2));
            }
        }
    }
    

function name_of_participant_sign(){
    // get the name of the players and the sign of the first player
    name_player_1 = prompt('Input the name for the first player!')
    name_player_2 = prompt('Input the name for the second player!')
    sign_player_1 = prompt('input the sign the first player would like to play').toUpperCase()

    while(true)
    // decide the sign of the second player and validation
        {if (sign_player_1 == 'X'){
            sign_player_2 = 'O'
            alert(`${name_player_1} is ${sign_player_1}.`)
            alert(`${name_player_2} is ${sign_player_2}.`)
            break
    }
        else if(sign_player_1 == 'O'){
            sign_player_2 = 'X'
            alert(`${name_player_1} is ${sign_player_1}.`)
            alert(`${name_player_2} is ${sign_player_2}.`)
            break
    }
        else{
            alert('Choose a valid input');
            sign_player_1 = prompt('input the sign the first player would like to play').toUpperCase()
    }}
}

function play_sign(sign) {
    // the players gives the coordinates of the location, the algo splits it by a , and then assigns vars to the indexes of the array. example: player inputs 2,1 -> [2,1] -> y = 2 x = 1
    let user_choice = prompt('Please choose where you want to play by index (e.g., top left is 0,0):');
    let coordinates = user_choice.split(',');
    let y = parseInt(coordinates[0].trim());
    let x = parseInt(coordinates[1].trim());

    while (true) {
        // validation, checks if x and y are numbers
        if (!isNaN(y) && !isNaN(x)) {
            // if x and y are numbers, checks if theyre in the board bounds and above or equal to 0
            if (y >= 0 && y < BOARD_LEN && x >= 0 && x < BOARD_LEN) {
                // checks if the space input is free
                if (game_board[y][x] !== 'X' && game_board[y][x] !== 'O') {
                    game_board[y][x] = `  ${sign}  `;
                    break; // exit the loop once a valid move is made
                } else {
                    // if the spot is taken the alert pops up and the user inputs again
                    alert('This spot is taken. You can\'t play there.');
                    user_choice = prompt('Please choose an available spot by index:');
                    coordinates = user_choice.split(',');
                    y = parseInt(coordinates[0].trim());
                    x = parseInt(coordinates[1].trim());
                }
            } else {
                // if the coordinates are out of bounds the alert pops
                alert('Coordinates are out of bounds.');
                user_choice = prompt('Please choose where you want to play by index:');
                coordinates = user_choice.split(',');
                y = parseInt(coordinates[0].trim());
                x = parseInt(coordinates[1].trim());
            }
        } else {
            // if the input is invalid the alert pops
            alert('Invalid input. Please enter coordinates in the format "row, column".');
            user_choice = prompt('Please choose where you want to play by index:');
            coordinates = user_choice.split(',');
            y = parseInt(coordinates[0].trim());
            x = parseInt(coordinates[1].trim());
        }
    }
    // prints the game board the user sees with the new updated values each turn
    print_game_board(game_board)
}

// checks if a row has the same sign all over it
function is_win_by_row(sign) {
  for (let row = 0; row < BOARD_LEN; row++) {
    // var result to then return true or false
    let result = true;
    for (let column = 0; column < BOARD_LEN; column++) {
        // checks the row for signs, each turn it looks for the player's sign. if the sign doesnt appear in the row the loop breaks and goes to the next row
      if (game_board[row][column] !== sign) {
        // var result is false
        result = false;
        break;
      }
    }
    // if the var result is true (an entire row is filled with the sign), the function returns true. checks for this after every row
    if (result === true) {
      return true;
    }
  }
//   returns false if the result isnt true
  return false;
}


// same as is_win_by_row, just for columns
function is_win_by_column(sign){
for (let row = 0; row<BOARD_LEN;row++){
    let result = true;
    for(let column = 0; column<BOARD_LEN;column++){
        // the only difference is the way we index here. first column and then row
        if (game_board[column][row] !== sign){
            result = false;
            break;
        }
    }
    if (result === true){
        return true;
    }
}
return false    
}


function is_win_by_diagonal_ltr(sign){
    // checks if there is a win from top left to bottom right
    for (let row = 0; row<BOARD_LEN;row++){
        // the index is the same because a diagonal win is 0,0 , 1,1 , 2,2 etc. if the player sign is not in the diagonal it breaks and returns false
        if (game_board[row][row] !== sign){
            return false;
        }}
        return true
}


function is_win_by_diagonal_rtl(sign){
    // row is the length of the board - 1, because if the length is 4 we want to start at index 3. a right to left diagonal win is from top right to bottom left
    for(let row = BOARD_LEN - 1; row>= 0;row--){
        // the logic here is different, first we take the value of row so we can start at the left top index, then we take the value of the length of the board, - 1, - row. we do this because the index for diagonal rtl win (for a 3 by 3) is 0,2, 1,1, 2,0. same logic for every other size
        if (game_board[row][BOARD_LEN - 1 - row] !== sign){
            return false;
        }
    }
    return true
}

// check if there is a win, run after every turn
function is_win(sign) {
    // checks if there is a row win or column win or either of the diagonal wins by their return values. if there is a win it returns true
    if (
        is_win_by_row(sign) === true ||
        is_win_by_column(sign) === true ||
        is_win_by_diagonal_ltr(sign) === true ||
        is_win_by_diagonal_rtl(sign) === true
    ) {
        return true;
    } else {
        return false;
    }
}

// asks the player if they want to replay the game
function replay_game_prompt(){
    replay = prompt('would you like to play again?(y/n)').toLowerCase();
    if (replay === 'y') {
        // Reset the game board and counters
        replay_game_action();
}   else if (replay === 'n') {
        alert('Goodbye!');
        return false
        }
}

// resets the game board and then runs the main function again fromthe start
function replay_game_action(){
    game_board = []
    run_game()
}

// starts counting time
function start_time_count(){
    start = new Date().getTime(); 
}
// finishes the count
function end_time_count(){
    end = new Date().getTime();
}

// calculates the time taken by doing end - start and then dividing by 1000 to get the seconds
function calculate_time_taken(){
    const time_taken = (end - start) / 100;
    alert(`It took you ${time_taken} seconds to complete this game!`)
}

// main function that runs the game
function run_game(){
    // initialize player wins
    wins_player_1 = 0;
    wins_player_2 = 0;
    // creates the board
    create_game_board()
    // creates the printed board
    print_game_board(game_board);
    // gets player names and signs
    name_of_participant_sign();
    // sets var count to 0
    game_win_counter(name_player_1,wins_player_1);
    game_win_counter(name_player_2,wins_player_2);
    let count = 0;
    // the limit is used to check for ties. the limit for every board is the max amount of moves you can possibly take in a 3x3 its 9 moves, in a 4x4 its 16 and so on
    let limit = (BOARD_LEN**2);
    // as long as the count is less than the limit, the game progresses
    while (count<limit){
        // starts counting
        start_time_count()
        alert(`its ${name_player_1}s turn`);
        // the first player plays
        play_sign(sign_player_1);
        // count + 1 after every turn
        count++;
        // checks for a win
        is_win(sign_player_1)
        // if the value of is_win is true
        if (is_win(sign_player_1)){
            // ends count
            end_time_count()
            wins_player_1++
            game_win_counter(name_player_1,wins_player_1);
            // alerts of the winner
            alert(`${name_player_1} won!`);
            // calculates time taken
            calculate_time_taken()
            console.log(count_game_wins);
            alert(`${name_player_1}:${wins_player_1} Wins, ${name_player_2}:${wins_player_2} Wins `)
            // asks for replay, if the return is false it breaks
            if (!replay_game_prompt()){
                break
            }
        }
        // if there isnt a win, checks for a tie
        else if (count === limit){
            end_time_count()
            alert('Its a Tie!')
            calculate_time_taken()
            if (!replay_game_prompt()){
                break
            }
        }
        // after player 1 finishes playing and there isnt a win or a tie, player 2 plays
        alert(`its ${name_player_2}s turn`);
        play_sign(sign_player_2);
        is_win(sign_player_2)
        count++;
        if (is_win(sign_player_2)){
            end_time_count();
            wins_player_2++;
            game_win_counter(name_player_2,wins_player_2);
            alert(`${name_player_2} won!`);
            calculate_time_taken();
            console.log(count_game_wins)
            alert(`${name_player_1}:${wins_player_1} Wins, ${name_player_2}:${wins_player_2} Wins `)
            if (!replay_game_prompt()){
                break
            }
        }
        else if (count === limit){
            end_time_count()
            alert('Its a Tie!')
            calculate_time_taken()
            if (!replay_game_prompt()){
                break
            }
        }
        
    }
    
}
// calling the main function, this starts the game
run_game()