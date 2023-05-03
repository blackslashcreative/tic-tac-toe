const Square = ({id, player, newState}) => {
  const [color, setColor] = React.useState("green");
  const [status, setStatus] = React.useState(null); // am I an X or an O? 
  const xo = ["o", "x"];
  const palet = ["red","green"];
  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });

  return (
    <button 
      onClick={e => {
        if(status === null) {
          let col = palet[player];
          setColor(col);
          let nextplayer = newState({id:id, color:col});
          setStatus(nextplayer);
          e.target.style.background = col;
        }
      }}
    >
      <h1>{xo[status]}</h1>
    </button>
  )
}
const Board = () => {
  const [boardKey, setBoardKey] = React.useState(0);
  const [player, setPlayer] = React.useState(1);
  let status = `Player ${player}`;
  // Set overall game state here
  const [state, setState] = React.useState([]); 
  // Function to update game state
  const newState = (ob) => {
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    setState([...state, ob]);
    console.log(`Adding state ${JSON.stringify(state)}`);
    status = `Player ${nextplayer}`;
    return nextplayer;
  };
  // Render Squares
  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>;
  }
  // Reset Board 
  function resetBoard () {
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
