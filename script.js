
function Gameboard() {
   let rows = 3;
   let columns = 3;
   const board = [];
   
   for(let i =0; i<rows; i++) {
       board = [];
       for(let j =0; j<columns; j++) {
        board[i].push(Cell())
       } 
   }

   const getBoard = () => board;

   const dropToken =(column,row, player) =>{
      
    if(! board[row][column].getValue()===0) return 

    board[row][column].addToken(player);
        
   }

   const printBoard = () =>{
    const boardWithCellValues = board.map((row)=>
     row.map((cell) => cell.getValue()));
    console.log(boardWithCellValues);
   }

   return (getBoard, dropToken, printBoard)
}




