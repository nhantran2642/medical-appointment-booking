import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '../assets/img/icon-google.png';
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
    register: {
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
        gap: '15px',
        marginBottom: '20px',
    },
    inputRow: {
        display: 'flex',
        gap: '15px',
    },
    inputBox: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,

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
        width: '97%',
    },
    inputName: {
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
    buttonHover: {
        backgroundColor: '#0056b3',
        transform: 'scale(1.05)',
    },
    buttonLabel: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 600,
        fontSize: '24px',
        color: '#fff',
    },
    errorMessage: {
        color: 'red',
        fontSize: '16px',
    },
    googleButton: {
        width: '300px',
        padding: '10px',
        margin: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        border: '1px solid #d3e0fe',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    googleButtonHover: {
        backgroundColor: '#f1f1f1',
        transform: 'scale(1.05)',
    },
    googleIcon: {
        width: '20px',
        height: '20px',
        objectFit: 'contain',
    },
    googleButtonLabel: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 700,
        fontSize: '20px',
        color: '#1f2b6c',
    },

};
const RegisterPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isHoveringButton, setIsHoveringButton] = useState(false);
    const [isHoveringGoogleButton, setIsHoveringGoogleButton] = useState(false);
    const [isHoveringSignIn, setIsHoveringSignIn] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const validateEmail = () => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            setEmailError('Email không hợp lệ');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validatePhone = () => {
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError('Số điện thoại không hợp lệ');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const handleRegister = () => {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isPhoneValid = validatePhone();
        if (isEmailValid && isPasswordValid && isPhoneValid) {
            console.log("Đăng ký thành công!");
            // Thêm xử lý đăng ký ở đây
        }
    };

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
                    <div style={styles.inputRow}>
                        <div style={styles.inputBox}>
                            <label style={styles.label} htmlFor="firstName">Họ</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                style={styles.inputName}
                            />
                        </div>
                        <div style={styles.inputBox}>
                            <label style={styles.label} htmlFor="lastName">Tên</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                style={styles.inputName}
                            />
                        </div>
                    </div>
                    <div style={styles.inputBox}>
                        <label style={styles.label} htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={styles.inputField}
                            onBlur={validateEmail}
                        />
                        {emailError && <div style={styles.errorMessage}>{emailError}</div>}
                    </div>
                    <div style={styles.inputBox}>
                        <label style={styles.label} htmlFor="phone">Số điện thoại</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            style={styles.inputField}
                            onBlur={validatePhone}
                        />
                        {phoneError && <div style={styles.errorMessage}>{phoneError}</div>}
                    </div>
                    <div style={styles.inputBox}>
                        <label style={styles.label} htmlFor="password">Mật khẩu</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={styles.inputField}
                                onBlur={validatePassword}
                            />
                            <img
                                src={isPasswordVisible ? require('../assets/img/Eye.png') : require('../assets/img/Eye-1.png')}
                                alt="eye icon"
                                style={styles.icon}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {passwordError && <div style={styles.errorMessage}>{passwordError}</div>}
                    </div>
                </div>
                <button
                    onClick={handleRegister}
                    style={isHoveringButton ? { ...styles.button, ...styles.buttonHover } : styles.button}
                    onMouseEnter={() => setIsHoveringButton(true)}
                    onMouseLeave={() => setIsHoveringButton(false)}
                >
                    <span style={styles.buttonLabel}>Đăng ký</span>
                </button>
                <div
                    style={isHoveringGoogleButton ? { ...styles.googleButton, ...styles.googleButtonHover } : styles.googleButton}
                    onMouseEnter={() => setIsHoveringGoogleButton(true)}
                    onMouseLeave={() => setIsHoveringGoogleButton(false)}
                >
                    <img src={googleIcon} alt="Google" style={styles.googleIcon} />
                    <span style={styles.googleButtonLabel}>Đăng nhập bằng Google</span>
                </div>
                <div style={styles.linkContainer}>
                    <span style={styles.haveAccount}>Bạn đã có tài khoản?</span>
                    <span
                        style={isHoveringSignIn ? { ...styles.signIn, ...styles.signInHover } : styles.signIn}
                        onMouseEnter={() => setIsHoveringSignIn(true)}
                        onMouseLeave={() => setIsHoveringSignIn(false)}
                    >
                        <Link to="/login">Đăng nhập</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
