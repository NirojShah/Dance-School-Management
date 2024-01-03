import React, { useState } from "react";
import style from "./admin.module.css";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { axiosInstance } from "../../../Helpers/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Adminregister = () => {

  const navigate = useNavigate();

  let [eye, setEye] = useState(true);
  let [userData, setUserData] = useState({
    userName: "",
    password: "",
    dob: "",
    phone: "",
    email: "",
    gender: "",
  });
  let [cont, setCont] = useState(false);

  let { userName, email, password, phone, dob, gender } = userData;

  let handleEye = () => {
    setEye(!eye);
  };

  let handlechange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  let handleSubmit = async () => {
    if (userName.length >= 3) {
      setCont(true);
      document.getElementById("username").style.border = "1px solid blue";
    } else {
      setCont(false);
      document.getElementById("username").style.border = "1px solid red";
    }
    if (email.includes("@gmail.com")) {
      setCont(true);
      document.getElementById("email").style.border = "1px solid blue";
    } else {
      setCont(false);
      document.getElementById("email").style.border = "1px solid red";
    }
    if (phone.length === 10) {
      setCont(true);
      document.getElementById("phone").style.border = "1px solid blue";
    } else {
      setCont(false);
      document.getElementById("phone").style.border = "1px solid red";
    }

    let passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/;

    if (password.match(passw)) {
      setCont(true);
      document.getElementById("password").style.border = "1px solid blue";
      document.getElementById("dob").style.border = "1px solid blue";
    } else {
      setCont(false);
      document.getElementById("password").style.border = "1px solid red";
    }

    if (cont) {
      let payload = {
        userName,
        password,
        dob,
        email,
        phone,
        gender,
      };

      try {
        await axiosInstance.post("/admins/save", payload);
        toast.success("Account Created Successfull.....");
        setInterval(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        if (err) {
          if (err.response.data.message === "Duplicate Entry") {
            toast.error("Account already created....", {
              position: "top-left",
            });
            toast.error("Please Log in....", { position: "top-left" });
          }
        }
      }
    }
  };

  return (
    <div id={style.register}>
      <div id={style.imgbox}></div>
      <div id={style.registerbox}>
        <h1>admin registration</h1>
        <form action="">
          <input
            type="text"
            name="userName"
            id="username"
            placeholder="Full Name."
            onChange={handlechange}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email."
            onChange={handlechange}
          />
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone No."
            onChange={handlechange}
          />
          <input
            type="date"
            name="dob"
            id="dob"
            placeholder="DOB."
            onChange={handlechange}
          />
          <input
            type={eye ? "password" : "text"}
            name="password"
            id="password"
            placeholder="Password."
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
          <div id={style.gender}>
            <div>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                id="male"
                onChange={handlechange}
              />
            </div>
            <div>
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="Female"
                onChange={handlechange}
              />
            </div>
          </div>
          <div id={style.btns}>
            <button type="button" onClick={handleSubmit}>
              CREATE
            </button>
            <button type="button">RESET</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Adminregister;
