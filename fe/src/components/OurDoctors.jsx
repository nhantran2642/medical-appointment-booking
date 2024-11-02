import React, { useState } from 'react';
import { doctors } from '../mock';

const OurDoctors = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const doctorsPerPage = 3;
    const totalPages = Math.ceil(doctors.length / doctorsPerPage);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const startIndex = currentPage * doctorsPerPage;
    const displayedDoctors = doctors.slice(startIndex, startIndex + doctorsPerPage);

    const containerStyle = {
        textAlign: 'center',
        padding: '20px',
    };

    const titleStyle = {
        color: '#159eecff',
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: 700,
        fontSize: '18px',
        letterSpacing: '2.88px',
        textTransform: 'uppercase',
        marginBottom: '10px',
    };

    const subtitleStyle = {
        color: '#1f2b6cff',
        fontFamily: "'Yeseva One', serif",
        fontSize: '32px',
        marginBottom: '40px',
    };

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    };

    const cardStyle = {
        width: '317px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
    };

    const imageStyle = {
        width: '100%',
        height: '350px',
        objectFit: 'cover',
    };

    const cardContentStyle = {
        backgroundColor: '#bfd2f8ff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const nameStyle = {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: '18px',
        color: '#1f2b6cff',
    };

    const specialtyStyle = {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: '18px',
        fontWeight: 700,
        color: '#1f2b6cff',
        textTransform: 'uppercase',
        marginBottom: '10px',
    };

    const profileButtonStyle = {
        backgroundColor: '#1f2b6c',
        color: '#bfd2f8ff',
        border: 'none',
        padding: '10px',
        width: '100%',
        textAlign: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'block',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    };

    const socialIconsStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px',
        padding: '15px',
    };

    return (
        <div style={containerStyle}>
            <p style={titleStyle}>Chăm sóc đáng tin cậy</p>
            <h2 style={subtitleStyle}>Bác sĩ nổi bật</h2>
            <div style={cardContainerStyle}>
                {displayedDoctors.map((doctor, index) => (
                    <div
                        key={index}
                        style={cardStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        }}
                    >
                        <img src={doctor.image} alt={doctor.name} style={imageStyle} />
                        <div style={cardContentStyle}>
                            <p style={nameStyle}>{doctor.name}</p>
                            <p style={specialtyStyle}>{doctor.specialty}</p>
                            <div style={socialIconsStyle}>
                                {doctor.social.map((icon, i) => (
                                    <img key={i} src={icon} alt="Social Icon" />
                                ))}
                            </div>
                            <a href="#" style={profileButtonStyle}>Xem thông tin</a>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handlePageChange(index)}
                        style={{
                            height: '12px',
                            width: '12px',
                            margin: '0 4px',
                            backgroundColor: currentPage === index ? '#717171' : '#bbb',
                            borderRadius: '50%',
                            display: 'inline-block',
                            cursor: 'pointer',
                        }}
                    ></span>
                ))}
            </div>
        </div>
    );
};
export default OurDoctors;