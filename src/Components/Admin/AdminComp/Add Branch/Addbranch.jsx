import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.css";
import { axiosInstance } from "../../../../Helpers/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addbranch = () => {
  let navigate = useNavigate()
  let { userId } = useParams();
  let token = localStorage.getItem("token");
  let [academyData, setAcademyData] = useState([]);
  let [branchData, setBranchData] = useState({
    id: "",
    address: "",
    pincode: "",
    phone: "",
  });

  useEffect(() => {
    let fetchAcademy = async () => {
      let { data } = await axiosInstance.get(`/academies/get/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAcademyData(data.data);
    };
    fetchAcademy();
  }, []);

  let { address, pincode, phone,city } = branchData;

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBranchData({ ...branchData, [name]: value });
  };
  let handleAdd = async () => {
    let payload = {
      academy: {
        ...academyData,
      },
      address,
      city,
      pincode,
      phone,
    };
    try{
      await axiosInstance.post(`/branches/save?aid=${userId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Data Added Successfull....",{position:"top-right"})
      setTimeout(() => {
        navigate('/admindash/viewbranch')
      }, 3000);
    }
    catch(err){
      if(err){
        toast.error("Something went Wrong....",{position:"top-right"})
      }
    }
  };
  return (
    <div id={style.main}>
      <h1>ADD BRANCH</h1>
      <div id={style.formbox}>
        <form action="">
          <input
            type="text"
            placeholder="Address"
            onChange={handleChange}
            name="address"
          />
          <input
            type="text"
            placeholder="City"
            onChange={handleChange}
            name="city"
          />
          <input
            type="text"
            placeholder="Pin Code"
            onChange={handleChange}
            name="pincode"
          />
          <input
            type="text"
            placeholder="Phone"
            onChange={handleChange}
            name="phone"
          />

          <div id={style.btns}>
            <button type="button" onClick={handleAdd}>
              ADD
            </button>
            <button type="button">RESET</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Addbranch;
