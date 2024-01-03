import React, { useEffect, useState } from "react";
import style from "./home.module.css";
import data from "../../ASSETS/HomeData/data.json";
import { axiosInstance } from "../../Helpers/AxiosInstance";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  let token = localStorage.getItem("token");
  let [courseData, setCourseData] = useState([]);

  useEffect(() => {
    let fetchCourse = async () => {
      let { data } = await axiosInstance.get("/dancecourses/getall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourseData(data.data);
    };
    fetchCourse();
  }, []);

  let handleSubscribe = async () => {
    console.log(courseData[0]);
  };
  let handleContact = () => {
    console.log("heheheheheh");
  };
  let setting = {
    dots: true,
    speed: 1500,
    slideToShow: 1,
    sideToScroll: 1,
  };
  return (
    <div id={style.home}>
      {/* <div id={style.slider}>
        <Slider {...setting}>
          <div id={style.image}>
            <img src="https://images.unsplash.com/photo-1463592177119-bab2a00f3ccb?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwZGFuY2V8ZW58MHx8MHx8fDA%3D" alt="" />
          </div>
          <div>
            <h1>hello</h1>
          </div>
          
          
        </Slider>
      </div> */}
      <h1>Learn A Variety of Dance Styles</h1>
      <div id={style.homemain}>
        {data.map((dance) => {
          return (
            <div id={style.belly}>
              <div id={style.bellyleft}>
                <h1>{dance.name}</h1>

                <p>{dance.about}</p>

                <button>Click me</button>
              </div>
              <div id={style.bellyright}>
                <img src={dance.img} alt="" />
              </div>
            </div>
          );
        })}

        <div id={style.course}>
          {courseData.map((x, key) => {
            return (
              <div id={style.courseData}>
                <div id={style.boxVals}>
                  <div id={style.coursePlaceholder}>
                    <p>ID</p>
                    <p>Duration</p>
                    <p>FEE</p>
                    <p>TYPE</p>
                  </div>
                  <div id={style.values} key={key}>
                    <p id={style.val_cid}>{x.id}</p>
                    <p id={style.val_cduration}>
                      {x.courseDurationInMonths} Months
                    </p>
                    <p id={style.val_cfee}>{x.fee}</p>
                    <p id={style.val_ctype}>{x.type}</p>
                    {/* <p id={style.val_c_branchid}>{x.message}ll</p> */}
                  </div>
                </div>
                <div id={style.btns}>
                  <button onClick={handleSubscribe}>SUBSCRIBE</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={handleContact} id={style.cunt}>
        Contact US
      </button>
    </div>
  );
};
export default Home;
