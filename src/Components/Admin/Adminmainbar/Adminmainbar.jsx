import React from 'react'
import { Outlet } from 'react-router-dom'
import style from "./style.module.css"

const Adminmainbar = () => {
  return (
    <div id={style.adminmainbox}>
        <Outlet />
    </div>
  )
}

export default Adminmainbar