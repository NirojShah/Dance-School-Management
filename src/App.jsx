import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Adminregister from "./Components/Register/AdminRegister/Adminregister";
import Admindash from "./Components/Admin/Admindash";
import Home from "./Components/Home/Home";
import Protectedroute from "./ServiceRoutes/Protectedroute";
import Viewacademy from "./Components/Admin/AdminComp/View Academy/Viewacademy";
import Viewbranch from "./Components/Admin/AdminComp/View Branch/Viewbranch";
import Viewcourse from "./Components/Admin/AdminComp/View Course/Viewcourse";
import Addmanager from "./Components/Admin/AdminComp/Add Manager/Addmanager";
import Viewmanager from "./Components/Admin/AdminComp/View Manager/Viewmanager";
import Vieweachmanager from "./Components/Admin/AdminComp/View Manager/View Each Manager/Vieweachmanager";
import Edituserdata from "./Components/Admin/AdminComp/View Manager/Update User Data/Edituserdata";
import Academyregister from "./Components/Admin/AdminComp/Academy Register/Academyregister";
import UpdateManager from "./Components/Admin/AdminComp/View Manager/Update User Data/UpdateManager";
import Addbranch from "./Components/Admin/AdminComp/Add Branch/Addbranch";
import Updateacademy from "./Components/Admin/AdminComp/Update  Academy/Updateacademy";
import Addcourse from "./Components/Admin/AdminComp/Add Course/Addcourse";
import Updatebranch from "./Components/Admin/AdminComp/Update Branch/Updatebranch";
import Updatecourse from "./Components/Admin/AdminComp/Update Course/Updatecourse";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <Protectedroute>
                <Home />
              </Protectedroute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminregister" element={<Adminregister />} />
          <Route path="/admindash" element={<Admindash />}>
            <Route path="/admindash/addmanager" element={<Addmanager />} />
            <Route path="/admindash/viewmanager" element={<Viewmanager />} />
            <Route path="/admindash/viewacademy" element={<Viewacademy />} />
            <Route path="/admindash/viewbranch" element={<Viewbranch />} />
            <Route path="/admindash/viewcourse" element={<Viewcourse />} />
            <Route path="/admindash/viewEachManager/:userId" element={<Vieweachmanager />} />
            <Route path="/admindash/EditUserDetails/:id" element={<Edituserdata />} />
            <Route path="/admindash/academyRegister/:managerId" element={<Academyregister />} />
            <Route path="/admindash/viewacademy/updateacademy/:id" element={<Updateacademy />} />
            <Route path="/admindash/viewacademy/addbranch/:userId" element={<Addbranch />} />
            <Route path="/admindash/addCourse/:userId" element={<Addcourse/>}/>
            <Route path="/admindash/updateBranch/:id" element={<Updatebranch/>}/>
            <Route path="/admindash/updatecourse/:id" element={<Updatecourse/>}/>
          </Route>
            <Route path="/editMan" element={<UpdateManager />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
