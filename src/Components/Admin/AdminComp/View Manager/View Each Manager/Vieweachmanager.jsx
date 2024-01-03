import React, { useState } from "react";
import style from "./style.module.css";
import { axiosInstance } from "../../../../../Helpers/AxiosInstance";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Vieweachmanager = () => {
  let navigate = useNavigate();
  let { userId } = useParams();
  let token = localStorage.getItem("token");
  let [eachManager, setEach] = useState([]);
  useState(() => {
    const dataFetch = async () => {
      let { data } = await axiosInstance.get(`/academymanagers/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data);
      setEach(data.data);
    };
    dataFetch();
  }, []);
  let handleDelete = async () => {
    await axiosInstance.delete(`/academymanagers/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(`DELETED SUCCESSFULL....`);
    setTimeout(() => {
      navigate("/admindash/viewmanager");
    }, 3000);
  };
  return (
    <div id={style.vieweach}>
      <div id={style.boxcheck}></div>
      <div id={style.box}>
        <div id={style.data}>
          <div id={style.label}>
            <p>Name</p>
            <p>Id</p>
            <p>Phone</p>
            <p>Email</p>
            <p>Role</p>
            <p>D.O.B</p>
            <p>Gender</p>
          </div>
          <div id={style.userdata}>
            <p>{eachManager.userName}</p>
            <p>{eachManager.id}</p>
            <p>{eachManager.phone}</p>
            <p>{eachManager.email}</p>
            <p>{eachManager.role}</p>
            <p>{eachManager.dob}</p>
            <p>{eachManager.gender}</p>
          </div>
        </div>
        <div id={style.btns}>
          <Link to={`/admindash/EditUserDetails/${eachManager.id}`}>
            <button>EDIT</button>
          </Link>
          <button onClick={handleDelete}>DELETE</button>
          <Link to={`/admindash/academyRegister/${eachManager.id}`}>
            <button>ADD</button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Vieweachmanager;
