import React, { memo, useContext } from "react";
import Tr from "./Tr";
import { TableContext } from "./MineSearch";

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  // console.log("table rendered");
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr rowIndex={i} key={i} />
          ))}
      </tbody>
    </table>
  );
});
export default Table;
