import React, { memo, useCallback, useEffect, useRef } from "react";
import { CLICK_CELL, CHANGE_TURN } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  const ref = useRef([]);
  useEffect(() => {
    // 어느부분이 바뀌는지 검사하기위함
    console.log(
      rowIndex === ref.current[0],
      cellIndex === ref.current[1],
      dispatch === ref.current[2],
      cellData === ref.current[3]
    );
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);

  // props로 전달받는 경우 가급적 useCallback으로 감싸주는게 좋다
  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    console.log(rowIndex, cellIndex);
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
