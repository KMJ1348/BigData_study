import './App.css';
import {fragment} from 'react';


function App() {
  const a = 'react2'

  return (
    <>
    {/* 여기는 주석입니다. (중괄호를 해야 주석이 달림) */}  
    {a === 'react' ? (
      <h1>리액트입니다.</h1>
    ) : (
      <h1 style={{
        background:"red",
        color : "green",
        fontSize: "48px"
      }}>리액트가 아닙니다.</h1>
    )}
    
      </>
  );
}

export default App;
