import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { axiosInstance } from "../../../../Helpers/AxiosInstance";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Viewacademy = () => {
  let [academyData, setAcademyData] = useState([]);
  let token = localStorage.getItem("token");
  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axiosInstance.get("/academies/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAcademyData(data.data);
    };
    fetchData();
  }, []);
  let handleDelete = async (id) => {
    console.log(id);
    try {
      await axiosInstance.delete(`/academies/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(id + " : DELETED....", { position: "top-right" });
      setTimeout(() => {
        window.location.assign("/admindash/viewacademy");
      }, 3000);
    } catch (err) {
      if(err.response.data.message==="Duplicate Entry");{
        toast.error("FIRST DELETE RELATED BRANCH...")
      }
    }
  };
  return (
    <div id={style.viewAcademy}>
      <div id={style.boxcheck}></div>
      <h1>VIEW ACADEMY</h1>
      <div id={style.box}>
        <div id={style.academy}>
          <p id={style.id}>id</p>
          <p id={style.name}>Name</p>
          <p id={style.desc}>description</p>
          <p id={style.button}>Buttons</p>
        </div>
        <div id={style.boxValues}>
          {academyData.map((x, key) => {
            return (
              <div id={style.valBox} key={key}>
                <p id={style.valId}>{x.id}</p>
                <p id={style.valName}>{x.academyName}</p>
                <p id={style.valDesc}>{x.description}</p>
                <div id={style.btns}>
                  <Link to={`/admindash/viewacademy/updateacademy/${x.id}`}>
                    <button>EDIT</button>
                  </Link>
                  <Link>
                    <button
                      onClick={() => {
                        handleDelete(x.id);
                      }}
                    >
                      DELETE
                    </button>
                  </Link>
                  <Link to={`/admindash/viewacademy/addbranch/${x.id}`}>
                    <button>ADD BRANCH</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Viewacademy;
