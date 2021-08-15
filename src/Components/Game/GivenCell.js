import styles from "./Cell.module.css";

const GivenCell = (props) => {
  return <div className={styles["given-cell"]}>{props.children}</div>;
};

export default GivenCell;
