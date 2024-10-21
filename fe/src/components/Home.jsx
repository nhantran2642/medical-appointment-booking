import React, { useState } from "react";
import Topmost from "./Topmost";
import Navbar from "./NavBar";
import Footer from "./Footer";

// Appointment Cards

const cardData = [
    {
        text: "Book an Appointment",
        color: "#1f2b6c",
        textColor: "#fcfefeff",
        icon: require("../assets/img/Calendar.png"),
    },
    {
        text: "Join Our Team",
        color: "#bfd2f8ff",
        textColor: "#1f2b6cff",
        icon: require("../assets/img/Team.png"),
    },
    {
        text: "Manage Your Payments",
        color: "#159eecff",
        textColor: "#fcfefeff",
        icon: require("../assets/img/Cash.png"),
    },
];

const AppointmentCards = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const cardStyle = (bgColor, textColor, isHovered) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: isHovered ? "#f0f4ff" : bgColor,
        color: isHovered ? "#1f2b6c" : textColor,
        borderRadius: "5px",
        padding: "25px 20px",
        width: "250px",
        margin: "-40px 10px 20px 10px",
        transition: "background-color 0.3s, color 0.3s, transform 0.3s",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered ? "0 8px 20px rgba(0, 0, 0, 0.2)" : "none",
        border: isHovered ? `2px solid ${textColor}` : "none",
    });

    const textStyle = {
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "140%",
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}>
            {cardData.map((card, index) => (
                <div
                    key={index}
                    style={cardStyle(card.color, card.textColor, hoveredIndex === index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <span style={textStyle}>{card.text}</span>
                    <img src={card.icon} alt="Icon" style={{ height: "36px" }} />
                </div>
            ))}
        </div>
    );
};

// Hero Section
const HeroSection = () => {
    const [hover, setHover] = useState(false);

    const heroStyles = {
        background: `url(${require('../assets/img/banner.png')}) no-repeat center center/cover`,
        height: "550px",
        display: "flex",
        alignItems: "center",
        color: "#1f2b6c",
    };

    const contentStyles = {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "20px",
    };

    const headingStyles = {
        fontSize: "3rem",
        margin: "0",
    };

    const paragraphStyles = {
        fontSize: "1.5rem",
        margin: "10px 0",
    };

    const buttonStyles = {
        marginTop: "20px",
        padding: "0.5rem 1rem",
        backgroundColor: hover ? "#1f2b6c" : "#bfd2f8",
        color: hover ? "#ffffff" : "#1f2b6c",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        fontSize: "1.25rem",
        transition: "background-color 0.3s ease, color 0.3s ease",
    };

    return (
        <section style={heroStyles} id="home">
            <div style={contentStyles}>
                <h1 style={headingStyles}>Sự lựa chọn hàng đầu</h1>
                <p style={paragraphStyles}>Chúng tôi quan tâm đến sức khỏe và hạnh phúc của bạn!</p>
                <button
                    style={buttonStyles}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Dịch vụ
                </button>
            </div>
        </section>
    );
};


// Our Doctors Section

const doctors = [
    {
        name: "Dr. John Doe",
        specialty: "Cardiology",
        image: require("../assets/img/doctor-1.png"),
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")]
    },
    {
        name: "Dr. Jane Smith",
        specialty: "Neurology",
        image: require("../assets/img/doctor-2.png"),
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")]
    },
    {
        name: "Dr. Emily Johnson",
        specialty: "Pediatrics",
        image: require("../assets/img/doctor-3.png"),
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")]
    },
    {
        name: "Dr. Michael Brown",
        specialty: "Orthopedics",
        image: require("../assets/img/doctor-3.png"),
        social: [require("../assets/img/linkin.png"), require("../assets/img/facebook.png"), require("../assets/img/instagram.png")]
    }
];

