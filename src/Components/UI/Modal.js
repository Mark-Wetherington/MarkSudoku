import ReactDOM from "react-dom";

import Card from "./Card";
import styles from "./Modal.module.css";

const Popup = (props) => {
  console.log(props.modalJSX);
  return <Card className={styles.modal}>{props.modalJSX}</Card>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}></div>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Popup modalJSX={props.children} />,
        document.getElementById("popup-root")
      )}
    </>
  );
};

export default Modal;
