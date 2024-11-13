import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthRepository from '../api/index';
import { camelToSnakeKeys } from '../api/utils';
// import googleIcon from '../assets/img/icon-google.png';

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
    linkContainer: {
        fontSize: '20px',
        padding: '10px',
    }
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isHoveringButton, setIsHoveringButton] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');


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
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError('Số điện thoại không hợp lệ');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const eyeIcon = isPasswordVisible ? require('../assets/img/Eye.png') : require('../assets/img/Eye-1.png');


    const handleRegister = async () => {
        if (emailError || phoneError || passwordError) {
            alert('Vui lòng sửa các lỗi trước khi đăng ký');
            return;
        }

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            address: address,
            password: password,
            role_id: 4,
        };

        const snakeCaseData = camelToSnakeKeys(userData);


        try {
            await AuthRepository.registerUser(snakeCaseData);
            navigate('/verify-email');
        } catch (error) {
            alert(error.message);
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
                                onChange={(e) => setFirstName(e.target.value)}
                                style={styles.inputField}
                            />
                        </div>
                        <div style={styles.inputBox}>
                            <label style={styles.label} htmlFor="lastName">Tên</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                style={styles.inputField}
                            />
                        </div>
                    </div>
                    <div style={styles.inputBox}>
                        <label style={styles.label} htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                            style={styles.inputField}
                        />
                        {emailError && <div style={styles.errorMessage}>{emailError}</div>}
                    </div>
                    <div style={styles.inputBox}>
                        <label style={styles.label} htmlFor="phone">Số điện thoại</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={validatePhone}
                            style={styles.inputField}
                        />
                        {phoneError && <div style={styles.errorMessage}>{phoneError}</div>}
                    </div>
                    <div style={styles.inputBox}>
                        <label style={styles.label} htmlFor="address">Địa chỉ</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={styles.inputField}
                        />
                    </div>

                    <div style={styles.inputBox}>
                        <span style={styles.label} htmlFor="password">Mật khẩu</span>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="password"
                                type={isPasswordVisible ? 'text' : 'password'}
                                style={styles.inputField}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validatePassword}
                            />
                            <img
                                src={eyeIcon}
                                alt={isPasswordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                style={styles.icon}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {passwordError && <div style={styles.errorMessage}>{passwordError}</div>}
                    </div>
                </div>
                <button
                    onClick={handleRegister}
                    style={{
                        ...styles.button,
                        ...(isHoveringButton && styles.buttonHover),
                    }}
                    onMouseEnter={() => setIsHoveringButton(true)}
                    onMouseLeave={() => setIsHoveringButton(false)}
                >
                    <span style={styles.buttonLabel}>Đăng ký</span>
                </button>
                {/* <button
                    style={{
                        ...styles.googleButton,
                        ...(isHoveringButton && styles.googleButtonHover),
                    }}
                    onMouseEnter={() => setIsHoveringSignIn(true)}
                    onMouseLeave={() => setIsHoveringSignIn(false)}
                >
                    <img src={googleIcon} alt="Google" style={styles.googleIcon} />
                    <span style={styles.googleButtonLabel}>Đăng nhập bằng Google</span>
                </button> */}
                <div style={styles.linkContainer}>
                    <p>
                        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
