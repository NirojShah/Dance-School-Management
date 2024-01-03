import React, { useState } from "react";
import style from "./login.module.css";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import img from "../../ASSETS/Login/PngItem_633942.png";
import { axiosInstance } from "../../Helpers/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  let navigate = useNavigate();

  let [userInp, setUserInp] = useState({
    userEmail: "",
    password: "",
  });

  let { userEmail, password } = userInp;

  let [eye, setEye] = useState(true);
  let handleEye = () => {
    setEye(!eye);
  };

  let handleLogin = async () => {
    try {
      let payload = { userEmail, password };
      let { data } = await axiosInstance.post("/authenticate", payload);
      let token = data.token;
      let role = data.role;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        navigate("/");
      }
    } catch (err) {
      if (err.response.data.data === "username or password incorrect") {
        toast.error("Username or Password INCORRECT......",{position:"top-left"});
      }
    }
  };

  let handlechange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserInp({ ...userInp, [name]: value });
  };

  return (
    <div id={style.login}>
      <div id={style.loginbox}>
        <div id={style.form}>
          <h1>LOG IN</h1>
          <form action="">
            <input
              type="text"
              name="userEmail"
              placeholder="Email or Phone No."
              onChange={handlechange}
            />
            <input
              type={eye ? "password" : "text"}
              name="password"
              placeholder="Password"
              onChange={handlechange}
            />

            {eye ? (
              <AiOutlineEye id={style.eye} onClick={handleEye} title="show" />
            ) : (
              <AiOutlineEyeInvisible
                id={style.eye}
                onClick={handleEye}
                title="hide"
              />
            )}

            <div id={style.btns}>
              <button type="button" onClick={handleLogin}>
                LOGIN
              </button>
              <button type="button">RESET</button>
            </div>
          </form>
        </div>
        <div id={style.loginimg}>
          <img src={img} alt="" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
