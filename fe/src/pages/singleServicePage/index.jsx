import React, { useState } from 'react';
import './style.scss';
import OurDoctors from '../../components/OurDoctors';

const ServicesPage = () => {
    return (
        <div className="services-page">
            <div className="header-banner">
                <div className="title-head"> <a href="/">Home</a> / <a href="/service">Service</a>/ <a href="/service">Read more</a></div>
                <h2>Our Services</h2>
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
                        <img src={require('../../assets/img/doctor_consulting.png')} alt="Service Icon" />
                        <div className="points">
                            <h2>A passion for putting patients first</h2>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
                        </p>
                    </div>
                </div>
            </div>

            <OurDoctors />
        </div>
    );
};



export default ServicesPage;
