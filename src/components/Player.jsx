import { useState } from "react";

function Player({ name, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  function handelClick() {
    setIsEditing(() => !isEditing);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            required
            onChange={(e) => setPlayerName(e.target.value)}
            defaultValue={playerName}
            type="text"
          />
        ) : (
          <span className="player-name"> {playerName} </span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => handelClick()}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}

export default Player;
