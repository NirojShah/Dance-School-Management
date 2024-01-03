import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../Helpers/AxiosInstance";
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Updateacademy = () => {
  let token = localStorage.getItem("token");
  let { id } = useParams();
  let [updatedData, setUpdatedData] = useState({
    academyName: "",
    contact: "",
    description: "",
    email: "",
  });

  let { academyName, contact, description, email } = updatedData;
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdatedData({ ...updatedData, [name]: value });
  };
  let handleUpdate = async () => {
    try{
      let payload = {
        academy:{
          id
        },
        academyName,
        email,
        contact,
        description,
        id
      };
      await axiosInstance.put(`/academies/update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Update successfull...")
    }
    catch(err){
      toast.error(err.response.data.message)
    }
    
  };
  return (
    <div id={style.main}>
      <h1>Update Academy</h1>
      <div id={style.form}>
        <form action="">
          <input
            type="text"
            placeholder="Academy Name"
            // value={academeyData.academyName}
            name="academyName"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Contact"
            // value={academeyData.contact}
            name="contact"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            // value={academeyData.description}
            name="description"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            // value={academeyData.email}
            name="email"
            onChange={handleChange}
          />
          <div id={style.btns}>
            <button onClick={handleUpdate} type="button">
              Update
            </button>
            <button type="button">Reset</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Updateacademy;
