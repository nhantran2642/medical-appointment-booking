import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthRepository from '../api/auth';

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(144,202,249,1) 30%, rgba(224,247,250,1) 100%)',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '450px',
        width: '100%',
        padding: '30px',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
        width: '94%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    errorMessage: {
        color: '#e74c3c',
        marginBottom: '15px',
        fontSize: '14px',
    },
    successMessage: {
        color: '#2ecc71',
        marginBottom: '15px',
        fontSize: '14px',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1F2B6C',
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'background-color 0.3s',
    },
    submitButtonHover: {
        backgroundColor: '#0056b3',
    },
    backLink: {
        marginTop: '15px',
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '14px',
    },
};

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email) {
            setErrorMessage('Vui lòng nhập email của bạn.');
            return;
        }

        try {
            const forgotPasswordResponse = await AuthRepository.forgotPassword({ email });
            if (forgotPasswordResponse.message === 'We have sent you a link to reset your password') {
                navigate('/check-email');
            } else {
                setErrorMessage('Đã có lỗi khi gửi yêu cầu đặt lại mật khẩu.');
                setSuccessMessage('');
            }
        } catch (error) {
            if (error.response?.data?.non_field_errors) {
                const errorMessage = error.response.data.non_field_errors[0];
                if (errorMessage === "Invalid email") {
                    setErrorMessage('Email không hợp lệ. Vui lòng kiểm tra lại.');
                }
            } else {
                setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Quên mật khẩu</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
                    Nhập email của bạn để đặt lại mật khẩu.
                </p>
                <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
                <button
                    onClick={handleSubmit}
                    style={{
                        ...styles.submitButton,
                        ...(isHovered ? styles.submitButtonHover : {}),
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Gửi yêu cầu đặt lại mật khẩu
                </button>
                <a href="/login" style={styles.backLink}>Quay lại đăng nhập</a>
            </div>
        </div>
    );
};

export default ForgotPassword;
