import { useState } from "react";

import Card from "./UI/Card";
import Button from "./UI/Button";

import styles from "./DifficultySelector.module.css";

const DifficultySelector = (props) => {
  const [difficulty, setDifficulty] = useState(null);

  const handleClick = (event) => {
    setDifficulty(event.target.innerText);
  };

  return (
    <Card className={styles.difficulty}>
      <Button className={styles.easy} onClick={handleClick}>
        Easy
      </Button>
      <Button className={styles.medium} onClick={handleClick}>Medium</Button>
      <Button className={styles.hard} onClick={handleClick}>Hard</Button>
    </Card>
  );
};

export default DifficultySelector;
