import React, { useState } from 'react';

const HeroSection = () => {
    const [hover, setHover] = useState(false);

    const heroStyles = {
        background: `url(${require('../assets/img/banner.png')}) no-repeat center center/cover`,
        height: "550px",
        display: "flex",
        alignItems: "center",
        color: "#1f2b6c",
        padding: "0 20px", // Added padding for better spacing
        boxSizing: "border-box", // Include padding in height calculations
    };

    const contentStyles = {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the left
        marginLeft: "20px",
    };

    const headingStyles = {
        fontSize: "3rem",
        margin: "0",
    };

    const paragraphStyles = {
        fontSize: "1.5rem",
        margin: "10px 0",
    };

    const buttonStyles = {
        marginTop: "20px",
        padding: "0.5rem 1rem",
        backgroundColor: hover ? "#1f2b6c" : "#bfd2f8",
        color: hover ? "#ffffff" : "#1f2b6c",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        fontSize: "1.25rem",
        transition: "background-color 0.3s ease, color 0.3s ease",
    };

    return (
        <section style={heroStyles} id="home">
            <div style={contentStyles}>
                <h1 style={headingStyles}>Sự lựa chọn hàng đầu</h1>
                <p style={paragraphStyles}>Chúng tôi quan tâm đến sức khỏe và hạnh phúc của bạn!</p>
                <button
                    style={buttonStyles}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    aria-label="View services"
                >
                    Dịch vụ
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
