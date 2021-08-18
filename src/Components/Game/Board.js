import { useEffect, useState } from "react";

import Card from '../UI/Card'

import styles from './Board.module.css'

const Board = (props) => {
  return (
    <>
      {true && (
        <Card className={styles.board}>
            {props.puzzle.map((row, i) => (
              <div className={styles.row} key={`row-${i}`}>
                {row.map((cell) => (
                    cell
                ))}
              </div>
            ))}
        </Card>
      )}
    </>
  );
};

export default Board;
