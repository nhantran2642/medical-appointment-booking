import React from 'react';
import Logo from '../assets/img/Meddical.png';
import EmergencyIcon from '../assets/img/group-188-2.png';
import WorkHourIcon from '../assets/img/group-177-2.png';
import LocationIcon from '../assets/img/group-178-2.png';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px',
        background: '#fff',
        padding: '0 20px',
    },
    logo: {
        fontFamily: "'Yeseva One', sans-serif",
        fontSize: '36px',
        fontWeight: 400,
        color: '#1f2b6c',
        textTransform: 'uppercase',
    },
    contactDetails: {
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
    },
    contactItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        transition: 'transform 0.3s, color 0.3s',
    },
    label: {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: '16px',
        fontWeight: 500,
        color: '#1f2b6c',
        textTransform: 'uppercase',
        marginRight: '10px',
    },
    info: {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: '16px',
        fontWeight: 500,
        color: '#159eec',
    },
    image: {
        width: '30px',
        height: '30px',
        transition: 'filter 0.3s',
    },
};

const Topmost = () => {
    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                <img src={Logo} alt="Logo" />
            </div>
            <div style={styles.contactDetails}>
                <div style={styles.contactItem}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#1f2b6c';
                        e.currentTarget.querySelector('img').style.filter = 'brightness(0) saturate(100%) invert(44%) sepia(94%) saturate(6345%) hue-rotate(205deg) brightness(95%) contrast(100%)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.querySelector('img').style.filter = '';
                    }}
                >
                    <img src={EmergencyIcon} alt="Emergency Icon" style={styles.image} />
                    <div>
                        <div style={styles.label}>KHẨN CẤP</div>
                        <div style={styles.info}>(237) 681-812-255</div>
                    </div>
                </div>
                <div style={styles.contactItem}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#1f2b6c';
                        e.currentTarget.querySelector('img').style.filter = 'brightness(0) saturate(100%) invert(44%) sepia(94%) saturate(6345%) hue-rotate(205deg) brightness(95%) contrast(100%)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.querySelector('img').style.filter = '';
                    }}
                >
                    <img src={WorkHourIcon} alt="Work Hour Icon" style={styles.image} />
                    <div>
                        <div style={styles.label}>GIỜ LÀM VIỆC</div>
                        <div style={styles.info}>09:00 - 20:00 MỖI NGÀY</div>
                    </div>
                </div>
                <div style={styles.contactItem}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#1f2b6c';
                        e.currentTarget.querySelector('img').style.filter = 'brightness(0) saturate(100%) invert(44%) sepia(94%) saturate(6345%) hue-rotate(205deg) brightness(95%) contrast(100%)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.querySelector('img').style.filter = '';
                    }}
                >
                    <img src={LocationIcon} alt="Location Icon" style={styles.image} />
                    <div>
                        <div style={styles.label}>ĐỊA CHỈ</div>
                        <div style={styles.info}>0123 HẢI PHÒNG</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topmost;
