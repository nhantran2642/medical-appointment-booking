import React from 'react';
import './style.scss';
import { Carousel } from 'antd';
import 'antd/dist/reset.css';
import { ClockCircleOutlined, HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: '#364d79',
};

const AboutPage = () => {

    return (
        <div className="contact-section">
            <div className="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0980619197676!2d108.21058327459991!3d16.060400339675287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b5ed09e295%3A0xdb79efdf8394954d!2zMTI2IMSQLiBOZ3V54buFbiBWxINuIExpbmgsIFbEqW5oIFRydW5nLCBUaGFuaCBLaMOqLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1729735211461!5m2!1svi!2s"
                    width="900"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps"
                ></iframe>
            </div>
            <div className="contact-info">
                <div className="contact-form">
                    <h3>Contact</h3>
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Subject" />
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Message"></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className="contact-details">
                    <div className="detail">
                        <PhoneOutlined />
                        <h4>Emergency</h4>
                        <p>0123 456 789</p>
                    </div>
                    <div className="detail">
                        <MailOutlined />
                        <h4>Email</h4>
                        <p>info@example.com</p>
                    </div>
                    <div className="detail">
                        <HomeOutlined />
                        <h4>Location</h4>
                        <p>1234 Street Name, City, Country</p>
                    </div>
                    <div className="detail">
                        <ClockCircleOutlined />
                        <h4>Working Hours</h4>
                        <p>Mon-Sat: 9AM - 6PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutPage;
