import React from 'react';
import './style.scss';
import { schedules } from '../../mock';
import avatarUser from '../../assets/img/avatar-user.png';
import NavigationSidebar from '../../components/NavigationSidebar';



const Schedule = () => {
    return (
        <div className="container">
            <div className="navigation-sidebar">
                <NavigationSidebar />
            </div>
            <div className="schedule">
                <h2>Danh Sách Lịch Khám Bệnh</h2>
                <div className="table">
                    <div className="table-header">
                        <div className="header-item">Tên</div>
                        <div className="header-item">Email</div>
                        <div className="header-item">Ngày hẹn</div>
                        <div className="header-item">Thời gian</div>
                        <div className="header-item">Bác sĩ</div>
                        <div className="header-item">Khoa</div>
                        <div className="header-item">Trạng thái</div>
                    </div>
                    {schedules.map((schedule) => (
                        <div key={schedule.id} className="table-row">
                            <div className="table-item name">
                                <div className="profile-avatar">
                                    <img src={avatarUser} alt="User Avatar" />
                                </div>
                                {schedule.name}
                            </div>
                            <div className="table-item">{schedule.email}</div>
                            <div className="table-item">{schedule.date}</div>
                            <div className="table-item">{schedule.time}</div>
                            <div className="table-item">{schedule.doctor}</div>
                            <div className="table-item">{schedule.department}</div>
                            <div className={`table-item status ${schedule.status === 'Đã khám' ? 'completed' : 'upcoming'}`}>
                                {schedule.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Schedule;
