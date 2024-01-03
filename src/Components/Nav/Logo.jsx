import React from 'react'
import style from "./nav.module.css"
import img from "../../ASSETS/Logos/StepSync-removebg-preview.png"
const Logo = () => {
  return (
    <div id={style.logo}>
        <img src={img} alt="stepsync" />
    </div>
  )
}

export default Logo