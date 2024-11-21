import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import BookAppointmentPage from "./pages/bookappointmentpage";
import BlogPage from "./pages/blogpage";
import BlogPostDetail from "./pages/detailBlogs";
import ScrollToTop from "./components/ScrollToTop";
import ForgotPassword from "./components/Forgot-password";
import ProfileInfo from "./pages/infoPage";
import NotificationList from "./pages/notificationPage";
import Schedule from "./pages/schedulePage";
import SingleDoctor from "./pages/singleDoctor";
import VerifyEmailPage from './components/VerifyEmail';
import SuccessEmail from './components/SuccessEmail';
import Dashboard from "./pages/adminDashboard";
import AppointmentDetails from "./pages/detailappointmentpage";
import CalendarLayout from "./pages/calendarpage";
import AdLayout from "./layOuts/addashboardLayout";
import DoctorList from "./pages/doctorPage";
import DepartmentList from "./pages/medicaldepartmentpage";
import PatientList from "./pages/patientpage";
import PaymentPage from "./pages/paymentpage";

// eslint-disable-next-line



const Main = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/verified-email" element={<SuccessEmail />} />

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
          </Route>
          <Route path="/" element={<HomeLayout />}>
            <Route path="/contact" element={<AboutPage />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/bookappointment" element={<AppointmentPage />} />
            <Route path="/service" element={<Services />} />
            <Route path="/service/:id" element={<SingleServicePage />} />
            <Route path="/doctor" element={<DoctorsGrid />} />
            <Route path="/singledoctor/:doctorId" element={<SingleDoctor />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/detailappointment" element={<AppointmentDetails />} />
            <Route path="/blogspage" element={<BlogPage />} />
            <Route path="/blogspage/:id" element={<BlogPostDetail />} />
            <Route path="/profile" element={<ProfileInfo />} />
            <Route path="/notifications" element={<NotificationList />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/blogspage" element={<BlogPage />} />



          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
