function Log({ turn }) {
  return (
    <ol id="log">
      {turn.map((el) => (
        <li key={`${el.square.row}, ${el.square.col}`}>
          {el.player} selected {el.square.row}, {el.square.col}
        </li>
      ))}
    </ol>
  );
}

export default Log;
