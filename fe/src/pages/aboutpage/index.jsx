import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { contactDetails } from '../../mock';

const AboutPage = () => {
    return (
        <div className="contact-section">
            <div className="contact-header" style={{ backgroundImage: `url(${require('../../assets/img/SubHead-contact.png')})` }}>
                <div className="title-head">
                    <Link to="/">Home</Link> / <Link to="/contact">Contact</Link>
                </div>
                <h2>Our Contacts</h2>
            </div>

            <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0980619197676!2d108.21058327459991!3d16.060400339675287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b5ed09e295%3A0xdb79efdf8394954d!2zMTI2IMSQLiBOZ3V54buFbiBWxINuIExpbmgsIFbEqW5oIFRydW5nLCBUaGFuaCBLaMOqLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1729735211461!5m2!1svi!2s"
                    width="100%" height="450" allowFullScreen="" loading="lazy" title="Google Maps"></iframe>
            </div>

            <div className="contact-info">
                <div className="contact-form">
                    <h2>GET IN TOUCH</h2>
                    <h3>Contact</h3>
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Name" required />
                            <hr style={{ height: '61.6px' }} />
                            <input type="email" placeholder="Email" required />
                        </div>
                        <hr style={{ width: '100%' }} />
                        <div className="form-group">
                            <input type="text" placeholder="Subject" required />
                        </div>
                        <hr style={{ width: '100%' }} />
                        <div className="form-group">
                            <textarea placeholder="Message" required></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className="contact-details">
                    {contactDetails.map((contact, index) => (
                        <div className="detail" key={index}>
                            <img src={contact.icon} alt={contact.title} className="icon" style={{ width: '40px', height: '40px' }} />
                            <h4>{contact.title}</h4>
                            {contact.info.map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
