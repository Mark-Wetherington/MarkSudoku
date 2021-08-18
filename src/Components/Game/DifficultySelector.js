import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./DifficultySelector.module.css";

const DifficultySelector = (props) => {  
  const DifficultySet = (event) => {
    props.onDifficultySelect(event.target.innerHTML);
  }

  return (
    <Card className={styles.difficulty}>
      <Button className={styles.easy} onClick={DifficultySet}>
        Easy
      </Button>
      <Button className={styles.medium} onClick={DifficultySet}>
        Medium
      </Button>
      <Button className={styles.hard} onClick={DifficultySet}>
        Hard
      </Button>
    </Card>
  );
};

export default DifficultySelector;
