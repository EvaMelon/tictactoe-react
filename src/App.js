import React, { Component } from 'react';
import classNames from 'classnames';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">tic tac toe</h1>
        </header>
        <Game />
      </div>
    );
  }
}

function Field(props) {
  return (
    <button 
      className={classNames({
        "field": true,
        "full": props.value,
        "empty": !props.value,
        "won": props.won,
        "full-x": props.value=="X",
        "full-o": props.value=="O"
      })}
      onClick={(props.onClick)}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const fields = this.state.squares.slice();
    if (calculateWinner(fields).winner || fields[i]) {
      return;
    }
    fields[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: fields,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderField(i, winningMove) {
    return (
      <Field
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        won={winningMove.includes(i) ? true : false}
      />
    );
  }

  render() {

    const { winner, winningMove } = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className={(this.state.xIsNext ? 'next-x' : 'next-o')}>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderField(0, winningMove)}
          {this.renderField(1, winningMove)}
          {this.renderField(2, winningMove)}
        </div>
        <div className="board-row">
          {this.renderField(3, winningMove)}
          {this.renderField(4, winningMove)}
          {this.renderField(5, winningMove)}
        </div>
        <div className="board-row">
          {this.renderField(6, winningMove)}
          {this.renderField(7, winningMove)}
          {this.renderField(8, winningMove)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a , b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningMove: lines[i]
      };
    }
  }
  return {
    winner:null,
    winningMove: []
  };
}

export default App;