const OurDoctors = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const doctorsPerPage = 3;
    const totalPages = Math.ceil(doctors.length / doctorsPerPage);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const startIndex = currentPage * doctorsPerPage;
    const displayedDoctors = doctors.slice(startIndex, startIndex + doctorsPerPage);

    const containerStyle = {
        textAlign: 'center',
        padding: '20px',
    };

    const titleStyle = {
        color: '#159eecff',
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: 700,
        fontSize: '18px',
        letterSpacing: '2.88px',
        textTransform: 'uppercase',
        marginBottom: '10px',
    };

    const subtitleStyle = {
        color: '#1f2b6cff',
        fontFamily: "'Yeseva One', serif",
        fontSize: '32px',
        marginBottom: '40px',
    };

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    };

    const cardStyle = {
        width: '317px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
    };

    const imageStyle = {
        width: '100%',
        height: '350px',
        objectFit: 'cover',
    };

    const cardContentStyle = {
        backgroundColor: '#bfd2f8ff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const nameStyle = {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: '18px',
        color: '#1f2b6cff',
    };

    const specialtyStyle = {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: '18px',
        fontWeight: 700,
        color: '#1f2b6cff',
        textTransform: 'uppercase',
        marginBottom: '10px',
    };

    const profileButtonStyle = {
        backgroundColor: '#1f2b6c',
        color: '#bfd2f8ff',
        border: 'none',
        padding: '10px',
        width: '100%',
        textAlign: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'block',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    };

    const socialIconsStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px',
        padding: '15px',
    };

    return (
        <div style={containerStyle}>
            <p style={titleStyle}>Chăm sóc đáng tin cậy</p>
            <h2 style={subtitleStyle}>Bác sĩ nổi bật</h2>
            <div style={cardContainerStyle}>
                {displayedDoctors.map((doctor, index) => (
                    <div
                        key={index}
                        style={cardStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        }}
                    >
                        <img src={doctor.image} alt={doctor.name} style={imageStyle} />
                        <div style={cardContentStyle}>
                            <p style={nameStyle}>{doctor.name}</p>
                            <p style={specialtyStyle}>{doctor.specialty}</p>
                            <div style={socialIconsStyle}>
                                {doctor.social.map((icon, i) => (
                                    <img key={i} src={icon} alt="Social Icon" />
                                ))}
                            </div>
                            <a href="#" style={profileButtonStyle}>Xem thông tin</a>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handlePageChange(index)}
                        style={{
                            height: '12px',
                            width: '12px',
                            margin: '0 4px',
                            backgroundColor: currentPage === index ? '#717171' : '#bbb',
                            borderRadius: '50%',
                            display: 'inline-block',
                            cursor: 'pointer',
                        }}
                    ></span>
                ))}
            </div>
        </div>
    );
};



// Welcome Banner
const WelcomeBanner = () => {
    const bannerStyles = {
        textAlign: 'center',
        padding: '50px',
        fontFamily: 'Arial, sans-serif'
    };

    const titleStyles = {
        color: '#1b75bc',
        fontSize: '18px',
        marginBottom: '10px',
        letterSpacing: '1px'
    };

    const subtitleStyles = {
        color: '#333',
        fontSize: '28px',
        marginBottom: '20px'
    };

    const textStyles = {
        color: '#666',
        fontSize: '16px',
        maxWidth: '600px',
        margin: '0 auto 30px',
        lineHeight: '1.6'
    };

    const linkStyles = {
        color: '#1b75bc',
        fontSize: '16px',
        textDecoration: 'none',
        display: 'inline-block',
        marginTop: '20px',
        fontWeight: 'bold',
        padding: '10px 20px',
        border: '2px solid #1b75bc',
        borderRadius: '5px',
        transition: 'all 0.3s ease'
    };

    const linkHoverStyles = {
        backgroundColor: '#1b75bc',
        color: '#fff'
    };

    const arrowStyles = {
        marginLeft: '5px'
    };

    return (
        <div style={bannerStyles}>
            <h2 style={titleStyles}>CHÀO MỪNG ĐẾN VỚI MEDDICAL</h2>
            <h1 style={subtitleStyles}>Một nơi tuyệt vời để nhận được sự chăm sóc</h1>
            <p style={textStyles}>
                Tại Meddical, chúng tôi cam kết mang đến cho bạn sự chăm sóc toàn diện và tận tâm. Với đội ngũ y bác sĩ chuyên nghiệp và trang thiết bị hiện đại, Meddical là nơi bạn có thể hoàn toàn yên tâm về sức khỏe của mình. Chúng tôi luôn sẵn sàng hỗ trợ bạn trong hành trình bảo vệ và nâng cao sức khỏe mỗi ngày.
                <br />Hãy đến và trải nghiệm dịch vụ chăm sóc sức khỏe tốt nhất tại Meddical!
            </p>
            <a
                href="#"
                style={linkStyles}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = linkHoverStyles.backgroundColor;
                    e.target.style.color = linkHoverStyles.color;
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = linkStyles.color;
                }}
            >
                Xem thêm <span style={arrowStyles}>→</span>
            </a>
        </div>
    );
};

