import { useState, useEffect } from "react";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import DifficultySelector from "./DifficultySelector";
import Cell from "./Cell";
import Button from "../UI/Button";
import Card from "../UI/Card";

import styles from "./Game.module.css";
import { floor } from "lodash";

const DIFFICULTY_RATING = {
  Easy: 0.85,
  Medium: 2,
  Hard: Infinity,
};

const Game = (props) => {
  const [solution, setSolution] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [puzzleJSX, setPuzzleJSX] = useState([]);

  const handleSubmit = (event) => {
    let solutionAttempt = document.getElementsByName("sudoku-cell");
    for (let i = 0; i < solution.length; i++) {
      if (solution[i].toString() !== solutionAttempt[i].value) {
        console.log("Incorrect solution");
        return;
      }
    }
    console.log("Correct solution");
  };

  const handleHint = () => {
    let solutionAttempt = document.getElementsByName("sudoku-cell");
    for (let i = 0; i < solution.length; i++) {
      if (solutionAttempt[i].value !== solution[i].toString()) {
        solutionAttempt[i].value = solution[i];
        return;
      }
    }
  };

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

    setSolution(solvepuzzle(candidatePuzzle).map((x) => x + 1));
    setPuzzleJSX(BuildPuzzle(candidatePuzzle));
  }, [difficulty]);

  const BuildPuzzle = (puzz) => {
    let JSXAccumulator = [];
    let puzzleRow = [];
    for (let i = 0; i < puzz.length; i++) {
      let classes = ["cell"];
      if (i % 9 === 0 || i % 9 === 3 || i % 9 === 6) {
        classes.push("block-left");
      }
      if (i % 9 === 8) {
        classes.push("block-right");
      }
      if (Math.floor(i / 9) === 0) {
        classes.push("block-top");
      }
      if (Math.floor(i / 9) === 3) {
        classes.push("block-top");
      }
      if (Math.floor(i / 9) === 6) {
        classes.push("block-top");
      }
      if (Math.floor(i / 9) === 8) {
        classes.push("block-bottom");
      }
      if (i % 9 === 8) {
        classes.push("block-right");
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
      {difficulty && (
        <>
          {
            <div className={styles.container}>
              <Card className={styles.board}>
                {puzzleJSX.map((row, i) => (
                  <div className={styles.row} key={`row-${i}`}>
                    {row.map((cell) => cell)}
                  </div>
                ))}
              </Card>
            </div>
          }
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleHint}>Hint</Button>
          <Button onClick={handleReset}>Reset</Button>
        </>
      )}
    </>
  );
};

export default Game;
