import styles from "./Cell.module.css";

const ALLOWED_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const Cell = (props) => {
  const givenCheck = props.value ? true : false;

  const blockInvalid = (event) => {
    if (!ALLOWED_KEYS.includes(event.key)) {
      event.preventDefault();
    }
  };
  let classList = ["cell"];
  let initialValue = props.initialValue;
  if (props.initialValue !== null) {
    classList.push("given");
    initialValue++;
  }

  return (
    <input
      type="text"
      name="sudoku-cell"
      pattern="[1-9]"
      maxLength="1"
      defaultValue={initialValue}
      readOnly={givenCheck}
      className={classList.map((thisClass) => styles[`${thisClass}`]).join(" ")}
      autoComplete="off"
      onKeyDown={blockInvalid}
      onPaste={(e) => e.preventDefault()}
      onChange={(e) => {
        props.onChange(props.idx, Number(e.target.value));
      }}
    />
  );
};

export default Cell;
