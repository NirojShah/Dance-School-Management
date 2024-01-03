import React, { useState } from "react";
import style from "./style.module.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../Helpers/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Updatebranch = () => {
  let { id } = useParams();
  let token = localStorage.getItem("token");

  let [updateBranch, setUpdateBranch] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  let { address, city, pincode, phone } = updateBranch;

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdateBranch({ ...updateBranch, [name]: value });
  };

  let handleUpdate = async () => {
    try{
      let payload = {
        address,
        city,
        pincode,
        phone,
        id,
      };
      await axiosInstance.put(`/branches/update/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("update successfully......")
    }
    catch(err){
      toast.error(err.response.data.message)
    }
  };
  return (
    <div id={style.updatebranch}>
      <h1>update branch</h1>
      <div id={style.form}>
        <form action="">
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
        </form>
        <div id={style.btns}>
          <button onClick={handleUpdate}>UPDATE</button>
          <button>RESET</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Updatebranch;
