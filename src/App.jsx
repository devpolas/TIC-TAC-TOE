import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handelActivePlayer(rowIndex, colIndex) {
    setActivePlayer((curr) => (curr === "X" ? "O" : "X"));
    setGameTurn((preTurn) => {
      let currentPlayer = "X";
      if (preTurn.length > 0 && preTurn[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preTurn,
      ];
      return updatedTurn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Polas" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Tithi" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard
          gameTurn={gameTurn}
          handelActivePlayer={handelActivePlayer}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
