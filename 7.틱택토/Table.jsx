import React, { memo } from "react";
import Tr from "./Tr";

const Table = ({ onClick, tableData, dispatch }) => {
  return (
    <table onClick={onClick} tableData={tableData}>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr
              dispatch={dispatch}
              key={i}
              rowIndex={i}
              rowData={tableData[i]}
            />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
