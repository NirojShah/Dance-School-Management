import React from "react";
import style from "./Adminside.module.css";
import { Link } from "react-router-dom";

const Adminside = () => {
  return (
    <div id={style.sidemain}>
      <div>
        <p>ADMIN DASHBOARD</p>
      </div>
      <div id={style.links}>
        <Link to={"/admindash/addmanager"}>ADD ACADEMY MANAGER</Link>
        <Link to={"/admindash/viewmanager"}>VIEW ACADEMY MANAGER</Link>
        <Link to={"/admindash/viewacademy"}>VIEW ACADEMY</Link>
        <Link to={"/admindash/viewbranch"}>VIEW BRANCH</Link>
        <Link to={"/admindash/viewcourse"}>VIEW COURSRE</Link>
      </div>
    </div>
  );
};

export default Adminside;
