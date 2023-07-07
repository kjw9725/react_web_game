import React, { Component } from "react";

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
class RSP extends Component {
  state = {
    result: "",
    imgCoord: "0",
    score: "0",
  };

  interval;

  componentDidMount() {
    // 컴포넌트가 첫 렌더링 된후 -> 비동기 요청을 많이함
    this.interval = setInterval(this.changeHand, 100);
  }
  // componentDidUpdate() {
  // 컴포넌트가 리렌더링된 이후
  // }
  componentWillUnmount() {
    // 컴포넌트가 실행되기 직전, 비동기 요청 정리를 많이함
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord == rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord == rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다!",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다!",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다!",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  };
  render() {
    const { result, imgCoord, score } = this.state;
    return (
      <>
        <div
          style={{
            background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
          className="rspImg"
        ></div>
        <button id="rock" onClick={this.onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" onClick={this.onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" onClick={this.onClickBtn("보")}>
          보
        </button>
        <div>{result}</div>
        <div>{score}점</div>
      </>
    );
  }
}
export default RSP;
