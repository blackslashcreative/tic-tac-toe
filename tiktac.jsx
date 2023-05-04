// Check Winner 
function checkWinner(state) {
  console.log(state);
  // state is an array of 0 and 1 and null
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
    console.log([a,b,c]);
    console.log(state[a], state[b], state[c]);
    if (state[a] == state[b] && state[a] == state[c] && state[a] != null) 
      return state[a]; // return the winner (0 or 1)
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
  const [player, setPlayer] = React.useState(1);
  // Set overall game state here
  const [state, setState] = React.useState(Array(9).fill(null)); 
  let status = `Player ${player}`;  
  let winner = checkWinner(state);
  if(winner != null) status = `Player ${winner} wins!`;

  /*React.useEffect(() => {
    console.log(`board rendered`);
    return () => console.log(`unmounting board`);
  });*/

  // Function to update game state
  const newState = idOfSquare => {
    let thePlayer = player;
    state[idOfSquare] = player; // gives that square to current player
    setState(state); // state is array of 0 or 1 or null
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
    setState(Array(9).fill(null));
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