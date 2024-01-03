import React from 'react'
import style from "./admindash.module.css"
import Adminside from './AdminSide/Adminside'
import Adminmainbar from './Adminmainbar/Adminmainbar'

const Admindash = () => {
  return (
    <div id={style.dash}>
      <Adminside/>
      <Adminmainbar />
    </div>

  )
}

export default Admindash