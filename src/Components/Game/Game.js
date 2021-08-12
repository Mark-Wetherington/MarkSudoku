import { useState, useEffect } from "react";

import Board from "./Board";
import Button from "../UI/Button";

const Game = (props) => {
  const [initialBoard, setInitialBoard] = useState(null);

  const requestURL = "new/";
  useEffect(() => {
    fetch(requestURL)
      .then((response) => response.json())
      .then((data) => setInitialBoard(() => {
        return data.squares;
      }))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Board initialBoard={initialBoard}></Board>
      <Button onClick={props.onReset}>Reset</Button>
    </>
  );
};

export default Game;
