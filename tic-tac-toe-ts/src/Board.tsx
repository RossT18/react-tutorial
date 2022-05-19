import './index.css';

// Square Component ==========

type SquareProps = {
  value: string;
  onClick: () => void;
};

const Square = (props: SquareProps) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

// Board Component ==========

type BoardProps = {
  squares: string[];
  onClick: (i: number) => void;
};

const Board = (props: BoardProps) => {
  const size = 3;
  const board = [];

  for (let b = 0; b < size; b++) {
    const row = [];
    for (let i = 0; i < size; i++) {
      const squareIndex = b * size + i;
      row.push(
        <Square key={squareIndex} value={props.squares[squareIndex]} onClick={() => props.onClick(squareIndex)} />
      );
    }
    board.push(
      <div key={b} className="board-row">
        {row}
      </div>
    );
  }

  return <div>{board}</div>;
};

export { Square, Board };
