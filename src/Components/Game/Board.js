import { useEffect, useState } from "react";

import Card from '../UI/Card'

import styles from './Board.module.css'

const Board = (props) => {  
  return (
    <>
      {true && (
        <Card className={styles.board}>
            {props.puzzle.map((cell, i) => (
                    cell
            ))}
        </Card>
      )}
    </>
  );
};

export default Board;
