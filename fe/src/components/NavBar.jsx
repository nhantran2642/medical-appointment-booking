import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTER } from "../constants/appRouter";
import { menuItems } from "../mock";

const Navbar = () => {
    const [hover, setHover] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log("Searching for:", searchTerm);
            setSearchTerm("");
            setShowInput(false);
        }
    };

    const handleAvatarClick = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navbarStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1f2b6c",
        padding: "17px 150px",
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

    const dropdownMenuStyle = {
        width: "200px",
        position: "absolute",
        top: "60px",
        right: "0",
        backgroundColor: "white",
        color: "#1f2b6c",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        zIndex: 1,
        display: showDropdown ? 'block' : 'none',
    };

    const dropdownItemStyle = (isHovered) => ({
        padding: "10px",
        fontSize: "16px",
        fontFamily: "'Work Sans', sans-serif",
        color: isHovered ? "white" : "#1f2b6c",
        backgroundColor: isHovered ? "#1f2b6c" : "white",
        textDecoration: "none",
        display: "block",
        transition: "background-color 0.3s, color 0.3s",
    });

    const arrowStyle = {
        position: "absolute",
        top: "0",
        right: "10px",
        transform: "translateY(-100%)",
        width: "0",
        height: "0",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: "8px solid white",
    };

    return (
        <nav style={navbarStyle}>
            <ul style={{ display: "flex", listStyle: "none", gap: "20px", margin: 0, padding: 0 }}>
                <li><Link to={APP_ROUTER.HOME} style={navLinkStyle}>Trang chủ</Link></li>
                <li><Link to={APP_ROUTER.SERVICE} style={navLinkStyle}>Dịch vụ</Link></li>
                <li><Link to={APP_ROUTER.DOCTOR} style={navLinkStyle}>Đội ngũ</Link></li>
                <li><Link to={APP_ROUTER.BLOG} style={navLinkStyle}>Tin tức</Link></li>
                <li><Link to={APP_ROUTER.CONTACT} style={navLinkStyle}>Liên hệ</Link></li>
            </ul>

            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{ display: "flex", alignItems: "center", gap: "10px", marginRight: "20px" }}
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
                        style={{
                            padding: "5px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            height: "30px",
                            display: showInput ? 'block' : 'none',
                        }}
                    />
                </div>

                <button
                    style={appointmentButtonStyle}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => navigate('/book-appointment')}
                >
                    Đặt lịch
                </button>

                <div className="info-client" style={{ position: "relative", marginLeft: "20px" }} ref={dropdownRef}>
                    <img
                        src={require('../assets/img/avatar-user.png')}
                        alt="User Avatar"
                        style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }}
                        onClick={handleAvatarClick}
                    />
                    {showDropdown && (
                        <div style={dropdownMenuStyle}>
                            <div style={arrowStyle}></div>
                            <Link
                                to={APP_ROUTER.PROFILE}
                                style={dropdownItemStyle(hoveredItem === "profile")}
                                onMouseEnter={() => setHoveredItem("profile")}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                Thông tin cá nhân
                            </Link>
                            <Link
                                to={APP_ROUTER.SCHEDULE}
                                style={dropdownItemStyle(hoveredItem === "schedule")}
                                onMouseEnter={() => setHoveredItem("schedule")}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                Lịch khám bệnh
                            </Link>
                            <Link
                                to={APP_ROUTER.NOTIFICATIONS}
                                style={dropdownItemStyle(hoveredItem === "notifications")}
                                onMouseEnter={() => setHoveredItem("notifications")}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                Thông báo
                            </Link>
                            <Link
                                to={APP_ROUTER.LOGOUT}
                                style={dropdownItemStyle(hoveredItem === "logout")}
                                onMouseEnter={() => setHoveredItem("logout")}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                Đăng xuất
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
