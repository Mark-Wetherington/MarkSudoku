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

let shuffledIndeces = [];
for (let i = 0; i < 81; i++) {
  shuffledIndeces.push(i);
}
for (let i = 80; i >= 0; i--) {
  let m = Math.floor(Math.random() * i);
  let temp = shuffledIndeces[i];
  shuffledIndeces[i] = shuffledIndeces[m];
  shuffledIndeces[m] = temp;
}

const Game = (props) => {
  const [solution, setSolution] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [puzzle, setPuzzle] = useState([]);
  const [attempt, setAttempt] = useState([]);
  const [modalState, setModalState] = useState(null);

  const handleSubmit = (event) => {
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] !== attempt[i]) {
        setModalState({
          message: "Incorrect solution.",
          onConfirm: resetPuzzle,
        });
        return;
      }
    }
    setModalState({
      message: "Correct solution!",
      onConfirm: resetPuzzle,
    });
  };

  const handleHint = () => {
    for (let i = 0; i < solution.length; i++) {
      if (attempt[shuffledIndeces[i]] !== solution[shuffledIndeces[i]]) {
        handleAttempt(shuffledIndeces[i], solution[shuffledIndeces[i]]);
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
      buttons: [
        <Button key="modal-yes" onClick={resetPuzzle}>
          Yes
        </Button>,
        <Button
          key="modal-no"
          onClick={() => {
            setModalState(null);
          }}
        >
          No
        </Button>,
      ],
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
      let isGiven = puzz[i] !== null;
      puzzleRow.push(
        <Cell
          key={i}
          idx={i}
          value={attempt[i]}
          onChange={handleAttempt}
          isGiven={isGiven}
        />
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
        <Modal>
          <div>{modalState.message}</div>
          {modalState.buttons}
        </Modal>
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