// Centered Image
const CenteredImage = () => {
    const centeredContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
        height: '250px',
        margin: '10px'
    };

    const imageStyles = {
        maxWidth: '100%',
        maxHeight: '100%'
    };

    return (
        <div style={centeredContainerStyles}>
            <img src={require('../assets/img/banner-2.png')} alt="Banner2" style={imageStyles} />
        </div>
    );
};
//component Services
const Services = () => {
    const styles = {
        container: {
            display: 'flex',
            width: '100%',
            fontFamily: 'Arial, sans-serif',
            flexDirection: 'column',
            alignItems: 'center',
        },
        sidebar: {
            width: '20%',
            backgroundColor: '#f0f2f5',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        list: {
            listStyleType: 'none',
            padding: 0,
            width: '100%',
        },
        listItem: {
            padding: '10px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease, border-radius 0.3s ease', // Thêm transition cho bo góc
            borderRadius: '5px',
        },
        listItemHover: {
            backgroundColor: '#1F2B6C',
            color: 'white',
            borderRadius: '10px',
        },
        icon: {
            marginRight: '10px',
        },
        button: {
            width: '150px',
            backgroundColor: '#3044a2',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#1F2B6C',
            transform: 'scale(1.05)',
        },
        content: {
            width: '80%',
            display: 'flex',
        },
        title: {
            color: '#5c6bc0',
            textTransform: 'uppercase',
            fontWeight: 'bold',
        },
        heading: {
            color: '#1e2a78',
            fontSize: '36px',
            fontWeight: 'bold',
            marginTop: '10px',
        },
        description: {
            margin: '20px',
        },
        subHeading: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        points: {
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
        },
        listPoints: {
            listStyleType: 'none',
            padding: 0,
            paddingLeft: '10px',
        },
        listPointItem: {
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
        },
        pointImage: {
            marginRight: '5px',
        },
        imagesContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
            flexDirection: 'column',
        },
        image: {
            width: '250px',
            borderRadius: '10px',
            margin: '10px',
        },
        paragraph: {
            marginBottom: '20px',
        },
        titleService: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        mainService: {
            display: 'flex',
            padding: '20px',
        },
    };

    const [buttonHover, setButtonHover] = useState(false);

    return (
        <div style={styles.container}>
            <div style={styles.titleService}>
                <h3 style={styles.title}>Sự chăm sóc mà bạn có thể tin tưởng</h3>
                <h2 style={styles.heading}>Dịch vụ của chúng tôi</h2>
            </div>
            <div style={styles.mainService}>
                <div style={styles.sidebar}>
                    <ul style={styles.list}>
                        {["Khám miễn phí", "Điện tâm đồ", "Xét nghiệm DNA", "Ngân hàng máu"].map((text, index) => (
                            <li
                                key={index}
                                style={styles.listItem}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = styles.listItemHover.backgroundColor;
                                    e.currentTarget.style.color = styles.listItemHover.color;
                                    e.currentTarget.style.borderRadius = styles.listItemHover.borderRadius;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '';
                                    e.currentTarget.style.borderRadius = '5px';
                                }}
                            >
                                <i style={styles.icon}>
                                    <img src={require(`../assets/img/medical${index + 1}.png`)} alt={text} />
                                </i>
                                {text}
                            </li>
                        ))}
                    </ul>
                    <button
                        style={{
                            ...styles.button,
                            ...(buttonHover ? styles.buttonHover : {}),
                        }}
                        onMouseEnter={() => setButtonHover(true)}
                        onMouseLeave={() => setButtonHover(false)}
                    >
                        Xem tất cả
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.description}>
                        <h4 style={styles.subHeading}>Niềm đam mê đặt bệnh nhân lên hàng đầu.</h4>
                        <div style={styles.points}>
                            <ul style={styles.listPoints}>
                                <li style={styles.listPointItem}>
                                    <img src={require('../assets/img/point.png')} alt="Point" style={styles.pointImage} />
                                    Niềm đam mê chữa bệnh
                                </li>
                                <li style={styles.listPointItem}>
                                    <img src={require('../assets/img/point.png')} alt="Point" style={styles.pointImage} />
                                    Tất cả những gì tốt nhất của chúng tôi
                                </li>
                                <li style={styles.listPointItem}>
                                    <img src={require('../assets/img/point.png')} alt="Point" style={styles.pointImage} />
                                    Chuyên môn tốt nhất
                                </li>
                            </ul>
                            <ul style={styles.listPoints}>
                                <li style={styles.listPointItem}>
                                    <img src={require('../assets/img/point.png')} alt="Point" style={styles.pointImage} />
                                    Chăm sóc 5 sao
                                </li>
                                <li style={styles.listPointItem}>
                                    <img src={require('../assets/img/point.png')} alt="Point" style={styles.pointImage} />
                                    Hãy tin vào chúng tôi
                                </li>
                                <li style={styles.listPointItem}>
                                    <img src={require('../assets/img/point.png')} alt="Point" style={styles.pointImage} />
                                    Luôn quan tâm
                                </li>
                            </ul>
                        </div>

                        <p style={styles.paragraph}>
                            Chúng tôi luôn đặt lợi ích của bệnh nhân lên hàng đầu, với mục tiêu mang lại dịch vụ chăm sóc sức khỏe chất lượng cao. Đội ngũ chuyên gia y tế giàu kinh nghiệm của chúng tôi không ngừng nỗ lực để đảm bảo rằng bạn nhận được sự quan tâm và điều trị tốt nhất. Hãy để chúng tôi đồng hành cùng bạn trên hành trình bảo vệ sức khỏe toàn diện, từ chẩn đoán chính xác đến các giải pháp điều trị hiệu quả.
                        </p>

                    </div>

                    <div style={styles.imagesContainer}>
                        <img
                            src={require('../assets/img/doctor_consulting.png')}
                            alt="Doctor consulting patient"
                            style={styles.image}
                        />
                        <img
                            src={require('../assets/img/team_of_doctors.png')}
                            alt="Team of doctors"
                            style={styles.image}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


