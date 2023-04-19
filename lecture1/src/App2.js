import './App.css';
import {Component} from 'react';

{/* 함수의 경우
간단한 컴포넌트들을 리턴시킬때 용이하다.
function App2() {
  return (
    <>
    <h1>하단 컴포넌트 입니다.</h1>
    
      </>
  );
  */}

{/*클래스형 컴포넌트는 컴포넌트를 상속받아야 하고
함수 컴포넌트와 차이는 생명주기 파트에서 class 컴포넌트여야 사용이 가능하다. */}
class App2 extends Component{
    render(){
        return(
        <>
            <h1>하단 컴포넌트 입니다.</h1>
        </>
        )
    }
}
export default App2