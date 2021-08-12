import Board from "./Board";
import Button from "../UI/Button";

const Game = (props) => {
  return (
    <>
      <Board></Board>
      <Button onClick={props.onReset}>Reset</Button>
    </>
  );
};

export default Game;