//component spectialties

const specialties = [
    { name: 'Khoa Thần kinh' },
    { name: 'Khoa Mắt' },
    { name: 'Khoa Tiêu hóa' },
    { name: 'Khoa Ung bướu' },
    { name: 'Khoa Tim mạch' },
    { name: 'Khoa Tiết niệu' },
    { name: 'Khoa Cơ xương khớp' },
    { name: 'Khoa Hô hấp' },
    { name: 'Khoa Da liễu' },
    { name: 'Khoa Tai mũi họng' },
    { name: 'Khoa Thận' },
    { name: 'Khoa Phụ khoa' },

];

const SpecialtiesGrid = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{ color: '#00A1E4', letterSpacing: '1px' }}>LUÔN QUAN TÂM</h2>
            <h3 style={{ fontSize: '28px', marginBottom: '40px' }}>Đặc biệt ở chúng tôi</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {specialties.map((specialty, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '20px',
                            backgroundColor: '#f8f8f8',
                            color: '#001F57',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '120px',
                            border: '2px solid #00A1E4',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#1F2B6C';
                            e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f8f8f8';
                            e.currentTarget.style.color = '#001F57';
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                marginBottom: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#00A1E4',
                                fontSize: '32px',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            ❤️
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{specialty.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
//component book

const BookSchedule = () => {
    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '573px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    };

    const backgroundStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${require('../assets/img/banner3.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5,
        zIndex: 1,
    };

    const contentStyle = {
        position: 'relative',
        color: '#212124ff',
        maxWidth: '407px',
        zIndex: 2,
        marginLeft: '100px',
    };

    const headingStyle = {
        fontFamily: "'Yeseva One', serif",
        fontSize: '32px',
        lineHeight: '36.96px',
        color: '#159eecff',
        marginBottom: '16px',
    };

    const paragraphStyle = {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: '16px',
        lineHeight: '140%',
    };

    const formStyle = {
        width: '491px',
        backgroundColor: '#1f2b6c',
        borderRadius: '5px',
        padding: '20px',
        color: '#fcfefeff',
        fontFamily: "'Work Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 2,
    };

    const inputStyle = {
        backgroundColor: '#1f2b6c',
        color: '#fcfefeff',
        border: 'none',
        borderBottom: '1px solid #fcfefeff',
        padding: '12px',
        fontSize: '16px',
        marginBottom: '10px',
    };

    const textAreaStyle = {
        fontFamily: "'Work Sans', sans-serif",
        backgroundColor: '#1f2b6c',
        color: '#fcfefeff',
        border: 'none',
        borderBottom: '1px solid #fcfefeff',
        padding: '12px',
        fontSize: '16px',
        height: '100px',
        marginBottom: '10px',
    };

    const buttonStyle = {
        backgroundColor: '#bfd2f8ff',
        color: '#1f2b6c',
        border: 'none',
        padding: '15px',
        fontSize: '16px',
        fontWeight: 500,
        textAlign: 'center',
        cursor: 'pointer',
        textTransform: 'uppercase',
    };

    return (
        <div style={containerStyle}>
            <div style={backgroundStyle} />
            <div style={contentStyle}>
                <h1 style={headingStyle}>Đặt lịch khám</h1>
                <p style={paragraphStyle}>
                    Chúng tôi hiểu rằng sức khỏe của bạn là ưu tiên hàng đầu. Tại Meddical, chúng tôi cung cấp dịch vụ đặt lịch khám dễ dàng và thuận tiện để bạn có thể tiếp cận chăm sóc y tế chất lượng một cách nhanh chóng.
                    <br />Với đội ngũ bác sĩ chuyên môn cao và trang thiết bị hiện đại, chúng tôi cam kết mang đến cho bạn trải nghiệm khám bệnh thoải mái và hiệu quả nhất. Bạn có thể đặt lịch khám trực tuyến ngay tại website của chúng tôi hoặc qua ứng dụng di động.
                </p>
            </div>
            <form style={{ ...formStyle, marginRight: '100px', padding: '20px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Tên" style={inputStyle} />
                    <input type="text" placeholder="Giới tính" style={inputStyle} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Email" style={inputStyle} />
                    <input type="text" placeholder="Số điện thoại" style={inputStyle} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Ngày" style={inputStyle} />
                    <input type="text" placeholder="Giờ" style={inputStyle} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Bác sĩ" style={inputStyle} />
                    <input type="text" placeholder="Phòng" style={inputStyle} />
                </div>
                <textarea placeholder="Tin nhắn" style={textAreaStyle}></textarea>
                <button type="submit" style={buttonStyle}>Đặt lịch</button>
            </form>
        </div>
    );
};
//component news

const articles = [
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    }
];

const NewsSection = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const articlesPerPage = 4;
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const startIndex = currentPage * articlesPerPage;
    const displayedArticles = articles.slice(startIndex, startIndex + articlesPerPage);

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#f9f9f9', padding: '20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '18px',
                    letterSpacing: '2.88px',
                    color: '#159eec',
                    textTransform: 'uppercase'
                }}>
                    Thông tin tốt hơn, sức khỏe tốt hơn
                </h2>
                <h1 style={{
                    fontFamily: "'Yeseva One', serif",
                    fontSize: '32px',
                    color: '#1f2b6c'
                }}>
                    Tin tức
                </h1>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                {displayedArticles.map((article, index) => (
                    <div key={index} style={{
                        backgroundColor: 'white',
                        width: '320px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <img src={article.image} alt="news" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                        <div style={{ padding: '15px', textAlign: 'left' }}>
                            <span style={{
                                fontFamily: "'Work Sans', sans-serif",
                                fontSize: '14px',
                                color: '#159eec'
                            }}>
                                {article.date}
                            </span>
                            <h3 style={{
                                fontFamily: "'Work Sans', sans-serif",
                                fontSize: '18px',
                                color: '#212124',
                                margin: '10px 0'
                            }}>
                                {article.title}
                            </h3>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontFamily: "'Work Sans', sans-serif",
                                    fontSize: '14px',
                                    color: '#212124'
                                }}>
                                    <img src={require('../assets/img/view.png')} alt="views" style={{ marginRight: '5px' }} />
                                    {article.views}
                                </span>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontFamily: "'Work Sans', sans-serif",
                                    fontSize: '14px',
                                    color: '#212124'
                                }}>
                                    <img src={require('../assets/img/like.png')} alt="likes" style={{ marginRight: '5px' }} />
                                    {article.likes}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handlePageChange(index)}
                        style={{
                            height: '12px',
                            width: '12px',
                            margin: '0 4px',
                            backgroundColor: currentPage === index ? '#717171' : '#bbb',
                            borderRadius: '50%',
                            display: 'inline-block',
                            cursor: 'pointer'
                        }}
                    ></span>
                ))}
            </div>
        </div>
    );
};


