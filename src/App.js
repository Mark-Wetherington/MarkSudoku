import Title from "./Components/Title";
import Game from "./Components/Game/Game";
import { ModalProvider } from "./Components/UI/Modal";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Title />
      <ModalProvider>
        <Game />
      </ModalProvider>
    </div>
  );
}

export default App;
