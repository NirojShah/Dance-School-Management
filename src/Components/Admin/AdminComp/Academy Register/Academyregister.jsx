import React, { useState } from 'react'
import style from "./style.module.css"
import { axiosInstance } from '../../../../Helpers/AxiosInstance'
import { useParams } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Academyregister = () => {
    let {managerId} = useParams()
    let [academyData,setAcademy] = useState({
        academyName : "",
        contact : "",
        description : "",
        email : "",
    })
    let {academyName,contact,description,email} = academyData
    let token = localStorage.getItem("token");
    let handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setAcademy({ ...academyData, [name]: value });
    }
    let handleSubmit = async ()=>{
        try{
            let payload = {
                academyName,contact,description,email
            }
            await axiosInstance.post(`/academies/saveacademy?managerId=${managerId}`,payload,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
            toast.success("Academy Added....",{position:"top-right"})
        }
        catch(err){
            toast.error("Something went wrong try again",{position:"top-right"})
            console.log(err)
        }
    }
  return (
    <div id={style.registerbox}>
        <div id={style.boxcheck}></div>
        <h1>Academy Register</h1>
            <form id={style.form} action="">
                <input type="text" placeholder='ACADEMY NAME' name="academyName" onChange={handleChange}/>
                <input type="text" placeholder='DESCRIPTION' name='description' onChange={handleChange}/>
                <input type="text" placeholder='EMAIL' name='email' onChange={handleChange}/>
                <input type="text" placeholder='CONTACT' name='contact' onChange={handleChange}/>
                <div id={style.btns}>
                    <button type='button' onClick={handleSubmit}>SUBMIT</button>
                </div>
            </form>
            <ToastContainer />
        </div>
  )
}

export default Academyregister