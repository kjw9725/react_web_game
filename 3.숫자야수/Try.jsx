import React, { memo } from "react";

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});
// memo를 씌우면 개발자도구에서 컴포넌트이름이 이상하게 변하는데 원래대로 수정해줌
Try.displayName = "Try";
export default Try;
