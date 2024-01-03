import React, { useState } from "react";
import style from "./style.module.css";
import { axiosInstance } from "../../../../Helpers/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Updatecourse = () => {
  let { id } = useParams();
  let navigate = useNavigate()
  let token = localStorage.getItem("token");
  let [courseData, setCourseData] = useState({
    courseDurationInMonths: "",
    fee: 0,
    type: "",
  });

  let { courseDurationInMonths, fee, type } = courseData;

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCourseData({ ...courseData, [name]: value });
  };
  let handleUpdate = async () => {
    try{
      let payload = {
        courseDurationInMonths,
        fee,
        type,
      };
      await axiosInstance.put(`/dancecourses/update/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Course Updated Successfull......")

      setTimeout(() => {
        navigate("/admindash/viewcourse")
      }, 3000);
      
    }
    catch(err){
      toast.error(err.response.data.message)
    }
  };
  return (
    <div id={style.updatecourse}>
      <h1>update course</h1>
      <div id={style.form}>
        <form action="">
          <input
            type="text"
            name="courseDurationInMonths"
            placeholder="Course Duration"
            onChange={handleChange}
          />
          <input
            type="text"
            name="fee"
            placeholder="Fee"
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            onChange={handleChange}
          />
          <div id={style.btns}>
            <button type="button" onClick={handleUpdate}>
              UPDATE
            </button>
            <button type="reset">RESET</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Updatecourse;
