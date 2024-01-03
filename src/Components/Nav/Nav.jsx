import React from 'react'
import style from "./nav.module.css"
import Logo from './Logo'
import Menu from './Menu'

const Nav = () => {
  return (
    <div id={style.nav}>
        <div id={style.navbox}>
            <Logo />
            <Menu id={style.menuB}/>
        </div>
    </div>
  )
}

export default Nav