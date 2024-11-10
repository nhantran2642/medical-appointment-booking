import React, { useState } from 'react';
import './style.scss';
import NavigationSidebar from '../../components/NavigationSidebar';
import avatarUser from '../../assets/img/avatar-user.png';

const ProfileInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Sally Trần',
        phone: '0931915108',
        email: 'hgiang140302@gmail.com',
        birthDate: '31/05/2011',
        gender: 'Nữ',
        address: '--',
        insuranceCode: '--',
        idCard: '--',
        ethnicity: 'Kinh',
        occupation: '--',
        email: '--',
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="container">
            <div className="navigation-sidebar">
                <NavigationSidebar />
            </div>
            <div className="profile-info">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <img src={avatarUser} alt="User Avatar" />
                    </div>
                    <div className="profile-details">
                        <h2 className="profile-name">{formData.name}</h2>
                        <p className="profile-id">Mã BN: YMP241922906</p>
                    </div>
                </div>

                <div className="profile-warning">
                    <span>⚠</span> Hoàn thiện thông tin để đặt khám và quản lý hồ sơ y tế được tốt hơn.
                </div>

                <div className="profile-section">
                    <h3>Thông tin cơ bản</h3>
                    {isEditing ? (
                        <>
                            <div className="profile-row">
                                <span>Họ và tên</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-row">
                                <span>Điện thoại</span>
                                <span>{formData.phone}</span>
                            </div>
                            <div className="profile-row">
                                <span>Email</span>
                                <span>{formData.email}</span>
                            </div>
                            <div className="profile-row">
                                <span>Ngày sinh</span>
                                <input
                                    type="text"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-row">
                                <span>Giới tính</span>
                                <input
                                    type="text"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-row">
                                <span>Địa chỉ</span>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="profile-row">
                                <span>Họ và tên</span>
                                <span>{formData.name}</span>
                            </div>
                            <div className="profile-row">
                                <span>Điện thoại</span>
                                <span>{formData.phone}</span>
                            </div>
                            <div className="profile-row">
                                <span>Ngày sinh</span>
                                <span>{formData.birthDate}</span>
                            </div>
                            <div className="profile-row">
                                <span>Giới tính</span>
                                <span>{formData.gender}</span>
                            </div>
                            <div className="profile-row">
                                <span>Địa chỉ</span>
                                <span>{formData.address}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="profile-section">
                    <h3>Thông tin bổ sung</h3>
                    {isEditing ? (
                        <>
                            <div className="profile-row">
                                <span>Mã BHYT</span>
                                <input
                                    type="text"
                                    name="insuranceCode"
                                    value={formData.insuranceCode}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-row">
                                <span>Số CMND/CCCD</span>
                                <input
                                    type="text"
                                    name="idCard"
                                    value={formData.idCard}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-row">
                                <span>Dân tộc</span>
                                <input
                                    type="text"
                                    name="ethnicity"
                                    value={formData.ethnicity}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-row">
                                <span>Nghề nghiệp</span>
                                <input
                                    type="text"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-row">
                                <span>Email</span>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="profile-row">
                                <span>Mã BHYT</span>
                                <span>{formData.insuranceCode}</span>
                            </div>
                            <div className="profile-row">
                                <span>Số CMND/CCCD</span>
                                <span>{formData.idCard}</span>
                            </div>
                            <div className="profile-row">
                                <span>Dân tộc</span>
                                <span>{formData.ethnicity}</span>
                            </div>
                            <div className="profile-row">
                                <span>Nghề nghiệp</span>
                                <span>{formData.occupation}</span>
                            </div>
                            <div className="profile-row">
                                <span>Email</span>
                                <span>{formData.email}</span>
                            </div>
                        </>
                    )}
                </div>

                <button className="edit-button" onClick={handleEditClick}>
                    {isEditing ? 'Lưu' : 'Thay đổi thông tin'}
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;
