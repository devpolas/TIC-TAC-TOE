function GameOver({ name, winner, gameRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{name[winner]} won! </p>}
      {!winner && <p>It's Draw</p>}
      <p>
        <button onClick={() => gameRestart()}>Restart</button>
      </p>
    </div>
  );
}

export default GameOver;
