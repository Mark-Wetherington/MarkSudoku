import styles from "./Cell.module.css";

const ALLOWED_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const Cell = (props) => {
  const givenCheck = props.value ? true : false;

  const blockInvalid = (event) => {
    if (!ALLOWED_KEYS.includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <input
      type="text"
      name="sudoku-cell"
      pattern="[1-9]"
      maxLength="1"
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
