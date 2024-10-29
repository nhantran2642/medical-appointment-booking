import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

const services = [
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
];

const Services = () => {
    return (
        <div className="services">
            <div className="services-header" style={{ backgroundImage: `url(${require('../../assets/img/banner-service.png')})` }}>
                <span>Home / Services</span>
                <h2>Our Services</h2>
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
                            <Link to={`/service/${service.id}`} className="learn-more">Learn More →</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
