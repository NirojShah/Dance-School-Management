import React from "react";
import { useState } from "react";
import { axiosInstance } from "../../../../../Helpers/AxiosInstance";

const UpdateManager = () => {
  let token = localStorage.getItem("token");
  let [data, setData] = useState({
    userName: "",
    email: "",
    phone: "",
    dob: "",
  });

  let { userName, email, phone, dob } = data;
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  let handleSubmit = async () => {
    console.log(data);
    let payload = { userName, email, phone, dob };
    await axiosInstance.put("/academymanagers/update/USER-120", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <h1>heljalsdfj</h1>
      <input
        type="text"
        name="userName"
        placeholder="userName"
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="phone"
        onChange={handleChange}
      />
      <input
        type="date"
        name="dob"
        placeholder="phone"
        onChange={handleChange}
      />
      <button type="button" onClick={handleSubmit}>
        Submit{" "}
      </button>
    </div>
  );
};

export default UpdateManager;
