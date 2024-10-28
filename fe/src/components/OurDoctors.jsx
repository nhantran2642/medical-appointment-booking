import React, { useState } from "react";
import doctorImage1 from "../assets/img/doctor-1.png";
import doctorImage2 from "../assets/img/doctor-2.png";
import doctorImage3 from "../assets/img/doctor-3.png";
import facebookIcon from "../assets/img/facebook-1.png";
import instagramIcon from "../assets/img/instagram-1.png";
import linkedinIcon from "../assets/img/linkedin-1.png";

const OurDoctors = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const doctorsPerPage = 3;
    const doctors = [
        {
            name: "Dr. John Doe",
            specialty: "Tim Mạch",
            image: doctorImage1,
            social: [facebookIcon, instagramIcon, linkedinIcon],
        },
        {
            name: "Dr. Jane Smith",
            specialty: "Thần Kinh",
            image: doctorImage2,
            social: [facebookIcon, instagramIcon, linkedinIcon],
        },
        {
            name: "Dr. Emily Johnson",
            specialty: "Nhi Khoa",
            image: doctorImage3,
            social: [facebookIcon, instagramIcon, linkedinIcon],
        },
    ];

    const totalPages = Math.ceil(doctors.length / doctorsPerPage);
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    const startIndex = currentPage * doctorsPerPage;
    const displayedDoctors = doctors.slice(startIndex, startIndex + doctorsPerPage);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ color: "#159eec", fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "2.88px", textTransform: "uppercase", marginBottom: "10px" }}>
                Chăm Sóc Đáng Tin Cậy
            </p>
            <h2 style={{ color: "#1f2b6c", fontSize: "32px", marginBottom: "40px" }}>Bác Sĩ Nổi Bật</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {displayedDoctors.map((doctor, index) => (
                    <div
                        key={index}
                        style={{
                            width: "317px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                    >
                        <img src={doctor.image} alt={doctor.name} style={{ width: "100%", height: "350px", objectFit: "cover" }} />
                        <div style={{ backgroundColor: "#bfd2f8", textAlign: "center", padding: "15px" }}>
                            <p style={{ color: "#1f2b6c", fontFamily: "'Work Sans', sans-serif", fontSize: "18px" }}>{doctor.name}</p>
                            <p style={{ color: "#1f2b6c", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>{doctor.specialty}</p>
                            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
                                {doctor.social.map((icon, i) => (
                                    <img key={i} src={icon} alt="Social Icon" style={{ width: "20px", height: "20px" }} />
                                ))}
                            </div>
                            <a href="#" style={{ backgroundColor: "#1f2b6c", color: "#bfd2f8", padding: "10px", textAlign: "center", display: "block", borderRadius: "10px", textDecoration: "none", transition: "background-color 0.3s ease, transform 0.3s ease" }}>
                                Xem Thông Tin
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "20px" }}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handlePageChange(index)}
                        style={{
                            height: "12px",
                            width: "12px",
                            margin: "0 4px",
                            backgroundColor: currentPage === index ? "#1f2b6c" : "#bbb",
                            borderRadius: "50%",
                            display: "inline-block",
                            cursor: "pointer",
                        }}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default OurDoctors;
