const Square = ({id, player, togglePlayer}) => {
  return (
    <button onClick={togglePlayer}>
      <h1>{player}</h1>
    </button>
  )
}
const Board = () => {
  const [player, setPlayer] = React.useState(1);
  let status = `Player ${player}`;
  function renderSquare(i) {
    return <Square id={i} player={player} togglePlayer={togglePlayer}></Square>;
  }
  function togglePlayer() {
    alert(`player is: ${player}`);
    setPlayer(1 - player);
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
