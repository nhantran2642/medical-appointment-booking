import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthRepository from '../api/index';

const VerifyEmailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const isVerified = await AuthRepository.checkEmailVerified();
                if (isVerified) {
                    clearInterval(intervalId);
                    navigate('/email-verified');
                }
            } catch (error) {
                console.error(error.message);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [navigate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
            <h1>Xin mời bạn kiểm tra email</h1>
            <p>Chúng tôi đã gửi một email xác thực đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư đến và làm theo hướng dẫn để xác thực tài khoản của bạn.</p>
        </div>
    );
};

export default VerifyEmailPage;
