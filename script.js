
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
      
    if(! board[row][column].getValue()!==0)  return 

    board[row][column].addToken(player);
        
   }

   const printBoard = () =>{
    const boardWithCellValues = board.map((row)=>
     row.map((cell) => cell.getValue()));
    console.log(boardWithCellValues);
   }

   return { getBoard, dropToken, printBoard }
}


function Cell() {
    let value =0;

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
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ]

    let activePlayer = players[0];

    const switchPlayerTurn = ()=> { 
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
   }

   const getActivePlayer = () => activePlayer;

   const printNewRound = () =>{
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`)
   }

   const playRound = (column, row) => {

     console.log( `Dropping ${getActivePlayer().name}'s token into column ${column}, row${row}`);
     board.dropToken(column, row, getActivePlayer().token)

     switchPlayerTurn();
     printNewRound();

   };

   printNewRound();

   return {
    playRound,
    getActivePlayer
   }
  
}

const game = GameController();

