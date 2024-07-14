import React, { useEffect, useState } from 'react'
import style from "../scss/questiongame.module.scss"

function QuestionGame() {
  const [qList, setQList] = useState([]);
  const [ranNum, setRanNum] = useState("start");
  const [lNums, setLNums] = useState([]);
  const [qCount, setQCount] = useState(1);
  const [sTimer, setSTimer] = useState(0);
  const [mTimer, setMTimer] = useState(0);
  const [timeOn, setTimeOn] = useState(false);
  const [gRestart, setGRestart] = useState(false);
  const [selectedQues, setSelectedQues] = useState("start");

  const questions = [
    {
      key: 0,
      ques: "나는 신이다",
      sel1: "맞다",
      sel2: "아니다",
      ans: "아니다"
    },
    {
      key: 1,
      ques: "나는 하늘을 날수있다",
      sel1: "맞다",
      sel2: "아니다",
      ans: "아니다"
    },
    {
      key: 2,
      ques: "내 이름은?",
      sel1: "임채민",
      sel2: "김성민",
      ans: "임채민"
    },
    {
      key: 3,
      ques: "나는 독일어가 가능하다",
      sel1: "맞다",
      sel2: "아니다",
      ans: "맞다"
    },
    {
      key: 4,
      ques: "나는 일진이었다",
      sel1: "맞다",
      sel2: "아니다",
      ans: "아니다"
    },
    {
      key: 5,
      ques: "나는 바리스타이다",
      sel1: "맞다",
      sel2: "아니다",
      ans: "맞다"
    },
    {
      key: 6,
      ques: "나는 고소공포증이 있다",
      sel1: "매우맞다",
      sel2: "아니다",
      ans: "매우맞다"
    },
    {
      key: 7,
      ques: "사랑합니다",
      sel1: "거짓말",
      sel2: "고마워",
      ans: "고마워"
    }
  ];

  useEffect(()=>{
    setQList(item => questions);
    setLNums(item => []);
    setRanNum(item => "start");
    setQCount(item => 1);
    setSelectedQues(item => "start");
  }, []);

  
  const restart = () => {
    setLNums(item => []);
    setRanNum(item => "start");
    setSelectedQues(item => "restart");
    setQCount(item => 1);
    setGRestart(item => true);
  };


  useEffect(()=>{  
    const timing = setInterval(() => {
      console.log("초시계 함수");
      setSTimer(item => --item);
    }, 1000);

    if (selectedQues === "start" || selectedQues === "restart") {
      console.log("시간함수 정지됨");
      clearInterval(timing);
    };

    return () => {
      clearInterval(timing);
    };
  }, [selectedQues, timeOn]);


  useEffect(() => {
    if (sTimer < 0) {
      alert("시간초과");
      setGRestart(item => true);
      setSelectedQues(item => "restart");
      restart();
    };

    if (sTimer <= -1) {
      setSTimer(item => 0);
    };
    if (selectedQues === "start") {
      setSTimer(item => 10);
      setMTimer(item => 0);
    };
    if (selectedQues === "restart") {
      setSTimer(item => 5);
      setMTimer(item => 0);
    };
  }, [sTimer, mTimer, selectedQues]);


  const ranNumMake = () => {
    let rNum = 0;
    if(lNums.length < qList.length) {
      while (true) {
        rNum = Math.floor(Math.random() * qList.length);
        if (rNum === ranNum) {
          console.log("같은 번호가 나옴");
        } else if (lNums.includes(rNum)) {
          console.log("이전 번호가 나옴");
        } else {
          console.log("번호저장됨");
          setRanNum(item => rNum);
          setLNums(item => [...item, rNum]);
          break;
        };
      };  
    };
    return rNum;
  };


  useEffect(() => {
    if(selectedQues !== "start" && selectedQues !== "restart") {
      if(qCount === qList.length + 1) {
        alert("축하합니다!");
        restart();
        setGRestart(item => false);
        setSelectedQues(item => "start");
      } else if (lNums.length === qList.length + 1) {
        alert("축하합니다!");
        restart();
        setGRestart(item => false);
        setSelectedQues(item => "start");
      };
    };
  }, [qCount, lNums]);


  // useEffect(()=>{
  //   const a = setInterval(() => {
  //     console.log(qCount, lNums, qList.length);
  //   }, (500));

  //   return () => {
  //     clearInterval(a);
  //   };
  // }, [qCount, lNums]);


  const gStart = () => {
    setQCount(item => item++);
    const a = ranNumMake();
    const quesSelect = qList[a];
    setSelectedQues(item => quesSelect);
    if (selectedQues === "start") {
      console.log("start 시간 할당");
      setSTimer(item => 10);
      setMTimer(item => 0);
      setTimeOn(item => true);
    } else if (selectedQues === "restart") {
      console.log("restart 시간 할당");
      setGRestart(item => true);
      setSTimer(item => 5);
      setMTimer(item => 0);
      setTimeOn(item => true);
    } else if (gRestart === true) {
      console.log("restart 시간 재할당");
      setSTimer(item => 5);
      setMTimer(item => 0);
      setTimeOn(item => true);
    } else {
      console.log("start 시간 재할당");
      setSTimer(item => 10);
      setMTimer(item => 0);
      setTimeOn(item => true);
    };
  };

  const checking = (e) => {
    e.preventDefault();
    if (e.target.innerText === selectedQues.ans) {
      alert("정답");
      setQCount(item => ++item);
      gStart();
    } else {
      alert("오답");
      restart();
    };
  };

  return (
    <section className={style.questionSec}>
      <div className={style.contentBox}>
        <p className={`${style.gameExplain} ${selectedQues !== "start" ? selectedQues !== "restart" ? style.active : "" : ""}`}>{selectedQues === "start" ? "10초안에 문제를 풀어주세요" : selectedQues === "restart" ? "재시도할 경우 제한시간은 5초 입니다." : ""}</p>
        <div className={style.quesBox}>
          <p className={style.timer}>{String(mTimer).padStart(2, "0")}:{String(sTimer).padStart(2, "0")}</p>
          <p className={style.quesText}>{`${selectedQues === "start" ? "Start 를 눌러주세요" : selectedQues === "restart" ? "Restart 를 눌러 재시작하세요" : selectedQues.ques}`}</p>
          <button className={`${selectedQues === "start" ? style.active : selectedQues === "restart" ? style.active : ""}`} onClick={((e)=>{checking(e)})}>{`${selectedQues === "start" ? "start 를 눌러주세요" : selectedQues === "restart" ? "restart 를 눌러주세요" : selectedQues.sel1}`}</button>
          <button className={`${selectedQues === "start" ? style.active : selectedQues === "restart" ? style.active : ""}`} onClick={((e)=>{checking(e)})}>{`${selectedQues === "start" ? "start 를 눌러주세요" : selectedQues === "restart" ? "restart 를 눌러주세요" : selectedQues.sel2}`}</button> 
        </div>
        <button className={`${selectedQues !== "start" ? selectedQues !== "restart" ? style.active : "" : ""}`} onClick={(()=>{gStart()})}>{selectedQues === "start" ? "Start" : selectedQues === "restart" ? "Restart" : ""}</button>
      </div>
    </section>
  )
}

export default QuestionGame