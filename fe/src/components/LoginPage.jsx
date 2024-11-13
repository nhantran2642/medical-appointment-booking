import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthRepository from '../api/index'
import { camelToSnakeKeys } from '../api/utils';
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
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const loginData = camelToSnakeKeys({ email, password });

            const response = await AuthRepository.loginUser(loginData);

            if (response && response.status === 'success') {
                alert("Đăng nhập thành công!");
                navigate('/home');
            } else {
                setError("Sai email hoặc mật khẩu!");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Đã xảy ra lỗi, vui lòng thử lại sau.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const eyeIcon = isPasswordVisible ? require('../assets/img/Eye.png') : require('../assets/img/Eye-1.png');

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
                        <span style={styles.label}>Email</span>
                        <input
                            type="text"
                            style={styles.inputField}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={styles.inputBox}>
                        <span style={styles.label}>Mật khẩu</span>
                        <div style={styles.inputInnerBox}>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                style={styles.inputFieldWithIcon}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                <div style={styles.linkContainer}>
                    <Link to="/forgot-password" style={styles.signUp}>Quên mật khẩu?</Link>
                    <span style={styles.noAccount}>Bạn chưa có tài khoản?</span>
                    <Link to="/register" style={styles.signUp}>Đăng ký</Link>
                </div>
                <button
                    style={styles.button}
                    onClick={handleLogin}
                    disabled={isLoading}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0056b3';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#1f2b6c';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    {isLoading ? <span>Đang xử lý...</span> : <span style={styles.buttonLabel}>Đăng nhập</span>}
                </button>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
