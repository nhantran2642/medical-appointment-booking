import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { services } from '../../mock';


const Services = () => {
    return (
        <div className="services">
            <div className="services-header" style={{ backgroundImage: `url(${require('../../assets/img/banner-service.png')})` }}>
                <div className="title-head"> <a href="/">Trang chủ</a> / <a href="/service">Dịch vụ</a></div>
                <h2>Dịch vụ của chúng tôi</h2>
            </div>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <div className="service-img">
                            <img src={require('../../assets/img/doctor_consulting.png')} alt="Service Icon" />
                            <div className="service-icon">
                                <span className="icon-overlay">
                                    <img src={require('../../assets/img/service.png')} alt="Service Icon" />
                                </span>
                            </div>
                        </div>
                        <div className="service-content">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <Link to={`/service/${service.id}`} className="learn-more">Xem thêm →</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
