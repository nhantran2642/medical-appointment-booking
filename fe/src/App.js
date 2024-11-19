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
import Dashboard from "./pages/adminDashboard";

import CalendarLayout from "./pages/calendarpage";
import AdLayout from "./layOuts/addashboardLayout";
import DoctorList from "./pages/doctorPage";
import DepartmentList from "./pages/medicaldepartmentpage";
import PatientList from "./pages/patientpage";
import PaymentPage from "./pages/paymentpage";

// eslint-disable-next-line



const Main = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Default Layout */}
          <Route path={APP_ROUTER.LOGIN} element={<LoginPage />} />
          <Route path="/calendar" element={<CalendarLayout />} />
          <Route path="/admin" element={<AdLayout />}>
            <Route path="/admin/calendar" element={<CalendarLayout />} />
            <Route path="/admin/doctor" element={<DoctorList />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/department" element={<DepartmentList />} />
            <Route path="/admin/patientlist" element={<PatientList />} />
            <Route path="/admin/paymentpage" element={<PaymentPage />} />
            <Route path="/admin/blogspage" element={<BlogPage />} />
          </Route>
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
