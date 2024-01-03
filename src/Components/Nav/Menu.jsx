import React, { useRef, useState } from "react";
import style from "./nav.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";

const Menu = () => {
  let navigate = useNavigate()
  let [flag, setFlag] = useState(false);
  let menuRef = useRef();
  let handleMenu = () => {
    if (flag) {
      menuRef.current.style.right = "-100%";
    } else {
      menuRef.current.style.right = "0";
    }
    setFlag(!flag);
  };

  let role = localStorage.getItem("role")
  let token = localStorage.getItem("token")
  let logoutHandler = ()=>{
    localStorage.clear()
    navigate("/login")
  }


  return (
    <div id={style.menu}>
      <button onClick={handleMenu} id={style.mobile}>
        {flag?<AiOutlineMenuFold/>:<AiOutlineMenuUnfold/>}
      </button>
      <div id={style.menubox} ref={menuRef}>

        <Link to={"/"}>HOME</Link>
        <Link to={"/about"}>ABOUT</Link>
        <Link to={"/galary"}>GALARY</Link>
        {role==="ROLE_ADMIN"?<Link to={"/admindash/addmanager"}>ADMIN DASH</Link>:null}
        {token?<Link to={"/login"} onClick={logoutHandler}>LOGOUT</Link>
        :<>
        <Link to={"/register"}>REGISTER</Link>
        <Link to={"/login"}>{token?"LOGOUT":"LOGIN"}</Link>
        </>}
      </div>
    </div>
  );
};

export default Menu;
