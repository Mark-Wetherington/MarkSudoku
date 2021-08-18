import { useState, useEffect } from "react";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import DifficultySelector from "./DifficultySelector";
import Board from "./Board";
import Button from "../UI/Button";
import Cell from "./Cell";

const Game = (props) => {
  const [puzzle, setPuzzle] = useState([]);
  const [difficulty, setDifficulty] = useState("");

  const handleReset = (event) => {
    setDifficulty((prevState, props) => {
      return "";
    });
  };

  useEffect(() => {
    setPuzzle(makepuzzle());
//    while (ratepuzzle(puzzle, 4000));
  }, []);

  const ConvertPuzzleTo2D = (puzz) => {
    let puzzle2D = [];
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
        puzzleRow.push(
          <Cell classList={classes} value={puzz[i] + 1} key={i} />
        );
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
      {!difficulty && <DifficultySelector onDifficultySelect={setDifficulty} />}
      {difficulty && <Board puzzle={ConvertPuzzleTo2D(puzzle)}></Board>}
      {difficulty && <Button onClick={handleReset}>Reset</Button>}
    </>
  );
};

export default Game;
