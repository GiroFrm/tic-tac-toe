
function Gameboard() {
   let rows = 3;
   let columns = 3;
   const board = [];
   
   for(let i =0; i<rows; i++) {
       board[i] = [];
       for(let j =0; j<columns; j++) {
        board[i].push(Cell())
       } 
   }

   const getBoard = () => board;

   const dropToken =(column,row, player) =>{
      
    if(board[row][column].getValue()!==0)  return 

    board[row][column].addToken(player);
        
   }

   const printBoard = () =>{
    const boardWithCellValues = board.map((row)=>
     row.map((cell) => cell.getValue()));
   
   }

   return { getBoard, dropToken, printBoard }
}


function Cell() {
    let value = 0;

    const getValue = () => value;

    const addToken = (player) => {
        value =player;
    }

    return {addToken, getValue}

}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
   
    const board =Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ]

    let activePlayer = players[0];
    let gameOver = false;
    let winnertoken =null;

    const switchPlayerTurn = ()=> { 
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
   }

   const getActivePlayer = () => activePlayer;

   const printNewRound = () =>{
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`)
   }

   const checkWinner = () => {
    const b = board.getBoard().map(row => row.map(cell => cell.getValue()));

    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (b[i][0] !== 0 && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return b[i][0];
        if (b[0][i] !== 0 && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return b[0][i];
    }

    // Check diagonals
    if (b[0][0] !== 0 && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return b[0][0];
    if (b[0][2] !== 0 && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return b[0][2];

    return null;
}

   const playRound = (column, row) => {
    if(gameOver) return;

     board.dropToken(column, row, getActivePlayer().token)
     
     const winner = checkWinner();
          if(winner) {
            gameOver=true;
            winnertoken = winner
            console.log('winner: '+winner)
           return;
          }

     switchPlayerTurn();
     printNewRound();

   }
  // return winner's name;
   const getWinner = () =>{
    if(winnertoken) {
     const winnerName =   players.find(player=> player.token === winnertoken)
       return winnerName ? winnerName.name: '';
    }
     return ' ';
   } 

   printNewRound();

   return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getWinner
   }
  
}

function screenController() {
const game = GameController();
const playerTurnDiv = document.querySelector('.turn');
const winnerDiv = document.querySelector('.winner');
const boardDiv = document.querySelector('.board');

 const updateScreen = () => {

    boardDiv.textContent = ' ';

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    
    playerTurnDiv.textContent = `${activePlayer.name} ' turn`;
    winnerDiv.textContent= game.getWinner() ? `winner: ${game.getWinner()}` : '';

    board.forEach((row, rowIndex)=>
        row.forEach((cell, cellIndex)=>{
           
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.column = cellIndex
            cellButton.dataset.row = rowIndex
            let marker = cell.getValue()===0 ? ' ' : cell.getValue();
            cellButton.textContent = marker;
            boardDiv.appendChild(cellButton);
        })
    )
 }
 function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column
    const selectedRow = e.target.dataset.row

    game.playRound(selectedColumn, selectedRow);
    updateScreen();
   
}
boardDiv.addEventListener("click" , clickHandlerBoard)

 updateScreen();
}


screenController();




