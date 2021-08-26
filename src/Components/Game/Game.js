import { useState, useEffect } from "react";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import DifficultySelector from "./DifficultySelector";
import Cell from "./Cell";
import Button from "../UI/Button";
import Card from "../UI/Card";

import styles from "./Game.module.css";

const DIFFICULTY_RATING = {
  Easy: 0.85,
  Medium: 2,
  Hard: Infinity,
};

const Game = (props) => {
  const [solution, setSolution] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [puzzleJSX, setPuzzleJSX] = useState([]);
  const [attempt, setAttempt] = useState([]);

  const handleSubmit = (event) => {
    console.log(attempt);
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
    console.log(attempt);
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

  const handleAttempt = (idx, value) => {
    console.log(idx, value);
    console.log(attempt);
    //let newAttempt = attempt;
    //newAttempt[idx] = value;
    //console.log(newAttempt);
    //setAttempt(newAttempt);
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

    setAttempt(candidatePuzzle.map((x) => (x !== null ? x + 1 : null)));
    setSolution(solvepuzzle(candidatePuzzle).map((x) => x + 1));
    setPuzzleJSX(BuildPuzzle(candidatePuzzle));
  }, [difficulty]);

  const BuildPuzzle = (puzz) => {
    let JSXAccumulator = [];
    let puzzleRow = [];
    for (let i = 0; i < puzz.length; i++) {
      let classes = ["cell"];
      if (puzz[i] === null) {
        puzzleRow.push(
          <Cell
            classList={classes}
            value={""}
            key={i}
            index={i}
            onAttempt={handleAttempt}
          />
        );
      } else {
        classes.push("given");
        puzzleRow.push(
          <Cell
            classList={classes}
            value={puzz[i] + 1}
            key={i}
            index={i}
            onAttempt={handleAttempt}
          />
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
                  <div key={`row-${i}`}>{row.map((cell) => cell)}</div>
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
