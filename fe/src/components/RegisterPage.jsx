import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(144,202,249,1) 30%, rgba(224,247,250,1) 100%)',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        padding: '20px',
    },
    titleContainer: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    welcome: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 700,
        fontSize: '48px',
        color: '#1f2b6c',
    },
    register: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 700,
        fontSize: '36px',
        color: '#1f2b6c',
    },
    illustration: {
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
    },
    rightColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        padding: '20px',
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '20px',
    },
    inputBox: {
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
    },
    inputField: {
        height: '40px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #d3e0fe',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '14px',
        color: '#1f2b6c',
        outline: 'none',
    },
    inputInnerBox: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    inputFieldWithIcon: {
        width: '100%',
        height: '40px',
        padding: '10px 40px 10px 10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #d3e0fe',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '14px',
        color: '#1f2b6c',
        outline: 'none',
    },
    label: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 500,
        fontSize: '20px',
        color: '#1f2b6c',
        marginBottom: '5px',
    },
    icon: {
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        objectFit: 'contain',
    },
    button: {
        width: '300px',
        padding: '10px',
        backgroundColor: '#1f2b6c',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    buttonLabel: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 600,
        fontSize: '14px',
        color: '#fff',
    },
    linkContainer: {
        display: 'flex',
        gap: '4px',
        marginTop: '20px',
    },
    haveAccount: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 500,
        fontSize: '20px',
        color: '#1f2b6c',
    },
    signIn: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 500,
        fontSize: '20px',
        color: '#1f2b6c',
        cursor: 'pointer',
        textDecoration: 'underline',
        transition: 'color 0.3s',
    },
    signInHover: {
        color: '#0056b3',
    },
};

const RegisterPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isHoveringSignIn, setIsHoveringSignIn] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const eyeIcon = isPasswordVisible ? require('../assets/img/Eye.png') : require('../assets/img/Eye-1.png');

    return (
        <div style={styles.container}>
            <div style={styles.leftColumn}>
                <div style={styles.titleContainer}>
                    <h1 style={styles.welcome}>Chào mừng</h1>
                    <h2 style={styles.register}>Đăng ký</h2>
                </div>
                <img
                    src={require('../assets/img/banner-login.png')}
                    alt="Hình minh họa trang đăng ký"
                    style={styles.illustration}
                />
            </div>
            <div style={styles.rightColumn}>
                <div style={styles.inputWrapper}>
                    <div style={styles.inputBox}>
                        <span style={styles.label}>Họ và tên</span>
                        <input type="text" style={styles.inputField} placeholder="Nhập họ và tên" />
                    </div>
                    <div style={styles.inputBox}>
                        <span style={styles.label}>Số điện thoại</span>
                        <input type="text" style={styles.inputField} placeholder="Nhập số điện thoại" />
                    </div>
                    <div style={styles.inputBox}>
                        <span style={styles.label}>Mật khẩu</span>
                        <div style={styles.inputInnerBox}>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                style={styles.inputFieldWithIcon}
                                placeholder="Nhập mật khẩu"
                            />
                            <img
                                src={eyeIcon}
                                alt={isPasswordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                style={styles.icon}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                    </div>
                </div>
                <button
                    style={styles.button}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0056b3';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#1f2b6c';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <span style={styles.buttonLabel}>Đăng ký</span>
                </button>
                <div style={styles.linkContainer}>
                    <span style={styles.haveAccount}>Đã có tài khoản?</span>
                    <Link
                        to="/login"
                        style={{
                            ...styles.signIn,
                            ...(isHoveringSignIn ? styles.signInHover : {}),
                        }}
                        onMouseEnter={() => setIsHoveringSignIn(true)}
                        onMouseLeave={() => setIsHoveringSignIn(false)}
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
