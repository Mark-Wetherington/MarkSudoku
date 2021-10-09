import Title from "./Components/Title";
import Game from "./Components/Game/Game";
import { ModalProvider } from "./Components/UI/Modal";

function App() {
  return (
    <>
      <Title />
      <ModalProvider>
        <Game />
      </ModalProvider>
    </>
  );
}

export default App;
