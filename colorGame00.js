const Square = ({id, player, newState}) => {
  const [color, setColor] = React.useState("green");
  const [status, setStatus] = React.useState(null); // am I an X or an O? 
  const xo = ["o", "x"];
  
  const palet = ["red","blue","green"];
  const getRandomColor = () => palet[Math.floor(Math.random()*3)];
  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });

  return (
    <button 
      onClick={e => {
        if(status === null) {
          let col = getRandomColor();
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
  const [player, setPlayer] = React.useState(1);
  let status = `Player ${player}`;
  // Set overall game state here
  const [state, setState] = React.useState([]); 
  // Function to set new game state
  const newState = (ob) => {
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    setState([...state, ob]);
    console.log(`Adding state ${JSON.stringify(state)}`);
    status = `Player ${nextplayer}`;
    return nextplayer;
  };
  // Other functions we need
  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
