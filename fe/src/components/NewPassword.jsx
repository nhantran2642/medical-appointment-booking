import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthRepository from '../api/auth';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#F4F7FC',
        padding: '20px',
    },
    box: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '24px',
        color: '#1F2B6C',
        marginBottom: '20px',
    },
    input: {
        width: '30%',
        padding: '12px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
    },
    button: {
        width: '20%',
        padding: '12px',
        margin: '10px 0',
        backgroundColor: '#1F2B6C',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#14204A',
    },
    successMessage: {
        color: '#28a745',
        fontSize: '14px',
        marginTop: '10px',
    },
    errorMessage: {
        color: '#D9534F',
        fontSize: '14px',
        marginTop: '10px',
    },
};
const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const uidb64 = queryParams.get('uidb64');
    const token = queryParams.get('token');

    const handleSubmit = async () => {
        try {
            const response = await AuthRepository.resetPassword({ password, uidb64, token });
            if (response.success) {
                setMessage('Mật khẩu đã được thay đổi thành công.');
                setError('');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                setError('Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại.');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại.');
            setMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Đặt lại mật khẩu</h1>
            <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSubmit} style={styles.button}>
                Đặt lại mật khẩu
            </button>
            {message && <p style={styles.successMessage}>{message}</p>}
            {error && <p style={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default PasswordReset;









