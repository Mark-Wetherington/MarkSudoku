import { useState, useEffect } from "react";
import { useModal, Modal } from "../UI/Modal";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import DifficultySelector from "./DifficultySelector";
import Cell from "./Cell";
import Button from "../UI/Button";
import Card from "../UI/Card";
//import Modal from "../UI/Modal";

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
  const { activeModal, setActiveModal } = useModal();

  const handleSubmit = (event) => {
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] !== attempt[i]) {
        setActiveModal("failure-modal");
        return;
      }
    }
    setActiveModal("success-modal");
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
    setActiveModal(null);
  };

  const resetPuzzle = () => {
    clearModal();
    setDifficulty("");
    setPuzzle([]);
  };

  const handleQuit = (event) => {
    setActiveModal("quit-modal");
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
      <Modal modalName="success-modal">
        <div>Correct! Great job!</div>
        <Button onClick={resetPuzzle}>Main Menu</Button>
      </Modal>
      <Modal modalName="failure-modal">
        <div>Incorrect. Keep trying!</div>
        <Button onClick={clearModal}>Okay</Button>
      </Modal>
      <Modal modalName="quit-modal">
        <div>Are you sure you want to quit?</div>
        <Button onClick={resetPuzzle}>Yes</Button>
        <Button onClick={clearModal}>No</Button>
      </Modal>
      {!difficulty && <DifficultySelector onDifficultySelect={setDifficulty} />}
      {difficulty && (
        <>
          <div className={styles[`game-container`]}>
            <Card className={styles.board}>
              {BuildPuzzle(puzzle).map((row, i) => (
                <div key={`row-${i}`}>{row.map((cell) => cell)}</div>
              ))}
            </Card>
          </div>
          <div className={styles[`btn-container`]}>
            <Button className={styles[`game-btn`]} onClick={handleSubmit}>
              Submit
            </Button>
            <Button className={styles[`game-btn`]} onClick={handleHint}>
              Hint
            </Button>
            <Button className={styles[`game-btn`]} onClick={handleQuit}>
              Quit
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Game;
