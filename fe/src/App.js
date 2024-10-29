import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Register from "./components/RegisterPage";
import AboutPage from "./pages/aboutpage";
import { APP_ROUTER } from "./constants/appRouter";
import HomeLayout from "./layOuts/homeLayout";
import AppointmentPage from "./pages/bookappointmentpage";
import AppointmentDetails from "./pages/detailappointmentpage";
import BlogPage from "./pages/blogpage";
// eslint-disable-next-line



const Main = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Default Layout */}
          <Route path={APP_ROUTER.LOGIN} element={<LoginPage />} />


          <Route path="/" element={<HomeLayout />}>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bookappointment" element={<AppointmentPage />} />
            <Route path="/detailappointment" element={<AppointmentDetails />} />
            <Route path="/blogspage" element={<BlogPage />} />



          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
};

export default Main;
