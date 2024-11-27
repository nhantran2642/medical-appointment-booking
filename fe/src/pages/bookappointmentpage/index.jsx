import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import DoctorRepository from '../../api/apiDoctor.js';
import AppointmentRepository from '../../api/apiAppointment.js';

const AppointmentPage = () => {
    const [formData, setFormData] = useState({
        name: localStorage.getItem('user_name') || '',
        email: localStorage.getItem('user_email') || '',
        phone: localStorage.getItem('user_phone') || '',
        date: '',
        time: '',
        doctor: '', 
        message: '',
        gender: '',
        department: '',
        doctorPrice: 0
    });

    const [departments, setDepartments] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await DoctorRepository.getAllDoctors();
                const uniqueDepartments = Array.from(new Set(response.results.map(doctor => doctor.department.name)));
                setDepartments(uniqueDepartments);
                console.log('Danh sách khoa:', uniqueDepartments);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bác sĩ:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        setFormData({ ...formData, department: selectedDepartment, doctor: '', doctorPrice: 0 });

        DoctorRepository.getAllDoctors().then((response) => {
            const filtered = response.results.filter(doctor => doctor.department.name === selectedDepartment);
            setFilteredDoctors(filtered);
        }).catch(error => console.error('Lỗi khi lọc bác sĩ:', error));
    };

    const handleDoctorChange = (e) => {
        const selectedDoctorId = parseInt(e.target.value, 10);
        const doctor = filteredDoctors.find(doc => doc.id === selectedDoctorId);

        setFormData({
            ...formData,
            doctor: selectedDoctorId, 
            doctorPrice: doctor ? parseFloat(doctor.price) : 0
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Dữ liệu gửi:', formData);

        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.doctor) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const appointmentDate = `${formData.date}T${formData.time}:00+07:00`;

        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            appointment_date: appointmentDate,
            doctor_id: formData.doctor, 
            message: formData.message,
            gender: formData.gender,
        };

        try {
            const response = await AppointmentRepository.createAppointment(payload);
            if (response.payment_url) {
                window.location.href = response.payment_url; 
            } else {
                alert('Đặt lịch thành công!');
                console.log('Response:', response);
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đặt lịch:', error.response?.data || error);
            alert('Đặt lịch thất bại, vui lòng thử lại.');
        }
    };

    return (
        <div className="appointment-page">
            <div
                className="appointment-header"
                style={{ backgroundImage: `url(${require('../../assets/img/SubHead-news.png')})` }}
            >
                <div className="title-head">
                    <div className="title-link">
                        <Link to="/">Trang chủ</Link> / <Link to="/appointment">Đặt lịch</Link>
                    </div>
                    <h2>Đặt lịch</h2>
                </div>
            </div>

            <div className="appointment-page-container">
                <div className="appointment-page-left">
                    <h3>Đặt lịch</h3>
                    <p>Hãy chọn các thông tin cần thiết</p>
                    <div className="appointment-page-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Họ và tên"
                                    onChange={handleChange}
                                />
                                <hr />
                                <select name="gender" onChange={handleChange}>
                                    <option value="">Giới tính</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                            <hr style={{ width: '100%' }} />
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                                <hr />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    placeholder="Số điện thoại"
                                    onChange={handleChange}
                                />
                            </div>
                            <hr style={{ width: '100%' }} />
                            <div className="form-group">
                                <input type="date" name="date" onChange={handleChange} />
                                <hr />
                                <select name="time" onChange={handleChange}>
                                    <option value="">Khung giờ</option>
                                    <option value="08:00">08:00</option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="10:00">11:00</option>
                                    <option value="10:00">13:00</option>
                                    <option value="10:00">14:00</option>
                                    <option value="10:00">15:00</option>
                                    <option value="10:00">16:00</option>
                                    <option value="10:00">17:00</option>
                                    <option value="10:00">18:00</option>
                                </select>
                            </div>
                            <hr style={{ width: '100%' }} />
                            <div className="form-group">
                                <select name="department" onChange={handleDepartmentChange}>
                                    <option value="">Khoa</option>
                                    {departments.map((dept, index) => (
                                        <option key={index} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                                <hr />
                                <select name="doctor" onChange={handleDoctorChange}>
                                    <option value="">Bác sĩ</option>
                                    {filteredDoctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.user.first_name} {doctor.user.last_name} - {doctor.specialty.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <hr style={{ width: '100%' }} />
                            <div className="doctor-price">
                                <span>Giá khám: </span>
                                {formData.doctorPrice ? `${formData.doctorPrice.toLocaleString()} VNĐ` : '0'}
                            </div>
                            <hr style={{ width: '100%' }} />
                            <textarea
                                name="message"
                                placeholder="Lời nhắn"
                                onChange={handleChange}
                            ></textarea>
                            <button type="submit">Đặt lịch</button>
                        </form>
                    </div>
                </div>

                <div className="appointment-page-info">
                    <div className="appointment-page-hours">
                        <h3>Giờ làm việc</h3>
                        <ul>
                            <li>
                                <span>Thứ Hai</span>
                                <hr />
                                <span>08:00 SA - 07:00 CH</span>
                            </li>
                            <li>
                                <span>Thứ Ba</span>
                                <hr />
                                <span>08:00 SA - 07:00 CH</span>
                            </li>
                            <li>
                                <span>Thứ Tư</span>
                                <hr />
                                <span>08:00 SA - 07:00 CH</span>
                            </li>
                            <li>
                                <span>Thứ Năm</span>
                                <hr />
                                <span>08:00 SA - 07:00 CH</span>
                            </li>
                            <li>
                                <span>Thứ Sáu</span>
                                <hr />
                                <span>08:00 SA - 07:00 CH</span>
                            </li>
                            <li>
                                <span>Thứ Bảy</span>
                                <hr />
                                <span>08:00 SA - 07:00 CH</span>
                            </li>
                            <li>
                                <span>Chủ Nhật</span>
                                <hr style={{ marginRight: '140px' }} />
                                <span>Đóng cửa</span>
                            </li>
                        </ul>
                        <div className="line"></div>
                        <div className="emergency">
                            <p>CẤP CỨU</p>
                            <p>(237) 681-812-255</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="map">
                <iframe
                    title="Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.438577788259!2d108.22015231545916!3d16.05987444382998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142194052d812d5%3A0x20048a6db5e7fe9!2sVivo%20Coffee%20%26%20Tea!5e0!3m2!1svi!2s!4v1687375122999!5m2!1svi!2s"
                    style={{ border: '0', width: '100%', height: '450px' }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default AppointmentPage;