import React from 'react';
import { Link } from 'react-router-dom';
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    card: {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
    },
    title: {
        color: '#1F2B6C',
        fontSize: '30px',
        fontWeight: 'bold',
        marginBottom: '20px',
        fontFamily: 'Raleway, sans-serif',
    },
    message: {
        color: '#333',
        fontSize: '18px',
        marginBottom: '20px',
        fontFamily: 'Raleway, sans-serif',
    },
    button: {
        backgroundColor: '#1F2B6C',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '18px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        textDecoration: 'none',
        fontFamily: 'Raleway, sans-serif',
    },
    icon: {
        fontSize: '50px',
        color: '#1F2B6C',
        marginBottom: '20px',
    },
};

const EmailVerifiedPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>🎉</div>
                <h1 style={styles.title}>Xác Nhận Email Thành Công!</h1>
                <p style={styles.message}>
                    Cảm ơn bạn đã xác nhận email. Tài khoản của bạn đã được kích hoạt thành công.
                </p>
                <Link to="/login" style={styles.button}>
                    Đăng Nhập
                </Link>
            </div>
        </div>
    );
};

export default EmailVerifiedPage;
