import React, { useEffect, useState } from 'react';
import './style.scss';
import NavigationSidebar from '../../components/NavigationSidebar';
import AppointmentRepository from '../../api/apiAppointment';

const Schedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await AppointmentRepository.getAppointments();
                console.log(response); 

                if (response && response.results) {
                    const formattedSchedules = response.results.map((schedule) => {
                        const date = new Date(schedule.appointment_date);
                        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                        const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                        
                        return {
                            ...schedule,
                            formattedDate,
                            formattedTime,
                        };
                    });
                    setSchedules(formattedSchedules); 
                } else {
                    setSchedules([]);
                }
            } catch (err) {
                setError('Không thể tải danh sách lịch hẹn. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="container">
            <div className="navigation-sidebar">
                <NavigationSidebar />
            </div>
            <div className="schedule">
                <h2>Danh Sách Lịch Khám Bệnh</h2>

                {loading && <p>Đang tải...</p>}
                {error && <p className="error">{error}</p>}

                {!loading && !error && schedules.length === 0 && (
                    <p>Không có lịch hẹn nào được tìm thấy.</p>
                )}

                {!loading && !error && schedules.length > 0 && (
                    <div className="table">
                        <div className="table-header">
                            <div className="header-item">Ngày hẹn</div>
                            <div className="header-item">Thời gian</div>
                            
                            <div className="header-item">Trạng thái</div>
                        </div>
                        {schedules.map((schedule) => (
                            <div key={schedule.id} className="table-row">
                                <div className="table-item">{schedule.formattedDate}</div>
                                <div className="table-item">{schedule.formattedTime}</div>
                                <div className={`table-item status ${schedule.status === 'Scheduled' ? 'scheduled' : 'not-yet-paid'}`}>
                                    {schedule.status}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schedule;
