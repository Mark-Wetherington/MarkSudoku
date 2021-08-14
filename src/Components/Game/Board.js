import { useEffect, useState } from "react";

const Board = (props) => {  
  // const [totalBoard, setTotalBoard] = useState(null);

  // useEffect(() => {
  //   let cellList = [];
  //   let givenCell = 0;
  //   for (let i = 0; i < props.initialData.size; i++) {
  //     for (let j = 0; j < props.initialData.size; j++) {
  //       if (
  //         props.initialData.squares[givenCell] &&
  //         props.initialData.squares[givenCell].x === i &&
  //         props.initialData.squares[givenCell].y === j
  //       ) {
  //         cellList.push(props.initialData.squares[givenCell]);
  //         givenCell += 1;
  //       } else {
  //         cellList.push({ x: i, y: j, value: "a" });
  //       }
  //     }
  //   }

  //   let initialBoard = [];
  //   while (cellList.length)
  //     initialBoard.push(cellList.splice(0, props.initialData.size));
  //   console.log(initialBoard);

  //   setTotalBoard(() => {
  //     return initialBoard;
  //   });
  // }, [props.initialData]);

  return (
    <>
      {true && (
        <table>
          <tbody>
            {props.puzzle.map((row, i) => (
              <tr key={`row-${i}`}>
                {row.map((cell, j) => (
                  <td key={`cell-${i}-${j}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Board;
