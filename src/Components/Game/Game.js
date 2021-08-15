import { useState, useEffect } from "react";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import Board from "./Board";
import Button from "../UI/Button";
import NewCell from "./NewCell";
import GivenCell from "./GivenCell";

const Game = (props) => {
  let puzzle = makepuzzle();

  let puzzleData = {
    puzzle,
    solution: solvepuzzle(puzzle),
    difficulty: ratepuzzle(puzzle, 4),
  };

  const ConvertPuzzleTo2D = (puzz) => {
    let puzzle2D = [];
    let puzzleRow = [];
    for (let i = 0; i < puzz.length; i++) {
      if (puzz[i]===null) {
        puzzleRow.push(<NewCell type={'input'} value={''} />);
      } else {
        puzzleRow.push(<NewCell type={'given'} value={puzz[i]} />);
      }
      if (puzzleRow.length === 9) {
        puzzle2D.push(puzzleRow);
        puzzleRow = [];
      }
    }
    return puzzle2D;
  };

  return (
    <>
      <Board puzzle={ConvertPuzzleTo2D(puzzle)}></Board>
      <Button onClick={props.onReset}>Reset</Button>
    </>
  );
};

export default Game;
