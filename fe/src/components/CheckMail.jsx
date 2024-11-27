import React from 'react';

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
    return (
        <div style={styles.container}>
            <h1>Hãy kiểm tra email của bạn</h1>
            <p>Chúng tôi đã gửi mail cho bạn. Hãy làm theo hướng dẫn trong gmail để đặt mật khẩu mới</p>
        </div>
    );
};

export default EmailVerification;