//component contact
const contactDetails = [
    {
        title: "Khẩn cấp",
        info: ["(237) 681-812-255", "(237) 666-331-894"],
        icon: require('../assets/img/group-188-2.png'),
        bgColor: '#f1f4f8',
        textColor: '#1f2b6c'
    },
    {
        title: "Địa chỉ",
        info: ["0123 Hải Phòng", "9876 Lê Duẩn"],
        icon: require('../assets/img/letter.png'),
        bgColor: '#f1f4f8',
        textColor: '#1f2b6c'
    },
    {
        title: "Email",
        info: ["meddical@gmil.com"],
        icon: require('../assets/img/group-178-2.png'),
        bgColor: '#f1f4f8',
        textColor: '#1f2b6c'
    },
    {
        title: "Giờ làm việc",
        info: ["Từ thứ hai đến thứ bảy lúc 09:00-20:00", "Chỉ khẩn cấp vào Chủ nhật"],
        icon: require('../assets/img/group-177-2.png'),
        bgColor: '#f1f4f8',
        textColor: '#1f2b6c'
    }
];

const ContactsSection = () => {
    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '18px',
                    letterSpacing: '2.88px',
                    color: '#159eec',
                    textTransform: 'uppercase'
                }}>
                    Hãy liên lạc
                </h2>
                <h1 style={{
                    fontFamily: "'Yeseva One', serif",
                    fontSize: '32px',
                    color: '#1f2b6c'
                }}>
                    Liên hệ
                </h1>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                {contactDetails.map((contact, index) => (
                    <div key={index} style={{
                        backgroundColor: contact.bgColor,
                        width: '233px',
                        height: '233px',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        color: contact.textColor,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <img src={contact.icon} alt={contact.title} style={{ marginBottom: '15px' }} />
                        <h3 style={{
                            fontFamily: "'Work Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: '18px',
                            textTransform: 'uppercase'
                        }}>
                            {contact.title}
                        </h3>
                        {contact.info.map((line, i) => (
                            <p key={i} style={{
                                fontFamily: "'Work Sans', sans-serif",
                                fontSize: '16px',
                                lineHeight: '22.4px',
                                margin: '5px 0'
                            }}>
                                {line}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Home Component
const Home = () => {
    return (
        <div>
            <Topmost />
            <Navbar />
            <HeroSection />
            <AppointmentCards />
            <WelcomeBanner />
            <CenteredImage />
            <Services />
            <SpecialtiesGrid />
            <BookSchedule />
            <OurDoctors />
            <NewsSection />
            <ContactsSection />
            <Footer />
        </div>
    );
};

export default Home;
