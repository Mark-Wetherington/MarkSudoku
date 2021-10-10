import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import styles from "./Modal.module.css";

const ModalContext = createContext({
  activeModal: null,
  setActiveModal: () => {},
});

export const useModal = () => React.useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const value = { activeModal, setActiveModal };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const Modal = ({ modalName, children }) => {
  return (
    <ModalContext.Consumer>
      {({ activeModal }) =>
        activeModal === modalName ? (
          <>
            {ReactDOM.createPortal(
              <div className={styles.backdrop}>
                <Card className={styles.modal}>{children}</Card>
              </div>,
              document.getElementById("modal-root")
            )}
          </>
        ) : null
      }
    </ModalContext.Consumer>
  );
};
