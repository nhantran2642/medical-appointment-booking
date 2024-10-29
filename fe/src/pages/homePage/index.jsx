import React, { useState } from "react";
import "./style.scss";
import OurDoctors from "../../components/OurDoctors";

const cardData = [
    {
        text: "Đặt Lịch Hẹn",
        color: "#1f2b6c",
        textColor: "#fcfefeff",
        icon: require("../../assets/img/Calendar.png"),
    },
    {
        text: "Đội Ngũ Chúng Tôi",
        color: "#bfd2f8ff",
        textColor: "#1f2b6cff",
        icon: require("../../assets/img/Team.png"),
    },
    {
        text: "Quản Lý Thanh Toán",
        color: "#159eecff",
        textColor: "#fcfefeff",
        icon: require("../../assets/img/Cash.png"),
    },
];

const AppointmentCards = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    return (
        <div className="appointment-cards">
            {cardData.map((card, index) => (
                <div
                    key={index}
                    className={`card ${hoveredIndex === index ? "hovered" : ""}`}
                    style={{ backgroundColor: card.color, color: card.textColor }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <span className="card-text">{card.text}</span>
                    <img src={card.icon} alt="Icon" className="card-icon" />
                </div>
            ))}
        </div>
    );
};

const HeroSection = () => {
    const [hover, setHover] = useState(false);
    return (
        <section className="hero-section" id="home">
            <div className="content">
                <h1>Sự Lựa Chọn Hàng Đầu</h1>
                <p>Chúng Tôi Quan Tâm Đến Sức Khỏe Và Hạnh Phúc Của Bạn!</p>
                <button
                    className={`hero-button ${hover ? "hovered" : ""}`}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Dịch Vụ
                </button>
            </div>
        </section>
    );
};
const Banner = () => (
    <div className="banner">
        <img src={require("../../assets/img/banner-2.png")} alt="Banner" />
    </div>
);


const WelcomeBanner = () => (
    <div className="banner">
        <h2 className="banner__title">CHÀO MỪNG ĐẾN VỚI MEDDICAL</h2>
        <h1 className="banner__subtitle">Một Nơi Tuyệt Vời Để Nhận Được Sự Chăm Sóc</h1>
        <p className="banner__text">
            Tại Meddical, chúng tôi cam kết mang đến cho bạn sự chăm sóc toàn diện và tận tâm. Với đội ngũ y bác sĩ
            chuyên nghiệp và trang thiết bị hiện đại, Meddical là nơi bạn có thể hoàn toàn yên tâm về sức khỏe của
            mình. Chúng tôi luôn sẵn sàng hỗ trợ bạn trong hành trình bảo vệ và nâng cao sức khỏe mỗi ngày.
            <br />Hãy đến và trải nghiệm dịch vụ chăm sóc sức khỏe tốt nhất tại Meddical!
        </p>
        <a href="#" className="banner__link">
            Xem Thêm <span className="banner__arrow">→</span>
        </a>
    </div>
);

