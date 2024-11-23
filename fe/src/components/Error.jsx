import React from "react";

const NotFound = () => {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
    };

    const contentStyle = {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    };

    const codeStyle = {
        fontSize: "48px",
        fontWeight: "bold",
        color: "#1a73e8",
        backgroundColor: "#e0e0e0",
        borderRadius: "50%",
        width: "80px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const textStyle = {
        fontSize: "16px",
        color: "#555",
        margin: "0",
    };

    const buttonStyle = {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#1a237e",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
    };

    const buttonHoverStyle = {
        backgroundColor: "#0d1b59",
    };

    const handleButtonClick = () => {
        window.location.href = "/";
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div style={codeStyle}>404</div>
                <div style={textStyle}>
                    <p>You can either stay and chill here, or go back to the beginning.</p>
                </div>
            </div>
            <button
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                onClick={handleButtonClick}
            >
                BACK TO HOME
            </button>
        </div>
    );
};

export default NotFound;
