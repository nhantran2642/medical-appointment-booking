import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { doctors, departments, hours } from '../../mock/index.js';
import AuthRepository from '../../api/index.js';

const AppointmentPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        doctor: '',
        message: '',
        gender: '',
        department: '',
        doctorPrice: 0 // Thêm trường giá bác sĩ
    });

    const [filteredDoctors, setFilteredDoctors] = useState([]);
    
    // Hàm xử lý thay đổi thông tin form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Hàm xử lý thay đổi khoa và lọc bác sĩ theo khoa
    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        setFormData({ ...formData, department: selectedDepartment });

        // Lọc bác sĩ theo khoa
        const filtered = doctors.filter((doctor) => doctor.department === selectedDepartment);
        setFilteredDoctors(filtered);
    };

    // Hàm xử lý khi người dùng chọn bác sĩ và giá khám
    const handleDoctorChange = (e) => {
        const selectedDoctor = e.target.value;
        const doctor = doctors.find((doctor) => doctor.name === selectedDoctor);
        setFormData({
            ...formData,
            doctor: doctor ? doctor.name : '',
            doctorPrice: doctor ? doctor.price : 0 // Cập nhật giá bác sĩ
        });
    };

    // Gọi API lấy thông tin người dùng và điền tự động vào form
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await AuthRepository.users(); 
                if (response.results && response.results.length > 0) {
                    const user = response.results[0]; 
                    setFormData({
                        ...formData,
                        name: `${user.first_name} ${user.last_name}`,
                        email: user.email,
                        phone: user.phone
                    });
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error.message);
            }
        };

        fetchUserData();
    }, []);

    // Hàm xử lý gửi thông tin đặt lịch
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Dữ liệu gửi:', formData);

        // Kiểm tra xem đã có đủ thông tin cần thiết chưa
        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.doctor) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        try {
            const response = await AuthRepository.appointment(formData);
            alert('Đặt lịch thành công!');
            console.log('Response:', response);
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đặt lịch:', error.message);
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
                                    {hours.map((hour, index) => (
                                        <option key={index} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
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
                                        <option key={doctor.id} value={doctor.name}>
                                            {doctor.name} - {doctor.specialty}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <hr style={{ width: '100%' }} />
                            <div className="doctor-price">
                                <span>Giá khám: </span>
                                {formData.doctorPrice ? `${formData.doctorPrice} VNĐ` : '0'}
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0980619197676!2d108.21058327459991!3d16.060400339675287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b5ed09e295%3A0xdb79efdf8394954d!2zMTI2IMSQLiBOZ3V54buFbiBWxINuIExpbmcsIFbEqW5oIFRydW5nLCBUaGFuaCBLaMOqLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1729735211461!5m2!1svi!2s"
                    width="100%"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps"
                ></iframe>
            </div>
        </div>
    );
};

export default AppointmentPage;
