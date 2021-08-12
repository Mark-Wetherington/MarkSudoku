import { useEffect, useState } from "react";

const Board = (props) => {
  const [totalBoard, setTotalBoard] = useState(null);

  useEffect(() => {
    let cellList = [];
    let givenCell = 0;
    for (let i = 0; i < props.initialData.size; i++) {
      for (let j = 0; j < props.initialData.size; j++) {
        if (
          props.initialData.squares[givenCell] &&
          props.initialData.squares[givenCell].x === i &&
          props.initialData.squares[givenCell].y === j
        ) {
          cellList.push(props.initialData.squares[givenCell]);
          givenCell += 1;
        } else {
          cellList.push({ x: i, y: j, value: "a" });
        }
      }
    }

    let initialBoard = [];
    while (cellList.length)
      initialBoard.push(cellList.splice(0, props.initialData.size));
    console.log(initialBoard);

    setTotalBoard(() => {
      return initialBoard;
    });
  }, [props.initialData]);

  return (
    <>
      {totalBoard && (
        <table>
          <tbody>
            {totalBoard.map((row) => (
              <tr key={"row-" + row[0].x}>
                {row.map((cell) => (
                  <td key={"cell-" + cell.x.toString() + cell.y.toString()}>
                    {cell.value}
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
