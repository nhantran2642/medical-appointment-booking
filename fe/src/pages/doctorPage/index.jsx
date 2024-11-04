import React from 'react';
import './style.scss';

import subheadDoctor from '../../assets/img/SubHead-doctor.png';
import linkedinIcon from '../../assets/img/linkedin-1.png';
import instagramIcon from '../../assets/img/instagram-1.png';
import otherIcon from '../../assets/img/facebook-1.png';
import { doctors } from '../../mock';


const DoctorsGrid = () => {
    return (
        <div className="doctors-page">
            <header className="header-section">
                <div className="breadcrumb" style={{ backgroundImage: `url(${subheadDoctor})` }}>
                    <div className="title-doctor">
                        <div className="title-head"> <a href="/">Home</a> / <a href="/doctors">Doctors</a></div>
                        <h2>Our Doctors</h2>
                    </div>
                </div>
            </header>

            <section className="doctors-grid">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="doctor-card">
                        <img src={doctor.image} alt={`${doctor.name}'s photo`} className="doctor-photo" />
                        <h2 className="doctor-name">{doctor.name}</h2>
                        <p className="doctor-specialty">{doctor.specialty}</p>
                        <div className="social-icons">
                            <a href={doctor.linkedin}><img src={linkedinIcon} alt="LinkedIn" /></a>
                            <a href={doctor.instagram}><img src={instagramIcon} alt="Instagram" /></a>
                            <a href={doctor.other}><img src={otherIcon} alt="Other" /></a>
                        </div>
                        <button className="profile-button">View Profile</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default DoctorsGrid;
