import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthRepository from '../api/index';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(144,202,249,1) 30%, rgba(224,247,250,1) 100%)',
    },
    title: {
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 700,
        fontSize: '40px',
        color: '#1f2b6c',
        marginBottom: '20px',
    },
    input: {
        width: '300px',
        height: '40px',
        marginBottom: '20px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #d3e0fe',
        outline: 'none',
    },
    button: {
        width: '200px',
        height: '50px',
        padding: '10px',
        backgroundColor: '#1f2b6c',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 600,
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};
const VerificationCode = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;
    if (!email) {
        return <p>Email không hợp lệ. Vui lòng quay lại trang đăng nhập.</p>;
    }
    const handleVerify = async () => {
        setIsLoading(true);
        setError(null);
    
        try {
            const payload = { email, code: verificationCode };
            const response = await AuthRepository.verifyLoginCode(payload);
    
            if (response.email === email && response.access) {
                navigate(`/home?p=${encodeURIComponent(response.access)}`);
            } else {
                setError('Mã xác thực không chính xác. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi xác thực:', error);
            setError('Đã xảy ra lỗi, vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Nhập mã xác thực</h1>
            <input
                type="text"
                placeholder="Nhập mã OTP"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                style={styles.input}
            />
            <button
                onClick={handleVerify}
                disabled={isLoading || !verificationCode}
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
                {isLoading ? 'Đang xử lý...' : 'Xác thực'}
            </button>
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

export default VerificationCode;
