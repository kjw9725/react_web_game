// hooks
import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");
      timeOut.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭하세요");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      setState("waiting");
      setMessage("너무 빨랐습니다");
      clearTimeout(timeOut.current);
    } else {
      endTime.current = new Date();

      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <div>
        <div>
          <button onClick={onReset}>Reset</button>
        </div>
        평균 시간:
        {result.reduce((a, c) => a + c) / result.length}
        ms
      </div>
    );
  };

  const onReset = () => {
    setResult([]);
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};
export default ResponseCheck;

// class
// import React, { Component } from "react";

// class ResponseCheck extends Component {
//   state = {
//     state: "waiting",
//     message: "클릭해서 시작하세요",
//     result: [],
//   };

//   timeOut;
//   startTime;
//   endTime;

//   onClickScreen = () => {
//     const { state, message, result } = this.state;
//     if (state === "waiting") {
//       this.setState({
//         state: "ready",
//         message: "초록색이 되면 클릭하세요",
//       });
//       this.timeOut = setTimeout(() => {
//         this.setState({
//           state: "now",
//           message: "지금 클릭하세요",
//         });
//         this.startTime = new Date();
//       }, Math.floor(Math.random() * 1000) + 2000);
//     } else if (state === "ready") {
//       this.setState({
//         state: "waiting",
//         message: "너무 빨랐습니다",
//       });
//       clearTimeout(this.timeOut);
//     } else {
//       this.endTime = new Date();
//       this.setState((prevState) => {
//         return {
//           state: "waiting",
//           message: "클릭해서 시작하세요",
//           result: [...prevState.result, this.endTime - this.startTime],
//         };
//       });
//     }
//   };
//   renderAverage = () => {
//     const { result } = this.state;
//     return result.length === 0 ? null : (
//       <div>
//         <div>
//           <button onClick={this.onReset}>Reset</button>
//         </div>
//         평균 시간:
//         {result.reduce((a, c) => a + c) / result.length}
//         ms
//       </div>
//     );
//   };

//   onReset = () => {
//     this.setState({
//       result: [],
//     });
//   };

//   render() {
//     return (
//       <>
//         <div
//           id="screen"
//           className={this.state.state}
//           onClick={this.onClickScreen}
//         >
//           {this.state.message}
//         </div>
//         {this.renderAverage()}
//       </>
//     );
//   }
// }
// export default ResponseCheck;
