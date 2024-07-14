import React, { useContext, useEffect, useRef, useState } from 'react'
import style from "../scss/pics.module.scss"
import { myContext } from './Context'

function Pics() {
  const [testArray, setTestArray] = useState([]);
  const [popSta, setPopSta] = useState({src: "", name: "", text: "", pop: false});

  const testData = [
    {
      key: 1,
      src: "./public/profile.jpg",
      name: "사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름",
      text: "사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명",
      checked: false
    },
    {
      key: 2,
      src: null,
      name: "사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름",
      text: "사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명",
      checked: false
    },
    {
      key: 3,
      src: "./profile.jpg",
      name: "사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름",
      text: "사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명",
      checked: false
    },
    {
      key: 4,
      src: "./profile.jpg",
      name: "사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름",
      text: "사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명",
      checked: false
    },
    {
      key: 5,
      src: null,
      name: "사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름",
      text: "사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명",
      checked: false
    },
    {
      key: 6,
      src: "./profile.jpg",
      name: "사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름",
      text: "사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명",
      checked: false
    },
    {
      key: 7,
      src: null,
      name: "사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름",
      text: "사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명",
      checked: false
    },
    {
      key: 8,
      src: "./profile.jpg",
      name: "사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름사진이름",
      text: "사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명사진설명",
      checked: false
    },
  ];

  useEffect(()=>{
    setTestArray(testData);
  }, []);

  const chChecking = (e, key) => {
    setTestArray(
      testArray.map(item => {
        if (item.key === key) {
          console.log(item);
          item.checked = !item.checked;
        };
        return item;
      })
    );
  };

  const popChange = (item) => {
    setPopSta(item.src === null ? {src: "./emppic.gif", name:item.name, text: item.text, pop: !popSta.pop} : {src: item.src, name:item.name, text: item.text, pop: !popSta.pop});
  };

  
  return (
    <section className={style.Pics}>
      <ul className={style.PicsSec}>
        {
          testArray.map(item => (
            <li key={item.key} onChange={(e)=>{chChecking(e, item.key)}}>
              <figure >
                <img onClick={()=>{popChange(item)}} className={item.checked ? style.active : ""} src={item.src === null ? "./emppic.gif" : item.src}/>
                <input type='checkbox' name='chBox' checked={item.checked} />
                <figcaption className={style.pName}>{item.name}</figcaption>
                <figcaption className={style.pExplain}>{item.text}</figcaption>
              </figure>
            </li>
          ))
        }
      </ul>
      <div onClick={()=>{setPopSta({src: popSta.src, name:popSta.name, text: popSta.text, pop: !popSta.pop})}} className={`${style.pop} ${popSta.pop ? style.active : ""}`}>
        <figure>
          <img src={popSta.src}/>
          <figcaption>{popSta.name}</figcaption>
          <figcaption>{popSta.text}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default Pics