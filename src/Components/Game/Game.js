import { useState, useEffect } from "react";

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import Board from "./Board";
import Button from "../UI/Button";
import NewCell from "./NewCell";
import GivenCell from "./GivenCell";

const Game = (props) => {
  const [puzzle, setPuzzle] = useState([]);

  //setPuzzle(makepuzzle());
  // let puzzleData = {
  //   puzzle,
  //   solution: solvepuzzle(puzzle),
  //   difficulty: ratepuzzle(puzzle, 4),
  // };
  useEffect(() => {
    setPuzzle(makepuzzle());
  }, []);

  const ConvertPuzzleTo2D = (puzz) => {
    let puzzle2D = [];
    let puzzleRow = [];
    for (let i = 0; i < puzz.length; i++) {
      let border = "";
      if (i > 71) {
        border = "-bottom";
      }
      if ((i+1) % 9 === 0) {
        border = border.concat("-right");
      }
      if (puzz[i] === null) {
        puzzleRow.push(<NewCell type={"input" + border} value={""} key={i} />);
      } else {
        puzzleRow.push(
          <NewCell type={"given" + border} value={puzz[i] + 1} key={i} />
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
      <Board puzzle={ConvertPuzzleTo2D(puzzle)}></Board>
      <Button onClick={props.onReset}>Reset</Button>
    </>
  );
};

export default Game;
