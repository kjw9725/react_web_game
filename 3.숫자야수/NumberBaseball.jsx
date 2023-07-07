import React, { useCallback, useState, createRef } from "react";
import Try from "./Try";

const getNumbers = () => {
  //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};
const NumberBaseball = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  // getNumbers()로 하면 매번 실행되서 함수가 복잡해질경우에 속도저하 됨 useCallback으로 실행하면 한번만 실행됨
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (value == answer.join("")) {
      setResult("홈런");
      setAnswer(getNumbers);
      setTries([]);
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`);
        alert("게임을 다시 시작합니다!");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [
            ...prevTries,
            { try: value, result: `${strike}스트라이크 ${ball}볼` },
          ];
        });
        setValue("");
      }
    }
    inputRef.current.focus();
  });
  const onChangeInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const inputRef = createRef();

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={v.try + v.result} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};
export default NumberBaseball;
