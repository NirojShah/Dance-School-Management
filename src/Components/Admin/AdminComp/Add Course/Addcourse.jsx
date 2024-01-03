import React, { useState } from "react";
import { axiosInstance } from "../../../../Helpers/AxiosInstance";
import style from "./style.module.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addcourse = () => {
  let { userId } = useParams();
  let token = localStorage.getItem("token");
  let [courseData, setCourseData] = useState({
    courseDurationInMonths: "",
    fee: 0,
    type: "",
    id: userId,
    // imageData: {
    //   name: "",
    //   type: "",
    // },
  });

  let { courseDurationInMonths, fee, type } = courseData;
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCourseData({ ...courseData, [name]: value });
  };

  let handleSubmit = async () => {
    try{
      let payload = {
        courseDurationInMonths,
        fee,
        type,
      };
      await axiosInstance.post(`/dancecourses/save?branchid=${userId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Course Added Successfull.....")
    }
    catch(err){
      toast.error(err.response.data.message)
    }
  };

  return (
    <div id={style.addcourseMain}>
      <h1>ADD COURSE</h1>
      <form action="">
        <input
          type="number"
          placeholder="Course Duration in Month"
          name="courseDurationInMonths"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Fee"
          name="fee"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Type"
          name="type"
          onChange={handleChange}
        />
        <div id={style.btns}>
          <button type="button" onClick={handleSubmit}>
            SUBMIT
          </button>
          <button type="button">RESET</button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Addcourse;
