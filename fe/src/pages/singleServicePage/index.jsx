import React, { useState } from 'react';
import './style.scss';
import OurDoctors from '../../components/OurDoctors';

const ServicesPage = () => {
    return (
        <div className="services-page">
            <div className="header-banner">
                <div className="title-head"> <a href="/">Trang chủ</a> / <a href="/service">Dịch vụ</a>/ <a href="/service">Xem thêm</a></div>
                <h2>Dịch vụ của chúng tôi</h2>
            </div>

            <div className="services-section">
                <div className="services-menu">
                    <div className="main-service">
                        <div className="sidebar-service">
                            <ul className="list">
                                {["Khám miễn phí", "Điện tâm đồ", "Xét nghiệm DNA", "Ngân hàng máu", "Da liễu"].map((text, index) => (
                                    <li
                                        key={text}
                                        className="list-item"
                                        onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
                                    >
                                        <i className="icon">
                                            <img src={require(`../../assets/img/medical${index + 1}.png`)} alt={text} />
                                        </i>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="services-content">
                        <img src={require('../../assets/img/service-1.png')} alt="Service Icon" />
                        <div className="points">
                            <h2>Niềm đam mê đặt bệnh nhân lên hàng đầu</h2>
                            <ul className="list-points">
                                {[
                                    "Niềm đam mê chữa bệnh",
                                    "Tất cả những gì tốt nhất của chúng tôi",
                                    "Chuyên môn tốt nhất",
                                ].map((point, index) => (
                                    <li key={index} className="list-point-item">
                                        <img src={require('../../assets/img/point.png')} alt="Point" className="point-image" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <ul className="list-points">
                                {[
                                    "Chăm sóc 5 sao",
                                    "Hãy tin vào chúng tôi",
                                    "Luôn quan tâm"
                                ].map((point, index) => (
                                    <li key={index} className="list-point-item">
                                        <img src={require('../../assets/img/point.png')} alt="Point" className="point-image" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="description">
                            Bệnh viện Meddical là một trong những cơ sở y tế hàng đầu với sứ mệnh chăm sóc sức khỏe toàn diện và chất lượng cao cho cộng đồng. Với đội ngũ bác sĩ, chuyên gia y tế dày dạn kinh nghiệm và trang thiết bị hiện đại, bệnh viện mang đến các dịch vụ y tế đa dạng từ chẩn đoán, điều trị đến phục hồi chức năng trong nhiều chuyên khoa khác nhau như tim mạch, thần kinh, nhi khoa, chỉnh hình và nhiều lĩnh vực khác. Bệnh viện Meddical luôn nỗ lực không ngừng để đem lại sự an tâm, hài lòng và sức khỏe tốt nhất cho từng bệnh nhân, trở thành đối tác đáng tin cậy trong hành trình chăm sóc sức khỏe.                        </p>
                    </div>
                </div>
            </div>

            <OurDoctors />
        </div>
    );
};



export default ServicesPage;
