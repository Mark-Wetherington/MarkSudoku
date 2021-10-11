import styles from "./Cell.module.css";

const ALLOWED_KEYS = ["Delete", "Backspace"];

const Cell = (props) => {
  const validateInput = (event) => {
    if (isNaN(Number(event.key)) && !ALLOWED_KEYS.includes(event.key)) {
      event.preventDefault();
    }
  };

  let classList = ["cell"];
  if (props.isGiven) {
    classList.push("given");
  }

  return (
    <input
      type="number"
      name="sudoku-cell"
      min="1"
      max="9"
      step="1"
      defaultValue={props.value}
      readOnly={props.isGiven}
      className={classList.map((thisClass) => styles[`${thisClass}`]).join(" ")}
      autoComplete="off"
      onKeyDown={validateInput}
      onPaste={(e) => e.preventDefault()}
      onChange={(e) => {
        if (e.target.value.length > 1) {
          e.target.value = e.target.value % 10;
        }
        props.onChange(props.idx, Number(e.target.value));
      }}
    />
  );
};

export default Cell;
