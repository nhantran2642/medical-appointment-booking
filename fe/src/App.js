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
import VerifyCode from './components/VerifyCode';
import NotFound from './components/Error';
import CheckEmail from "./components/CheckMail";
import NewPassword from "./components/NewPassword";
import SuccessBooking from "./components/SuccessBooking";
import MedicalRecord from "./pages/medicalRecords";
import MedicalRecordDetail from "./pages/detailMedicalRecords";
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
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/password-reset" element={<NewPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/api/v1/payment/vnpay_return" element={<SuccessBooking />} />


          <Route path="/" element={<HomeLayout />}>
            <Route path="/contact" element={<AboutPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/bookappointment" element={<AppointmentPage />} />
            <Route path="/service" element={<Services />} />
            <Route path="/service/:id" element={<SingleServicePage />} />
            <Route path="/doctor" element={<DoctorsGrid />} />
            <Route path="/singledoctor/:doctorId" element={<SingleDoctor />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/blogspage" element={<BlogPage />} />
            <Route path="/blogspage/:id" element={<BlogPostDetail />} />
            <Route path="/profile" element={<ProfileInfo />} />
            <Route path="/notifications" element={<NotificationList />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/medical-record" element={<MedicalRecord />} />
            <Route path="/medical-record/:id" element={<MedicalRecordDetail />} />
            </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