const Services = () => {
    return (
        <div className="services-container">
            <div className="title-service">
                <h3 className="title">Sự chăm sóc mà bạn có thể tin tưởng</h3>
                <h2 className="heading">Dịch vụ của chúng tôi</h2>
            </div>
            <div className="main-service">
                <div className="sidebar">
                    <ul className="list">
                        {["Khám miễn phí", "Điện tâm đồ", "Xét nghiệm DNA", "Ngân hàng máu"].map((text, index) => (
                            <li
                                key={index}
                                className="list-item"
                                onMouseEnter={(e) => {
                                    e.currentTarget.classList.add("hovered");
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.classList.remove("hovered");
                                }}
                            >
                                <i className="icon">
                                    <img src={require(`../../assets/img/medical${index + 1}.png`)} alt={text} />
                                </i>
                                {text}
                            </li>
                        ))}
                    </ul>
                    <button className="view-all-button">
                        Xem tất cả
                    </button>
                </div>

                <div className="content">
                    <div className="description">
                        <h4 className="sub-heading">Niềm đam mê đặt bệnh nhân lên hàng đầu.</h4>
                        <div className="points">
                            <ul className="list-points">
                                <li className="list-point-item">
                                    <img src={require('../../assets/img/point.png')} alt="Point" className="point-image" />
                                    Niềm đam mê chữa bệnh
                                </li>
                                <li className="list-point-item">
                                    <img src={require('../../assets/img/point.png')} alt="Point" className="point-image" />
                                    Tất cả những gì tốt nhất của chúng tôi
                                </li>
                                <li className="list-point-item">
                                    <img src={require('../../assets/img/point.png')} alt="Point" className="point-image" />
                                    Chuyên môn tốt nhất
                                </li>
                            </ul>
                            <ul className="list-points">
                                <li className="list-point-item">
                                    <img src={require('../../assets/img/point.png')} alt="Point" className="point-image" />
                                    Chăm sóc 5 sao
                                </li>
                                <li className="list-point-item">
                                    <img src={require('../../assets/img/point.png')} alt="Point" className="point-image" />
                                    Hãy tin vào chúng tôi
                                </li>
                                <li className="list-point-item">
                                    <img src={require('../../assets/img/point.png')} alt="Point" className="point-image" />
                                    Luôn quan tâm
                                </li>
                            </ul>
                        </div>

                        <p className="paragraph">
                            Chúng tôi luôn đặt lợi ích của bệnh nhân lên hàng đầu, với mục tiêu mang lại dịch vụ chăm sóc sức khỏe chất lượng cao. Đội ngũ chuyên gia y tế giàu kinh nghiệm của chúng tôi không ngừng nỗ lực để đảm bảo rằng bạn nhận được sự quan tâm và điều trị tốt nhất. Hãy để chúng tôi đồng hành cùng bạn trên hành trình bảo vệ sức khỏe toàn diện, từ chẩn đoán chính xác đến các giải pháp điều trị hiệu quả.
                        </p>
                    </div>

                    <div className="images-container">
                        <img
                            src={require('../../assets/img/doctor_consulting.png')}
                            alt="Doctor consulting patient"
                            className="image"
                        />
                        <img
                            src={require('../../assets/img/team_of_doctors.png')}
                            alt="Team of doctors"
                            className="image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const SpecialtiesGrid = () => {
    const specialties = [
        { name: 'Khoa Thần Kinh' },
        { name: 'Khoa Mắt' },
        { name: 'Khoa Tiêu Hóa' },
        { name: 'Khoa Ung Bướu' },
        { name: 'Khoa Tim Mạch' },
        { name: 'Khoa Tiết Niệu' },
        { name: 'Khoa Cơ Xương Khớp' },
        { name: 'Khoa Hô Hấp' },
        { name: 'Khoa Da Liễu' },
        { name: 'Khoa Tai Mũi Họng' },
        { name: 'Khoa Thận' },
        { name: 'Khoa Phụ Khoa' },
    ];

    return (
        <div className="specialties-grid">
            <h2>LUÔN QUAN TÂM</h2>
            <h3>Đặc biệt ở chúng tôi</h3>
            <div className="grid">
                {specialties.map((specialty, index) => (
                    <div className="specialty" key={index}>
                        <div className="icon">❤️</div>
                        <span className="name">{specialty.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
const articles = [
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../../assets/img/news.png'),
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
        <div className="news-section">
            <div className="header">
                <h2>Thông tin tốt hơn, sức khỏe tốt hơn</h2>
                <h1>Tin tức</h1>
            </div>
            <div className="articles-grid">
                {displayedArticles.map((article, index) => (
                    <div className="article" key={index}>
                        <img src={article.image} alt="news" />
                        <div className="article-content">
                            <span className="date">{article.date}</span>
                            <h3 className="title">{article.title}</h3>
                            <div className="stats">
                                <span className="views">
                                    <img src={require('../../assets/img/view.png')} alt="views" />
                                    {article.views}
                                </span>
                                <span className="likes">
                                    <img src={require('../../assets/img/like.png')} alt="likes" />
                                    {article.likes}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`page-dot ${currentPage === index ? 'active' : ''}`}
                    ></span>
                ))}
            </div>
        </div>
    );
};
const contactDetails = [
    {
        title: "Khẩn cấp",
        info: ["(237) 681-812-255", "(237) 666-331-894"],
        icon: require('../../assets/img/group-188-2.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    },
    {
        title: "Địa chỉ",
        info: ["0123 Hải Phòng", "9876 Lê Duẩn"],
        icon: require('../../assets/img/letter.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    },
    {
        title: "Email",
        info: ["meddical@gmail.com"],
        icon: require('../../assets/img/group-178-2.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    },
    {
        title: "Giờ làm việc",
        info: ["Từ thứ hai đến thứ bảy lúc 09:00-20:00", "Chỉ khẩn cấp vào Chủ nhật"],
        icon: require('../../assets/img/group-177-2.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    }
];

const ContactsSection = () => {
    return (
        <div className="contacts-section">
            <div className="header">
                <h2 className="sub-title">Hãy liên lạc</h2>
                <h1 className="main-title">Liên hệ</h1>
            </div>
            <div className="contact-cards">
                {contactDetails.map((contact, index) => (
                    <div
                        className="contact-card"
                        key={index}
                        style={{ backgroundColor: contact.bgColor, color: contact.textColor }}
                    >
                        <img
                            src={contact.icon}
                            alt={contact.title}
                            className="icon"
                            style={{ width: '40px', height: '40px' }}
                        />
                        <h3 className="card-title" style={{ fontSize: '24px' }}>{contact.title}</h3>
                        {contact.info.map((line, i) => (
                            <p className="info-line" key={i} style={{ fontSize: '18px' }}>{line}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};


const HomePage = () => (
    <>
        <HeroSection />
        <AppointmentCards />
        <WelcomeBanner />
        <Banner />
        <Services />
        <SpecialtiesGrid />
        <OurDoctors />
        <NewsSection />
        <ContactsSection />

    </>
);

export default HomePage;
