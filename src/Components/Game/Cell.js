import styles from "./Cell.module.css";

const Cell = (props) => {
  const givenCheck = props.value ? true : false;

  const blockInvalid = (event) => {
    const blockedKeys = ["e", "+", "-", "0", "."];
    if (blockedKeys.includes(event.key) || event.target.value) {
      event.preventDefault();
    }
  };

  return (
    <input
      type="number"
      name="sudoku-cell"
      defaultValue={props.value}
      readOnly={givenCheck}
      className={props.classList
        .map((thisClass) => styles[`${thisClass}`])
        .join(" ")}
      onKeyDown={blockInvalid}
      onPaste={(e) => e.preventDefault()}
    />
  );
};

export default Cell;
