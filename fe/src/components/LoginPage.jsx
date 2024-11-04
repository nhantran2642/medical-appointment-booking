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
        fontSize: '70px',
        color: '#1f2b6c',
    },
    login: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 700,
        fontSize: '50px',
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
        gap: '10px',
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
        fontSize: '24px',
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
        fontSize: '24px',
        color: '#1f2b6c',
        outline: 'none',
    },
    label: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 500,
        fontSize: '24px',
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
        height: '50px',
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
        fontSize: '24px',
        color: '#fff',
    },
    googleButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '300px',
        padding: '10px 0',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #d3e0fe',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
        marginTop: '15px',
    },
    googleIcon: {
        width: '20px',
        height: '20px',
        marginRight: '10px',
    },
    googleButtonLabel: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 600,
        fontSize: '20px',
        color: '#1f2b6c',
    },
    linkContainer: {
        display: 'flex',
        gap: '4px',
        marginTop: '20px',
    },
    noAccount: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 500,
        fontSize: '20px',
        color: '#1f2b6c',
    },
    signUp: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 500,
        fontSize: '20px',
        color: '#1f2b6c',
        cursor: 'pointer',
        textDecoration: 'underline',
        transition: 'color 0.3s',
    },
    signUpHover: {
        color: '#0056b3',
    },
    link: {
        width: '500px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '20px',
    }
};

const LoginPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isHoveringSignUp, setIsHoveringSignUp] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const eyeIcon = isPasswordVisible ? require('../assets/img/Eye.png') : require('../assets/img/Eye-1.png');
    const googleIcon = require('../assets/img/icon-google.png');

    return (
        <div style={styles.container}>
            <div style={styles.leftColumn}>
                <div style={styles.titleContainer}>
                    <h1 style={styles.welcome}>Chào mừng</h1>
                    <h2 style={styles.login}>Đăng nhập</h2>
                </div>
                <img
                    src={require('../assets/img/banner-login.png')}
                    alt="Hình minh họa trang đăng nhập"
                    style={styles.illustration}
                />
            </div>
            <div style={styles.rightColumn}>
                <div style={styles.inputWrapper}>
                    <div style={styles.inputBox}>
                        <span style={styles.label}>Số điện thoại</span>
                        <input type="text" style={styles.inputField} />
                    </div>
                    <div style={styles.inputBox}>
                        <span style={styles.label}>Mật khẩu</span>
                        <div style={styles.inputInnerBox}>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                style={styles.inputFieldWithIcon}

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
                <div style={styles.link}>
                    <div style={styles.linkContainer}>
                        <Link to="/forgot-password" style={styles.signUp}>Quên mật khẩu?</Link>
                    </div>
                    <div style={styles.linkContainer}>
                        <span style={styles.noAccount}>Bạn chưa có tài khoản?</span>
                        <Link
                            to="/register"
                            style={{
                                ...styles.signUp,
                                ...(isHoveringSignUp ? styles.signUpHover : {}),
                            }}
                            onMouseEnter={() => setIsHoveringSignUp(true)}
                            onMouseLeave={() => setIsHoveringSignUp(false)}
                        >
                            Đăng ký
                        </Link>
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
                    <span style={styles.buttonLabel}>Đăng nhập</span>
                </button>
                <div
                    style={styles.googleButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f3f4';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <img src={googleIcon} alt="Google Icon" style={styles.googleIcon} />
                    <span style={styles.googleButtonLabel}>Đăng nhập bằng Google</span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
