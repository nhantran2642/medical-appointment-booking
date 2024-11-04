import React, { useState } from 'react';

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
    captchaContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        width: '100%',
    },
    captchaInput: {
        flex: 1,
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        marginRight: '10px',
    },
    captchaCode: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
    },
    refreshButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        color: '#007bff',
    },
    errorMessage: {
        color: '#e74c3c',
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
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
    const [errorMessage, setErrorMessage] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const handleSubmit = () => {
        if (captchaInput !== captchaCode) {
            setErrorMessage('Mã captcha không đúng. Vui lòng thử lại.');
            setCaptchaCode(generateCaptcha());
            setCaptchaInput('');
        } else {
            setErrorMessage('');
            console.log(`Gửi email xác nhận đến: ${email}`);
            alert('Yêu cầu lấy lại mật khẩu đã được gửi.');
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Quên mật khẩu</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
                    Nhập email của bạn để nhận mã xác nhận lấy lại mật khẩu.
                </p>
                <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <div style={styles.captchaContainer}>
                    <input
                        type="text"
                        placeholder="Nhập mã captcha"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        style={styles.captchaInput}
                    />
                    <span style={styles.captchaCode}>{captchaCode}</span>
                    <button
                        onClick={() => setCaptchaCode(generateCaptcha())}
                        style={styles.refreshButton}
                    >
                        🔄
                    </button>
                </div>
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
                    Lấy lại mật khẩu
                </button>
                <a href="/login" style={styles.backLink}>Quay lại đăng nhập</a>
            </div>
        </div>
    );
};

export default ForgotPassword;
