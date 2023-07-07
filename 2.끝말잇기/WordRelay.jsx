// npm에서 React를 불러와 준다
const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("제로초");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === e.target.children.word.value[0]) {
      setResult("딩동댕");
      setWord(e.target.children.word.value);
      e.target.children.word.value = "";
      inputRef.current.focus();
    } else {
      setResult("땡");
      e.target.children.word.value = "";
      inputRef.current.focus();
    }
  };
  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          id="word"
          ref={inputRef}
          // onChange랑 value를 같이 안쓰면 value 대신 defaultValue로 써야함
          // onChange={(e) => {
          //   setValue(e.target.value);
          // }}
        />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
