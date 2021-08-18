import { useState } from "react";

import Title from "./Components/Title";
import Game from "./Components/Game/Game";

function App() {
  return (
    <>
      <Title />
      <Game />
    </>
  );
}

export default App;

/* To Do:
Move DS to Game
Rename and move ConvertPuzzleTo2D to Board
Switch inputs to text instead of number
*/
