import React, { useEffect, useState } from "react";
import style from "./viewmanager.module.css";
import { axiosInstance } from "../../../../Helpers/AxiosInstance";
import { Link } from "react-router-dom"

const Viewmanager = () => {
  let token = localStorage.getItem("token");
  let [man, setMan] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let fetchData = await axiosInstance.get("/academymanagers/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let { data } = fetchData;
      setMan(data.data);
      console.log(data.data);
    };
    fetchData();
  },[]);
  return (
    <div id={style.viewmanager}>
      <div id={style.boxcheck}></div>
      <p>View Manager</p>
      <div id={style.viewmanagerbox}>
        {man.map((x, key) => {
          return (
            <div id={style.managerbox} key={key}>
              <div id={style.data}>
                <div id={style.label}>
                  <p>Name</p>
                  <p>Role</p>
                  <p>Email</p>
                  <p>Phone</p>
                  <p>gender</p>
                  <p>age</p>
                </div>
                <div id={style.values}>
                  <p>{x.userName}</p>
                  <p>{x.role==="ROLE_ACADEMYMANAGER"?"Ac_Manager":""}</p>
                  <p>{x.email}</p>
                  <p>{x.phone}</p>
                  <p>{x.gender}</p>
                  <p>{x.dob}</p>
                </div>
              </div>
              <div id={style.btns}>
                <Link to={`/admindash/viewEachManager/${x.id}`}><button>VIEW</button></Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Viewmanager;
