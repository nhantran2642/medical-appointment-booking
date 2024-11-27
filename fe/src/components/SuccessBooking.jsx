import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessBooking = () => {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate("/home");
  };

  const styles = {
    successBooking: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f6f9",
    },
    content: {
      textAlign: "center",
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "500px",
    },
    title: {
      fontSize: "2rem",
      color: "#1F2B6C",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    message: {
      fontSize: "1.2rem",
      color: "#333",
      marginBottom: "30px",
    },
    backBtn: {
      backgroundColor: "#1F2B6C",
      color: "white",
      padding: "12px 24px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    backBtnHover: {
      backgroundColor: "#1a2a4c", 
    },
  };

  return (
    <div style={styles.successBooking}>
      <div style={styles.content}>
        <h1 style={styles.title}>🎉 Đặt Lịch Thành Công 🎉</h1>
        <p style={styles.message}>
          Cảm ơn bạn đã đặt lịch thành công! <br/> Chúng tôi sẽ liên hệ với bạn
          sớm.
        </p>
        <button
          style={styles.backBtn}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.backBtnHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.backBtn.backgroundColor)}
          onClick={handleGoHome}
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default SuccessBooking;