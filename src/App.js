import { useState } from "react";

import Title from "./Components/Title";
import DifficultySelector from "./Components/DifficultySelector";
import Game from "./Components/Game/Game";

function App() {
  const [difficulty, setDifficulty] = useState('');

  const handleReset = (event) => {
    setDifficulty((prevState, props) => {
      return '';
    })
  }

  return (
    <>
    <Title />
    {!difficulty && <DifficultySelector onDifficultySelect={setDifficulty} />}
    {difficulty && <Game difficulty={difficulty} onReset={handleReset}></Game>}
    </>
  );
}

export default App;
