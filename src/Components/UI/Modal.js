import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import styles from "./Modal.module.css";

const Popup = (props) => {
  return (
    <Card className={styles.modal}>
      <div>{props.message}</div>
      <Button onClick={props.onConfirm}>Yes</Button>
      <Button onClick={props.onCancel}>No</Button>
    </Card>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}></div>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Popup
          message={props.message}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
        />,
        document.getElementById("popup-root")
      )}
    </>
  );
};

export default Modal;
