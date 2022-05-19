import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

type SquareProps = {
  value: string;
  onClick: () => void;
};

const Square = (props: SquareProps) => <button className="square" onClick={props.onClick}>{props.value}</button>


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
      const squareIndex = (b * size) + i;
      row.push(<Square key={ squareIndex } value={ props.squares[squareIndex] } onClick={ () => props.onClick(squareIndex) }/>)
    }
    board.push(<div key={b} className='board-row'>{row}</div>);
  }

  return (
    <div>
      {board}
    </div>
  );
};

type BoardState = {
  squares: string[];
};

const Game = () => {
  const [history, setHistory] = useState<BoardState[]>([{ squares: Array<string>(9).fill('') }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1)
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();


    if (calculateWinner(squares) || squares[i]) return;
      
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step: number) => {
    setXIsNext(step % 2 === 0);
    setStepNumber(step);
  }

  const moves = history.map((step: BoardState, move: number) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) status = `Winner: ${winner}`;
  else status = `Next Player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Game />);

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
