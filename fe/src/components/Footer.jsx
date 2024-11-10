import React, { useState } from 'react';
import SendIcon from '../assets/img/Vector.svg';
import SocialIcon1 from '../assets/img/linkin.png';
import SocialIcon2 from '../assets/img/facebook.png';
import SocialIcon3 from '../assets/img/instagram.png';

const Footer = () => {
    const [hovered, setHovered] = useState(null);

    const footerStyle = {
        background: '#1f2b6c',
        color: '#fcfefeff',
        padding: '40px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const contentWrapperStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px',
        marginBottom: '40px',
    };

    const sectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '0 20px',
    };

    const titleStyle = {
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '21.11px',
        marginBottom: '10px',
    };

    const textStyle = {
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '140%',
        marginBottom: '10px',
        textAlign: 'left',
        transition: 'color 0.3s',
        cursor: 'pointer',
    };

    const hoverStyle = {
        color: '#ffd700',
    };

    const dividerStyle = {
        width: '100%',
        height: '2px',
        backgroundColor: '#ffffff',
        margin: '20px 0',
    };

    return (
        <footer style={footerStyle} id='aboutus'>
            <div style={contentWrapperStyle}>
                <div style={sectionStyle}>
                    <h2 style={{ ...textStyle, fontFamily: 'Yeseva One', color: '#bfd2f8ff', fontSize: '36px', margin: 0 }}>
                        Meddical
                    </h2>
                    <p
                        style={{ ...textStyle, maxWidth: '240px' }}
                        onMouseEnter={() => setHovered('description')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        Dẫn đầu về chất lượng y tế xuất sắc, dịch vụ chăm sóc đáng tin cậy.
                    </p>
                </div>
                <div style={sectionStyle}>
                    <h3 style={titleStyle}>Thông tin</h3>
                    {['Đặt lịch', 'Bác sĩ', 'Dịch vụ', 'Giới thiệu về chúng tôi'].map((link) => (
                        <p
                            key={link}
                            style={{ ...textStyle, ...(hovered === link ? hoverStyle : {}) }}
                            onMouseEnter={() => setHovered(link)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {link}
                        </p>
                    ))}
                </div>
                <div style={sectionStyle}>
                    <h3 style={titleStyle}>Liên hệ</h3>
                    {[
                        'Số điện thoại: (237) 681-812-255',
                        'Email: meddical@gmail.com',
                        'Địa chỉ: 0123 Hải Phòng',
                        'Đà Nẵng',
                    ].map((info) => (
                        <p
                            key={info}
                            style={{ ...textStyle, ...(hovered === info ? hoverStyle : {}) }}
                            onMouseEnter={() => setHovered(info)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {info}
                        </p>
                    ))}
                </div>
                <div style={sectionStyle}>
                    <h3 style={titleStyle}>Nhận thông báo</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flex: '1' }}>
                            <input
                                type="text"
                                placeholder="Enter your email address"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px 0 0 5px',
                                    border: 'none',
                                    flex: '1',
                                }}
                            />
                            <button
                                style={{
                                    width: '30px',
                                    height: '40px',
                                    border: 'none',
                                    background: '#ffffff',
                                    cursor: 'pointer',
                                    borderRadius: '0 5px 5px 0',
                                }}
                            >
                                <img src={SendIcon} alt="Send" style={{ width: '100%', height: '100%' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={dividerStyle}></div>
            <p>
                © 2024 Hospital’s name All Rights Reserved by NguLinh
            </p>
            <div>
                <img src={SocialIcon1} alt="Social Icon 1" style={{ margin: '0 5px' }} />
                <img src={SocialIcon2} alt="Social Icon 2" style={{ margin: '0 5px' }} />
                <img src={SocialIcon3} alt="Social Icon 3" style={{ margin: '0 5px' }} />
            </div>
        </footer>
    );
};

export default Footer;
