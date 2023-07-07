import React, { useRef, useState, useEffect } from "react";
import useInterval from "./useInterval";

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// -> (setState/props 바뀔때 -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸
const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};
const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState("0");
  const [score, setScore] = useState(0);
  // 밑에 useEffect 대채
  const [isRunning, setRunning] = useState(true);

  // useEffect(() => {
  //   // componentDieMount, ComponentDidUpdate 역할 (1대1 대응은 아님)
  //   interval.current = setInterval(changeHand(), 100);
  //   return () => {
  //     clearInterval(interval.current);
  //   };
  // }, [imgCoord]); // 바꾸고 싶은 코드를 []안에 추가

  //                       result, imgCoord, score
  // componentDidMount
  // componentDidUpdate
  // componentWillUnmount

  // class
  // componentDidMount(){
  //   this.state({
  //     imgCoord: 1,
  //     score: 1,
  //     result: 3
  //   })
  // }

  // Hooks
  // useEffect(() =>{
  //   setImgCoord();
  //   setScore();
  // }, [imgCoord, score]);
  // useEffect(() =>{
  //   setResult();
  // }, [result])

  const changeHand = () => {
    if (imgCoord == rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord == rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else {
      setImgCoord(rspCoords.바위);
    }
  };

  useInterval(changeHand, isRunning ? 100 : null);

  const onClickBtn = (choice) => () => {
    if (isRunning) {
      setRunning(false);
      // interval.current = "null";
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult("비겼습니다!");
      } else if ([-1, 2].includes(diff)) {
        setResult("이겼습니다!");
        setScore((precScore) => precScore + 1);
      } else {
        setResult("졌습니다!");
        setScore((precScore) => precScore - 1);
      }
      setTimeout(() => {
        setRunning(true);
      }, 1000);
    }
  };
  return (
    <>
      <div
        style={{
          background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
        className="rspImg"
      ></div>
      <button id="rock" onClick={onClickBtn("바위")}>
        바위
      </button>
      <button id="scissor" onClick={onClickBtn("가위")}>
        가위
      </button>
      <button id="paper" onClick={onClickBtn("보")}>
        보
      </button>
      <div>{result}</div>
      <div>{score}점</div>
    </>
  );
};
export default RSP;
