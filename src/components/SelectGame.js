import React, { useEffect, useState } from 'react'
import style from "../scss/selectgame.module.scss"

function SelectGame() {

  const [testArray, setTestArray] = useState([]);
  const [codeCh, setCodeCh] = useState("");
  const [keyCh, setKeyCh] = useState("");
  const [clickCount, setClickCount] = useState("");
  const [cTime, setCTime] = useState("");
  const [sTimer, setSTimer] = useState(0);
  const [mTimer, setMTimer] = useState(0);
  const [gStart, setGStart] = useState(true);
  const [tCount, setTCount] = useState(0);

  const testData = [
    {
      key: 1,
      code: 1,
      a:"./spic1.jpg",
      checked: false
    },
    {
      key: 2,
      code: 1,
      a:"./spic1.jpg",
      checked: false
    },
    {
      key: 3,
      code: 2,
      a:"./spic2.jpg",
      checked: false
    },
    {
      key: 4,
      code: 2,
      a:"./spic2.jpg",
      checked: false
    },
    {
      key: 5,
      code: 3,
      a:"./spic3.jpg",
      checked: false
    },
    {
      key: 6,
      code: 3,
      a:"./spic3.jpg",
      checked: false
    },
    {
      key: 7,
      code: 4,
      a:"./spic4.jpg",
      checked: false
    },
    {
      key: 8,
      code: 4,
      a:"./spic4.jpg",
      checked: false
    },
    {
      key: 9,
      code: 5,
      a:"./spic5.jpg",
      checked: false
    },
    {
      key: 10,
      code: 5,
      a:"./spic5.jpg",
      checked: false
    },
    {
      key: 11,
      code: 6,
      a:"./spic6.jpg",
      checked: false
    },
    {
      key: 12,
      code: 6,
      a:"./spic6.jpg",
      checked: false
    },
    {
      key: 13,
      code: 7,
      a:"./spic7.jpg",
      checked: false
    },
    {
      key: 14,
      code: 7,
      a:"./spic7.jpg",
      checked: false
    },
    {
      key: 15,
      code: 8,
      a:"./spic8.jpg",
      checked: false
    },
    {
      key: 16,
      code: 8,
      a:"./spic8.jpg",
      checked: false
    }
  ];

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


  useEffect(()=>{
    setTestArray(item => shuffle(testData));
    setCodeCh("start");
    setKeyCh("start");
    setClickCount("start");
  }, [])



  const picClear = () => {
    setTestArray(testArray.map(item => {
      item.checked = false;
      return item;
    }));
    setCodeCh("start");
    setKeyCh("start");
    setClickCount("start");
  };



  useEffect(()=>{  
    const timing = setInterval(() => {
      console.log("초시계 함수");
      setSTimer(item => ++item);
    }, 1000);

    if (gStart) {
      console.log("시간함수 정지됨");
      clearInterval(timing);
    };

    return () => {
      clearInterval(timing);
    };
  }, [gStart]);



  useEffect(() => {
    if (sTimer >= 60) {
      setSTimer(item => 0);
      setMTimer(item => ++item);
    };
  }, [sTimer, mTimer]);



  const restart = () => {
    alert("다시 시도하세요.");
    setGStart(item => true);
    setTCount(item => ++item);
    const picClearset = setTimeout(() => {
      setGStart(item => false);
      picClear();
    }, 1000);

    return () => {
      clearTimeout(picClearset);
    };
  };

  useEffect(()=>{
    const start = setTimeout(() => {
      setGStart(item => false);
    }, 3000);

    return () => {
      clearTimeout(start);
    };
  }, []);

  // const checking = (key, code, ch) => {
  //   if (ch === true) { 
  //     alert("이미눌림");
  //   } else {
  //     if (codeCh === code) {
  //       setKeyCh(key);
  //       setCodeCh(code);
  //       setTestArray(testArray.map(item => {
  //         if (item.key === key) {
  //           item.checked = true
  //         }
  //         return item;
  //       }));
  //       setClickCount(testArray.filter(item => item.checked !== false).length);
  //       setCodeCh("start");
  //     } else {
  //       restart();
  //     }
  //   }
  // };

  const saving = (key, code) => {
    setKeyCh(key);
    setCodeCh(code);
    setClickCount(item => testArray.filter(item => item.checked !== false).length);
  };

  const tCalc = () => {
    const time = new Date();
    // const time = Date.now();
    // const minute = time.getMinutes();
    // const second = time.getSeconds();
    setCTime(time);
  };

  const clickTurn = (key) => {
    setTestArray(testArray.map(item => {
      if (item.key === key) {
        item.checked = true
      }
      return item;
    }));
  };

  const clicked = (item) => {
    if (item.checked === true) {
      alert("이미 선택된 항목이예요");
    } else if (gStart) {
      alert("잠시 기다려주세요");
    } else {
      if (codeCh === "start") {
        tCalc();
        clickTurn(item.key);
        saving(item.key, item.code);
      } else if (codeCh === "gaming") {
        clickTurn(item.key);
        saving(item.key, item.code);
      } else if (codeCh === item.code) {
        clickTurn(item.key);
        saving(item.key, item.code);
        setCodeCh("gaming");
      } else {
        clickTurn(item.key);
        restart();
      };
    };
  };

  useEffect(()=>{
    let reroll;
    if(clickCount === 16) {
      const time = new Date();
      const b = `${Math.floor(time - cTime)}`;
      const c = (b / 1000).toFixed(1);

      alert(`축하합니다! ${String(mTimer).padStart(2, "0")}:${String(sTimer).padStart(2, "0")} 경과, ${tCount} 회 재시도`);
      setGStart(item => true);
      setTestArray(item => shuffle(item));
      reroll = setTimeout(() => {
        console.log("끝내고 다시시작 실행됨");
        picClear();
        setSTimer(item => 0);
        setMTimer(item => 0);
        setTCount(item => 0);
        setGStart(item => false);
      }, 3000);
    };

    return ()=>{
      clearTimeout(reroll);
    };
  }, [keyCh, codeCh, clickCount, cTime]);

  return (
    <section className={style.selectSec}>
      <p>{`${String(mTimer).padStart(2, "0")}:${String(sTimer).padStart(2, "0")}`} 경과</p>
      <p>{tCount} 회 재시도</p>
      <ul>
        {
          testArray.map(item=>(
            <li className={`${gStart ? style.active : ""} ${item.checked ? style.active : ""}`} onClick={(e)=>{clicked(item)}}>
              <figure>
                <img src={item.a} />
              </figure>
            </li>
          ))
        }
      </ul>
    </section>
  )
};


export default SelectGame