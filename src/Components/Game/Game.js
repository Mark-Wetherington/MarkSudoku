import { useState, useEffect } from "react";

import Board from "./Board";
import Button from "../UI/Button";

const Game = (props) => {
  const [initialData, setinitialData] = useState(null);

  const requestURL = "new/";
  useEffect(() => {
    const fetchAPI = async () => {
      await fetch(requestURL)
        .then((response) => response.json())
        .then((data) =>
          setinitialData(() => {
            //console.log(data);
            return data;
          })
        )
        .catch((error) => console.log(error));
    };

    fetchAPI();
  }, []);

  return (
    <>
      {initialData && <Board initialData={initialData}></Board>}
      <Button onClick={props.onReset}>Reset</Button>
    </>
  );
};

export default Game;
