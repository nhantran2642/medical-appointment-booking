import React, { useState } from "react";

const Navbar = () => {
    const [hover, setHover] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log("Searching for:", searchTerm);
            setSearchTerm("");
            setShowInput(false);
        }
    };

    const navbarStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1f2b6c",
        padding: "17px 150px",
    };

    const navListStyle = {
        display: "flex",
        listStyle: "none",
        gap: "20px",
        margin: 0,
        padding: 0,
    };

    const navLinkStyle = {
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "21.11px",
        color: "#fcfefeff",
        textDecoration: "none",
        padding: "10px",
        borderRadius: "10px",
        transition: "background-color 0.3s, color 0.3s, border-radius 0.3s",
    };

    const navItemStyle = {
        position: "relative",
        marginRight: "20px",
    };

    const appointmentButtonStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: hover ? "white" : "#bfd2f8ff",
        border: "2px solid transparent",
        borderRadius: "50px",
        padding: "13px 35px",
        fontFamily: "'Work Sans', sans-serif",
        fontSize: "16px",
        fontWeight: 500,
        color: "#1f2b6c",
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s, border 0.3s",
        boxSizing: "border-box",
    };

    const searchContainerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    };

    const inputStyle = {
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        height: "30px",
        display: showInput ? 'block' : 'none',
    };

    return (
        <nav style={navbarStyle}>
            <ul style={navListStyle}>
                {["Trang chủ", "Dịch vụ", "Bác sĩ", "Tin tức", "Liên hệ"].map((item) => (
                    <li key={item} style={navItemStyle}>
                        <a
                            href="home"
                            style={navLinkStyle}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "white";
                                e.currentTarget.style.color = "#1F2B6C";
                                e.currentTarget.style.border = "2px solid #1F2B6C";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#fcfefeff";
                                e.currentTarget.style.border = "none";
                            }}
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
            <div style={searchContainerStyle}>
                <div
                    style={{ display: "flex", alignItems: "center" }}
                    onMouseEnter={() => setShowInput(true)}
                    onMouseLeave={() => setShowInput(false)}
                >
                    <img
                        src={require('../assets/img/search.png')}
                        alt="Search Icon"
                        style={{ width: "24px", height: "24px", cursor: "pointer", marginRight: "10px" }}
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Tìm kiếm..."
                        style={inputStyle}
                    />
                </div>
                <button
                    style={appointmentButtonStyle}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Đặt lịch
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
