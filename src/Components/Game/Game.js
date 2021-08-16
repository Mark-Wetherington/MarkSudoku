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

  const PuzzleRenderer = (puzz) => {
    let puzzleRendering = [];
    for (let i = 0; i < puzz.length; i++) {
      if (puzz[i]===null) {
        puzzleRendering.push(<NewCell type={'input'} value={''} key={i} />);
      } else {
        puzzleRendering.push(<NewCell type={'given'} value={puzz[i]} key={i} />);
      }
    }
    return puzzleRendering;
  };

  return (
    <>
      <Board puzzle={PuzzleRenderer(puzzle)}></Board>
      <Button onClick={props.onReset}>Reset</Button>
    </>
  );
};

export default Game;
