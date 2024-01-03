import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { axiosInstance } from "../../../../Helpers/AxiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Viewcourse = () => {
  let token = localStorage.getItem("token");
  let [courseData, setCourseData] = useState([]);
  let [reload,setReload] = useState("a")

  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axiosInstance.get("/dancecourses/getall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourseData(data.data);
      console.log(data.data);
    };
    fetchData();
  }, [reload]);

  let handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/dancecourses/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Course Deleted Successfull....",{position:'top-right'})
      setTimeout(() => {
        setReload(reload+='a')
      }, 3000);
    } catch (err) {
      toast.error(err.response.data.message)
    }
  };
  return (
    <div id={style.viewbranchMain}>
      <div id={style.boxcheck}></div>
      <h1>VIEW COURSE</h1>
      <div id={style.box}>
        <div id={style.headers}>
          <p id={style.cid}>course id</p>
          <p id={style.cduration}>duration in mm</p>
          <p id={style.cfee}>fee</p>
          <p id={style.ctype}>type</p>
          {/* <p id={style.c_branchid}>branch id</p> */}
          <p id={style.buttons}>buttons</p>
        </div>
        <div id={style.courseData}>
          {courseData.map((x, key) => {
            return (
              <div id={style.values} key={key}>
                <p id={style.val_cid}>{x.id}</p>
                <p id={style.val_cduration}>{x.courseDurationInMonths}</p>
                <p id={style.val_cfee}>{x.fee}</p>
                <p id={style.val_ctype}>{x.type}</p>
                {/* <p id={style.val_c_branchid}>{x.message}</p> */}
                <div id={style.btns}>
                  <Link to={`/admindash/updatecourse/${x.id}`}><button>UPDATE</button></Link>
                  <button
                    onClick={() => {
                      handleDelete(x.id);
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Viewcourse;
