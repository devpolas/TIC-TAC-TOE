import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { initialGameBoard } from "./components/initialGameBoard";
import { WINNING_COMBINATIONS } from "./components/wining";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "PLAYER 1",
  O: "PLAYER 2",
};
function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;
  for (const win of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[win[0].row][win[0].column];
    const secondSquareSymbol = gameBoard[win[1].row][win[1].column];
    const thirdSquareSymbol = gameBoard[win[2].row][win[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;
  function handelActivePlayer(rowIndex, colIndex) {
    setGameTurn((preTurn) => {
      const currentPlayer = deriveActivePlayer(gameTurn);
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preTurn,
      ];
      return updatedTurn;
    });
  }

  function managePlayersName(symbol, name) {
    setPlayers((previousName) => {
      return {
        ...previousName,
        [symbol]: name,
      };
    });
  }

  function gameRestart() {
    setGameTurn([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            managePlayersName={managePlayersName}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            managePlayersName={managePlayersName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver name={players} gameRestart={gameRestart} winner={winner} />
        )}
        <GameBoard board={gameBoard} handelActivePlayer={handelActivePlayer} />
      </div>
      <Log turn={gameTurn} />
    </main>
  );
}

export default App;
