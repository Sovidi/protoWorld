import React, { useEffect, useState } from 'react'
import style from "../scss/dropdown.module.scss"

function Dropdown() {
  const [drop, setDrop] = useState(false);
  const [testArray, setTestArray] = useState([]);
  const [slName, setSlName] = useState("정보 1");

  const testData = [
    {
      a: "정보 1",
      key: 1
    },
    {
      a: "정보 2",
      key: 2
    },
    {
      a: "정보 3",
      key: 3
    },
    {
      a: "정보 4",
      key: 4
    },
    {
      a: "정보 5",
      key: 5
    },
    {
      a: "정보 6",
      key: 6
    },
    {
      a: "정보 7",
      key: 7
    },
    {
      a: "정보 8",
      key: 8
    }
  ];

  useEffect(()=>{
    setTestArray(testData);
  }, []);

  const menuEntered = (e) => {
    if(e.key === "Enter") {
      setDrop(!drop);
    };
  };

  const listEntered = (e, item) => {
    if(e.key === "Enter") {
      setSlName(item.a);
      setDrop(!drop);
    };
  };

  return (
    <section onClick={()=>{if (drop === true) {setDrop(false)}}} className={style.dropdown}>
      <div className={style.content}>
        <div tabIndex={1} className={style.dObj} onKeyDown={(e)=>{menuEntered(e)}} onClick={()=>{setDrop(!drop);}}>{slName}</div>
        <div className={`${style.burger}`}>
          <ul className={`${style.list} ${drop ? style.active : ""}`}>
            {
              testArray.map(item => (
                <li tabIndex={1} onKeyDown={(e)=>{listEntered(e, item)}} onClick={()=>{setSlName(item.a)}}>{item.a}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Dropdown