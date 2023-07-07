import React, { memo, useContext } from "react";
import Td from "./Td";
import { TableContext } from "./MineSearch";

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);
  // console.log("tr rendered");

  return (
    <tr>
      {tableData[0] &&
        Array(tableData[0].length)
          .fill()
          .map((td, i) => <Td rowIndex={rowIndex} cellIndex={i} key={i} />)}
    </tr>
  );
});
export default Tr;
