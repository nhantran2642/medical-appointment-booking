import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { doctors } from '../../mock/index.js';



const AppointmentPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        doctor: '',
        message: '',
        phone: '',
        gender: '',
        department: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="appointment-page">
            <div
                className="appointment-header"
                style={{ backgroundImage: `url(${require('../../assets/img/SubHead-news.png')})` }}
            >
                <div className="title-head">
                    <div className="title-link">
                        <Link to="/">Home</Link> / <Link to="/appointment">Book an Appointment</Link>
                    </div>
                    <h2>Book an Appointment</h2>
                </div>
            </div>

            <div className="appointment-page-container">
                <div className="appointment-page-left">
                    <h3>Book an Appointment</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare...</p>
                    <div className="appointment-page-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                                <hr />
                                <select name="gender" onChange={handleChange}>
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <hr style={{ width: '100%' }} />
                            <div className="form-group">
                                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                                <hr />
                                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                            </div>
                            <hr style={{ width: '100%' }} />

                            <div className="form-group">
                                <input type="date" name="date" onChange={handleChange} />
                                <hr />
                                <input type="time" name="time" onChange={handleChange} />
                            </div>
                            <hr style={{ width: '100%' }} />

                            <div className="form-group">
                                <select name="doctor" onChange={handleChange}>
                                    <option value="">Doctor</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.name}>
                                            {doctor.name} - {doctor.specialty}
                                        </option>
                                    ))}
                                </select>
                                <hr />
                                <select name="department" onChange={handleChange}>
                                    <option value="">Department</option>
                                    {/* Add options for departments */}
                                </select>
                            </div>
                            <hr style={{ width: '100%' }} />

                            <textarea name="message" placeholder="Message" onChange={handleChange}></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>

                <div className="appointment-page-info">
                    <div className="appointment-page-hours">
                        <h3>Schedule Hours</h3>
                        <ul>
                            <li><span>Monday</span><hr /><span>08:00 AM - 07:00 PM</span></li>
                            <li><span>Tuesday</span><hr /><span>08:00 AM - 07:00 PM</span></li>
                            <li><span>Wednesday</span><hr /><span>08:00 AM - 07:00 PM</span></li>
                            <li><span>Thursday</span><hr /><span>08:00 AM - 07:00 PM</span></li>
                            <li><span>Friday</span><hr /><span>08:00 AM - 07:00 PM</span></li>
                            <li><span>Saturday</span><hr /><span>08:00 AM - 07:00 PM</span></li>
                            <li><span>Sunday</span><hr style={{ marginRight: '140px' }} /><span>Closed</span></li>
                        </ul>
                        <div className='line'></div>

                        <div className="emergency">
                            <p>Emergency</p>
                            <p>(237) 681-812-255</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0980619197676!2d108.21058327459991!3d16.060400339675287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b5ed09e295%3A0xdb79efdf8394954d!2zMTI2IMSQLiBOZ3V54buFbiBWxINuIExpbmgsIFbEqW5oIFRydW5nLCBUaGFuaCBLaMOqLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1729735211461!5m2!1svi!2s"
                    width="100%" height="450" allowFullScreen="" loading="lazy" title="Google Maps"></iframe>
            </div>
        </div>
    );
};

export default AppointmentPage;
