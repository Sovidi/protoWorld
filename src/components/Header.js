import React from 'react'
import style from "../scss/header.module.scss"
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className={style.header}>
        <Link to="/pics">프로필</Link>
        <Link to="/dropdown">드롭다운</Link>
        <Link to="/selectgame">선택게임</Link>
        <Link to="/questiongame">시간퀴즈</Link>
    </nav>
  )
}

export default Header