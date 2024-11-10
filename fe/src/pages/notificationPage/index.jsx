import React from 'react';
import './style.scss';
import NavigationSidebar from '../../components/NavigationSidebar';
import { notifications } from '../../mock';

const NotificationList = () => {
    return (
        <div className="container">
            <div className="navigation-sidebar">
                <NavigationSidebar />
            </div>
            <div className="notification-list">
                <div className="header">
                    <h2>Danh sách thông báo</h2>
                    <button className="settings">⚙️ Tùy chọn</button>
                </div>
                <div className="notifications">
                    {notifications.map((notification, index) => (
                        <div key={index} className="notification">
                            <div className="notification-icon">✉️</div>
                            <div className="notification-content">
                                <h3>{notification.title}</h3>
                                <p>{notification.description}</p>
                                <span className="time">{notification.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationList;
