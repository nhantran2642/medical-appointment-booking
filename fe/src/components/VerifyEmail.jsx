import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthRepository from '../api/index';
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        padding: '20px',
    },
    error: {
        color: 'red',
    },
    success: {
        color: 'green',
    },
};

const EmailVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const verificationCode = queryParams.get('p');

        if (verificationCode) {
            const verifyEmail = async () => {
                try {
                    const response = await AuthRepository.verifyEmail(verificationCode);
                    console.log(response);
                    if (response.message === "User is activated") {
                        setSuccessMessage('Xác thực email thành công!');
                        setTimeout(() => {
                            navigate('/verified-email');
                        }, 1000);
                    } else {
                        setError('Mã xác thực không hợp lệ hoặc đã hết hạn.');
                    }
                } catch (error) {
                    console.error('Error verifying email:', error);
                    setError('Đã có lỗi xảy ra khi xác thực email.');
                }
            };

            verifyEmail();
        }
    }, [location, navigate]);
    return (
        <div style={styles.container}>
            <h1>Hãy kiểm tra email của bạn</h1>
            <p>Chúng tôi đã gửi mã xác thực vào gmail của bạn. Hãy làm theo hướng dẫn trong gmail để hoàn tất đăng ký</p>
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

export default EmailVerification;
