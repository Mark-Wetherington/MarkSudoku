import { useState, useEffect } from "react";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import DifficultySelector from "./DifficultySelector";
import Cell from "./Cell";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

import styles from "./Game.module.css";

const DIFFICULTY_RATING = {
  Easy: 0.85,
  Medium: 2,
  Hard: Infinity,
};

const Game = (props) => {
  const [solution, setSolution] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [puzzle, setPuzzle] = useState([]);
  const [attempt, setAttempt] = useState([]);
  const [modalState, setModalState] = useState(null);

  const handleSubmit = (event) => {
    let solutionAttempt = document.getElementsByName("sudoku-cell");
    for (let i = 0; i < solution.length; i++) {
      if (solution[i].toString() !== solutionAttempt[i].value) {
        alert("Incorrect solution");
        return;
      }
    }
    alert("Correct solution");
  };

  const handleHint = () => {
    let solutionAttempt = document.getElementsByName("sudoku-cell");
    for (let i = 0; i < solution.length; i++) {
      if (solutionAttempt[i].value !== solution[i].toString()) {
        solutionAttempt[i].value = solution[i];
        handleAttempt(i, solution[i]);
        return;
      }
    }
  };

  const clearModal = () => {
    setModalState(null);
  };

  const resetPuzzle = () => {
    clearModal();
    setDifficulty("");
    setPuzzle([]);
  };

  const handleQuit = (event) => {
    setModalState({
      message: "Are you sure you want to quit?",
      onConfirm: resetPuzzle,
    });
  };

  const handleAttempt = (idx, value) => {
    let newAttempt = [...attempt];
    newAttempt[idx] = value;
    setAttempt(newAttempt);
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
    setPuzzle(candidatePuzzle);
  }, [difficulty]);

  const BuildPuzzle = (puzz) => {
    let JSXAccumulator = [];
    let puzzleRow = [];
    for (let i = 0; i < puzz.length; i++) {
      puzzleRow.push(
        <Cell key={i} idx={i} initialValue={puzz[i]} onChange={handleAttempt} />
      );
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
      {modalState && (
        <Modal
          message={modalState.message}
          onConfirm={modalState.onConfirm}
          onCancel={clearModal}
        />
      )}
      {difficulty && (
        <>
          {
            <div className={styles.container}>
              <Card className={styles.board}>
                {BuildPuzzle(puzzle).map((row, i) => (
                  <div key={`row-${i}`}>{row.map((cell) => cell)}</div>
                ))}
              </Card>
            </div>
          }
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleHint}>Hint</Button>
          <Button onClick={handleQuit}>Quit</Button>
        </>
      )}
    </>
  );
};

export default Game;
