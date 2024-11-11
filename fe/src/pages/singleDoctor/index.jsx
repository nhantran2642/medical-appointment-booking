import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.scss';
import { doctors } from '../../mock';
import linkedinIcon from '../../assets/img/linkedin-1.png';
import instagramIcon from '../../assets/img/instagram-1.png';
import otherIcon from '../../assets/img/facebook-1.png';

const SingleDoctor = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();

    const doctor = doctors.find((doc) => doc.id === parseInt(doctorId));

    if (!doctor) {
        return <div>Bác sĩ không tồn tại.</div>;
    }

    const handleBookAppointment = () => {
        navigate(`/bookappointment?doctorId=${doctorId}`);
    };

    return (
        <div className="single-doctor-page">
            <div className="doctor-profile">
                <img src={doctor.image} alt={doctor.name} className="doctor-photo" />
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="doctor-specialty">{doctor.specialty}</p>
                <div className="doctor-bio">{doctor.bio}</div>
                <div className="social-icons">
                    <a href={doctor.linkedin}><img src={linkedinIcon} alt="LinkedIn" /></a>
                    <a href={doctor.instagram}><img src={instagramIcon} alt="Instagram" /></a>
                    <a href={doctor.other}><img src={otherIcon} alt="Other" /></a>
                </div>
                <button className="appointment-button" onClick={handleBookAppointment}>Đặt lịch</button>
            </div>
        </div>
    );
};

export default SingleDoctor;
