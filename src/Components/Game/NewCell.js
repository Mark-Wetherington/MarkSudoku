import styles from "./Cell.module.css";

const NewCell = (props) => {
  const givenCheck = props.value ? true : false;
  const regex = /[^\d]/g;

  const blockInvalid = (event) => {
    const blockedKeys = ['e','+','-','0'];
    console.log(event.key);
    if (blockedKeys.includes(event.key) || event.target.value) {
      event.preventDefault();
    }
  };

  return (
    <input
      type="number"
      defaultValue={props.value}
      readOnly={givenCheck}
      className={styles[`${props.type}-cell`]}
      onKeyDown={blockInvalid}
      onPaste={(e)=>e.preventDefault()}
    />
  );
};

export default NewCell;
