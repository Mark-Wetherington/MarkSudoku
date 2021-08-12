import Card from "./UI/Card";
import Button from "./UI/Button";

import styles from "./DifficultySelector.module.css";

const DifficultySelector = (props) => {
  return (
    <Card className={styles.difficulty}>
      <Button className={styles.easy} onClick={props.onDifficultySelect}>
        Easy
      </Button>
      <Button className={styles.medium} onClick={props.onDifficultySelect}>
        Medium
      </Button>
      <Button className={styles.hard} onClick={props.onDifficultySelect}>
        Hard
      </Button>
    </Card>
  );
};

export default DifficultySelector;
