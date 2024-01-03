import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../../Helpers/AxiosInstance";
import style from "./style.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edituserdata = () => {
  let { id } = useParams();
  let token = localStorage.getItem("token");
  let [userData, setUser] = useState({
    userName:'',
    email:'',
    phone:'',
    dob:'',
    gender:'',
    password:''
  });
  let [cont, setCont] = useState(false);
  // useEffect(() => {
  //   let fetchData = async () => {
  //     let { data } = await axiosInstance.get(`/academymanagers/get/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setUser(data.data);
  //   };
  //   fetchData();
  //   // console.log(userData);
  // }, []);
  let { userName, email, phone, dob, gender, password } = userData;
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...userData, [name]: value });
  };
  let handleSubmit = async () => {

    
      let payload = {
        userName,
        dob,
        email,
        phone,
        gender,
        id,
        password
      };
      console.log(payload)
      try {
        console.log(payload);
        await axiosInstance.put(`/academymanagers/update`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success("Account Has been updated");
        setTimeout(() => {
          //   navigate("/admindash/viewmanager");
        }, 3000); 
      } catch (err) {
        if (err) {
          console.log(err)
          // if () {
          //   toast.error("Account already created....", {
          //     position: "top-left",
          //   });
          //   toast.error("Please Log in....", { position: "top-left" });
          // } else {
          //   toast.error("big error", { position: "top-left" });
          //   console.log(err);
          // }
        }
    }
  };
  return (
    <div id={style.editbox}>
      <div id={style.boxcheck}></div>
      <h1>UPDATE ACADEMY MANAGER</h1>
      <div id={style.box}>
        <input
          type="text"
          name="userName"
          id="username"
          onChange={handleChange}
          placeholder="User Name"
          
        />
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="date"
          id="dob"
          name="dob"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <div id={style.gender}>
          <div>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              id="male"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="Female"
              onChange={handleChange}
            />
          </div>
        </div>
        <div id={style.btns}>
          <button onClick={handleSubmit}>UPDATE</button>
          <button>RESET</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Edituserdata;
