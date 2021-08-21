import { useState, useEffect } from "react";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import DifficultySelector from "./DifficultySelector";
import Board from "./Board";
import Button from "../UI/Button";
import Cell from "./Cell";

const DIFFICULTY_RATING = {
  Easy: 0.85,
  Medium: 2,
  Hard: Infinity,
};

const Game = (props) => {
  const [difficulty, setDifficulty] = useState("");
  const [puzzleJSX, setPuzzleJSX] = useState([]);

  const handleReset = (event) => {
    setDifficulty("");
    setPuzzleJSX([]);
  };

  useEffect(() => {
    if (!difficulty) {
      return;
    }
    let candidatePuzzle = [];
    let candidateRating = 0;

    do {
      candidatePuzzle = makepuzzle();
      candidateRating = ratepuzzle(candidatePuzzle, 20);
    } while (candidateRating >= DIFFICULTY_RATING[difficulty]);

    setPuzzleJSX(BuildPuzzle(candidatePuzzle));
  }, [difficulty]);

  const BuildPuzzle = (puzz) => {
    let JSXAccumulator = [];
    let puzzleRow = [];
    for (let i = 0; i < puzz.length; i++) {
      let classes = ["cell"];
      if (i > 71) {
        classes.push("bottom");
      }
      if ((i + 1) % 9 === 0) {
        classes.push("right");
      }
      if (puzz[i] === null) {
        puzzleRow.push(<Cell classList={classes} value={""} key={i} />);
      } else {
        classes.push("given");
        puzzleRow.push(
          <Cell classList={classes} value={puzz[i] + 1} key={i} />
        );
      }
      if (puzzleRow.length === 9) {
        JSXAccumulator.push(puzzleRow);
        puzzleRow = [];
      }
    }
    return JSXAccumulator;
  };

  return (
    <>
      {!difficulty && <DifficultySelector onDifficultySelect={setDifficulty} />}
      {difficulty && <Board puzzle={puzzleJSX}></Board>}
      {difficulty && <Button onClick={handleReset}>Reset</Button>}
    </>
  );
};

export default Game;
