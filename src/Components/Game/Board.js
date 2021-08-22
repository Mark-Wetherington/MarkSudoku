import Card from "../UI/Card";

import styles from "./Board.module.css";

const Board = (props) => {
  return (
    <>
      {true && (
        <div className={styles.container}>
          <Card className={styles.board}>
            {props.puzzle.map((row, i) => (
              <div className={styles.row} key={`row-${i}`}>
                {row.map((cell) => cell)}
              </div>
            ))}
          </Card>
        </div>
      )}
    </>
  );
};

export default Board;
