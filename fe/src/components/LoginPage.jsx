import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthRepository from '../api/auth';
import EyeOpenIcon from '../assets/img/Eye.png';
import EyeClosedIcon from '../assets/img/Eye-1.png';
import BannerImage from '../assets/img/banner-login.png';
import { jwtDecode } from 'jwt-decode';
import UsersRepository from '../api/apiUsers';


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
    error: {
        color: 'red',
        marginTop: '10px',
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

        if (!email) {
            setError("Email không được để trống.");
            setIsLoading(false);
            return;
        }

        if (!password) {
            setError("Mật khẩu không được để trống.");
            setIsLoading(false);
            return;
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            setError("Email không đúng định dạng.");
            setIsLoading(false);
            return;
        }

        try {
            const loginData = { email, password };
            const response = await AuthRepository.loginUser(loginData);
            const { message, access } = response;

            if (message === "Send code verify for mail success") {
                navigate('/verify', { state: { email } });
            } else if (message === "Login successful" && access) {
                const decodedToken = jwtDecode(access);
                const { role_id, user_id } = decodedToken;
                localStorage.setItem('auth_token', access);

                const userResponse = await UsersRepository.getUserById(user_id);

                if (userResponse && userResponse.first_name && userResponse.last_name) {
                    const { first_name, last_name, email: userEmail, phone } = userResponse;
                    const fullName = `${first_name} ${last_name}`;
                    localStorage.setItem('user_name', fullName);
                    localStorage.setItem('user_email', userEmail);
                    localStorage.setItem('user_phone', phone);

                    if (role_id === 1) {
                        navigate('/admin/dashboard');
                    } else if (role_id === 4) {
                        navigate('/home');
                    } else {
                        setError("Không xác định được loại người dùng.");
                    }
                } else {
                    setError("Không thể lấy thông tin người dùng.");
                    console.error("Phản hồi lỗi từ API:", userResponse);
                }
            } else {
                setError("Sai email hoặc mật khẩu!");
            }
        } catch (err) {
            console.error("Phản hồi lỗi từ API:", err);
            setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftColumn}>
                <div style={styles.titleContainer}>
                    <h1 style={styles.welcome}>Chào mừng</h1>
                    <h2 style={styles.login}>Đăng nhập</h2>
                </div>
                <img
                    src={BannerImage}
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
                                src={isPasswordVisible ? EyeOpenIcon : EyeClosedIcon}
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
                >
                    <span style={styles.buttonLabel}>{isLoading ? 'Đang xử lý...' : 'Đăng nhập'}</span>
                </button>
                {error && <p style={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
