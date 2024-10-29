import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./components/LoginPage";
import Register from "./components/RegisterPage";
import AboutPage from "./pages/aboutpage";
import { APP_ROUTER } from "./constants/appRouter";
import HomeLayout from "./layOuts/homeLayout";
import AppointmentPage from "./pages/bookappointmentpage";
import Services from "./pages/servicesPage";
import SingleServicePage from "./pages/singleServicePage";
import DoctorsGrid from "./pages/doctorPage";

const Main = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Default Layout */}
          <Route path={APP_ROUTER.LOGIN} element={<LoginPage />} />
          <Route path="/register" element={<Register />} />


          <Route path="/" element={<HomeLayout />}>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/bookappointment" element={<AppointmentPage />} />
            <Route path="/service" element={<Services />} />
            <Route path="/service/:id" element={<SingleServicePage />} />
            <Route path="/doctor" element={<DoctorsGrid />} />

          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
};

export default Main;
