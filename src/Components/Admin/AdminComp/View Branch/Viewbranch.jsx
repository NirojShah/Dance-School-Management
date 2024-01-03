import React, { useEffect } from "react";
import style from "./style.module.css";
import { axiosInstance } from "../../../../Helpers/AxiosInstance";
import { Link } from 'react-router-dom'
import { useState } from "react";

const Viewbranch = () => {
  let token = localStorage.getItem("token");
  let [branchData, SetBranchData] = useState([]);
  let [reload,setReload] = useState("a")
  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axiosInstance.get("/branches/getall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      SetBranchData(data.data);
      console.log(data.data[0].id)
    };
    fetchData();
  }, [reload]);

  let handleDelete = async (id) => {
    await axiosInstance.delete(`/branches/delete/${id}`,{headers:{
      Authorization:`Bearer ${token}`
    }})
    setReload(reload+'a')
    
  };
  return (
    <div id={style.viewmain}>
      <div id={style.boxcheck}></div>
      <h1>VIEW BRANCH</h1>
      <div id={style.viewbranch}>
        {branchData.map((x,key) => {
          return (
            <div id={style.viewEach} key={key}>
              <div id={style.box}>
                <div id={style.placeholder}>
                  <p>Branch Code</p>
                  <p>Academy Name</p>
                  <p>Phone</p>
                  <p>City</p>
                  <p>Address</p>
                  <p>Pin-Code</p>
                </div>
                <div id={style.values}>
                  <p>{x.id}</p>
                  <p>{x.academy.academyName}</p>
                  <p>{x.phone}</p>
                  <p>{x.city}</p>
                  <p>{x.address}</p>
                  <p>{x.pincode}</p>
                </div>
              </div>
              <div id={style.btns}>
                <Link to={`/admindash/addCourse/${x.id}`}><button>ADD</button></Link>
                <Link to={`/admindash/updateBranch/${x.id}`}><button>UPDATE</button></Link>
                <button onClick={()=>{handleDelete(x.id)}}>DELETE</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Viewbranch;
