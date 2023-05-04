// Check Winner 
function checkWinner(gameState) {
  // gameState is an array of 0 and 1 and null
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (gameState[a] == gameState[b] && gameState[a] == gameState[c] && gameState[a] != null) 
      return gameState[a] == 1 ? "X" : "O"; // return the winner (0 or 1)
  }
  return null;
}

// React Component: Square
const Square = ({id, player, newState, winner}) => {
  const [color, setColor] = React.useState("green");
  const [status, setStatus] = React.useState(null); // am I an X or an O? 
  const xo = ["o", "x"];
  const palet = ["red","green"];
  /*React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });*/

  return (
    <button 
      onClick={e => {
        if(status === null && winner === null) {
          let col = palet[player];
          setColor(col);
          let whoplayed = newState(id);
          setStatus(whoplayed);
          e.target.style.background = col;
        }
      }}
    >
      <h1>{xo[status]}</h1>
    </button>
  )
}

// React Component: Board
const Board = () => {
  const [boardKey, setBoardKey] = React.useState(0);
  // 1st player is X ie 1
  // State keeps track of current player and gameState
  const [player, setPlayer] = React.useState(1);
  // Set overall game state here
  const [gameState, setGameState] = React.useState(Array(9).fill(null));
  // Use conditional logic to set a variable to either 'Player O' or  'Player X'
  const currentPlayer = player == 1 ? "Player X" : "Player O"; 
  let status = `Next turn: ${currentPlayer}`;  
  let winner = checkWinner(gameState);
  if(winner != null) status = `Player ${winner} wins!`;

  /*React.useEffect(() => {
    console.log(`board rendered`);
    return () => console.log(`unmounting board`);
  });*/

  // Function to update gameState
  const newState = idOfSquare => {
    let thePlayer = player;
    gameState[idOfSquare] = player; // gives that square to current player
    setGameState(gameState); // gameState is array of 0 or 1 or null
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    return thePlayer; // return the current player who just took the turn
  };
  // Render Squares
  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState} winner={winner}></Square>;
  }
  // Reset Board 
  function resetBoard () {
    setGameState(Array(9).fill(null));
    setBoardKey((boardKey + 1) % 2);
    setPlayer(1);
  }
  return (
    <div key={boardKey} className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
        <button onClick={resetBoard}>Clear Board</button>
      </div>
    </div>
  );
};

// ========================================
ReactDOM.render(<Board />, document.getElementById("root"));