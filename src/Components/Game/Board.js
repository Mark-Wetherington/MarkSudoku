import { useEffect, useState } from "react";

import Card from '../UI/Card'

import styles from './Board.module.css'

const Board = (props) => {  
  return (
    <>
      {true && (
        <Card className={styles.board}>
            {props.puzzle.map((row, i) => (
              <div key={`row-${i}`}>
                {row.map((cell, j) => (
                  <div className={styles['board-cell']} key={`cell-${i}-${j}`}>
                    {cell}
                  </div>
                ))}
              </div>
            ))}
        </Card>
      )}
    </>
  );
};

export default Board;
