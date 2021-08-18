import { useState, useEffect } from "react";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import DifficultySelector from "./DifficultySelector";
import Board from "./Board";
import Button from "../UI/Button";
import Cell from "./Cell";

const Game = (props) => {
  const [puzzle, setPuzzle] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [puzzleJSX, setPuzzleJSX] = useState([]);

  const handleReset = (event) => {
    setDifficulty((prevState, props) => {
      return "";
    });
  };

  useEffect(() => {
    if (!difficulty) {
      setPuzzle(makepuzzle());
      return;
    }
    let check = false;
    while (check === false) {
      let difficultyRating = ratepuzzle(puzzle, 400);
      console.log(check);
      console.log(difficultyRating);
      console.log(difficulty);
      if (difficultyRating < 0.85 && difficulty === "Easy") {
        check = true;
        setPuzzleJSX(BuildPuzzle(puzzle));
        console.log(check);
      } else if (difficultyRating < 2 && difficulty === "Medium") {
        check = true;
        setPuzzleJSX(BuildPuzzle(puzzle));
        console.log(check);
      } else if (difficulty === "Hard") {
        check = true;
        setPuzzleJSX(BuildPuzzle(puzzle));
        console.log(check);
      } else {
        console.log(check);
        setPuzzle(makepuzzle());
      }
    }
  }, [difficulty]); // Should only include difficulty, despite ESLint

  const BuildPuzzle = (puzz) => {
    let puzzleJSX = [];
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
        puzzleJSX.push(puzzleRow);
        puzzleRow = [];
      }
    }
    return puzzleJSX;
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
