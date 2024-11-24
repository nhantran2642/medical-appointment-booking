import React, { useState } from 'react';
import './styles.scss';

const appointments = [
    {
        id: 1,
        type: 'Molars Surgery',
        time: '3:00 PM - 4:00 PM',
        patient: 'Jonas Muller',
        details: {
            title: 'Molars Surgery',
            note: 'I have pain in my molars that needs surgery.',
            date: 'Mon, 11 Dec 2023',
            time: '3:00 PM',
            patientName: 'Jonas Muller',
            visits: 3,
        },
    },
    {
        id: 2,
        type: 'Teeth Cleaning',
        time: '10:00 AM - 11:00 AM',
        patient: 'Koman Manurung',
        details: {
            title: 'Teeth Cleaning',
            note: 'I have a complaint about tartar on my lower molars. I want it to be cleaned thoroughly.',
            date: 'Tue, 12 Dec 2023',
            time: '10:00 AM',
            patientName: 'Koman Manurung',
            visits: 8,
        },
    },
    {
        id: 3,
        type: 'Cavity Filling',
        time: '4:30 PM - 6:00 PM',
        patient: 'Alice Johnson',
        details: {
            title: 'Cavity Filling',
            note: 'I have a cavity that needs filling.',
            date: 'Wed, 13 Dec 2023',
            time: '4:30 PM',
            patientName: 'Alice Johnson',
            visits: 5,
        },
    },
    {
        id: 4,
        type: 'Root Canal Treatment',
        time: '1:00 PM - 2:30 PM',
        patient: 'Mark Lee',
        details: {
            title: 'Root Canal Treatment',
            note: 'I need a root canal treatment for my infected tooth.',
            date: 'Thu, 14 Dec 2023',
            time: '1:00 PM',
            patientName: 'Mark Lee',
            visits: 2,
        },
    },
    {
        id: 5,
        type: 'Orthodontic Consultation',
        time: '9:00 AM - 10:00 AM',
        patient: 'Sarah Connor',
        details: {
            title: 'Orthodontic Consultation',
            note: 'I would like a consultation for braces.',
            date: 'Fri, 15 Dec 2023',
            time: '9:00 AM',
            patientName: 'Sarah Connor',
            visits: 1,
        },
    },
    {
        id: 6,
        type: 'Wisdom Teeth Extraction',
        time: '11:00 AM - 12:00 PM',
        patient: 'Tom Hardy',
        details: {
            title: 'Wisdom Teeth Extraction',
            note: 'I need my wisdom teeth extracted.',
            date: 'Sat, 16 Dec 2023',
            time: '11:00 AM',
            patientName: 'Tom Hardy',
            visits: 4,
        },
    },

];

const getDayIndex = (date) => {
    const day = new Date(date).getDay();
    if (day === 0) return null;
    return day - 1;
};

const DashboardLayout = () => {
    const [hoveredAppointment, setHoveredAppointment] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (event, appointmentDetails) => {
        if (!selectedAppointment) {
            const { clientX, clientY } = event;
            setPopupPosition({ top: clientY + 10, left: clientX + 10 });
            setHoveredAppointment(appointmentDetails);
        }
    };

    const handleMouseLeave = () => {
        if (!selectedAppointment) {
            setHoveredAppointment(null);
        }
    };

    const handleClick = (event, appointmentDetails) => {
        const { clientX, clientY } = event;
        setPopupPosition({ top: clientY + 10, left: clientX + 10 });
        setSelectedAppointment(appointmentDetails);
        setHoveredAppointment(null);
    };

    const closePopup = () => {
        setSelectedAppointment(null);
    };

    const scheduleGrid = Array.from({ length: 6 }, () => Array(12).fill(null));
    const hours = [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
    ];

    appointments.forEach((appointment) => {
        const dayIndex = getDayIndex(appointment.details.date);
        if (dayIndex !== null) {
            const appointmentStartTime = parseInt(appointment.details.time.split(':')[0], 10);
            const hourIndex = hours.findIndex(hour => hour.includes(appointmentStartTime));
            if (hourIndex !== -1) {
                scheduleGrid[dayIndex][hourIndex] = appointment;
            }
        }
    });

    return (
        <div className="dashboard">
            <aside className="dashboard__sidebar">
                <section className="dashboard__weekly-activity">
                    <h3>HOẠT ĐỘNG TRONG TUẦN</h3>
                    <div className="weekly-stats">
                        <div className="stat-item">
                            <p>LƯỢT XEM /TUẦN</p>
                            <p className="stat-number">120</p>
                        </div>
                        <div className="stat-item">
                            <p>LƯỢT XEM /NGÀY</p>
                            <p className="stat-number">20</p>
                        </div>
                    </div>
                </section>
                <section className="dashboard__appointment-summary">
                    <h3>LỊCH KHÁM</h3>
                    <div className="appointment-stats">
                        <div className="stat-item">
                            <p>BỆNH NHÂN MỚI</p>
                            <p className="stat-number">50</p>
                        </div>
                        <div className="stat-item">
                            <p>BỆNH NHÂN TÁI KHÁM</p>
                            <p className="stat-number">5</p>
                        </div>
                    </div>
                    <h4>BỆNH NHÂN HÔM NAY</h4>
                    <div className="patient-list">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="patient-item">
                                <div className="patient-icon">👤</div>
                                <div className="patient-info">
                                    <p className="patient-name">Huy Đỗ</p>
                                    <p className="appointment-type">KHÁM RĂNG</p>
                                </div>
                                <div className="appointment-time">10:00 SA</div>
                            </div>
                        ))}
                    </div>
                </section>
            </aside>

            <main className="dashboard__main-content">
                <section className="calendar">
                    <header className="calendar-header">
                        <h3>LỊCH KHÁM BỆNH TUẦN</h3>
                        <div className="calendar-navigation">
                            <button>◀</button>
                            <span>November</span>
                            <button>▶</button>
                        </div>
                    </header>
                    <div className="calendar-body">
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th>Thứ 2</th>
                                    <th>Thứ 3</th>
                                    <th>Thứ 4</th>
                                    <th>Thứ 5</th>
                                    <th>Thứ 6</th>
                                    <th>Thứ 7</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map((hour, hourIndex) => (
                                    <tr key={hourIndex}>
                                        {scheduleGrid.map((day, dayIndex) => {
                                            const appointment = day[hourIndex];
                                            return (
                                                appointment ? (
                                                    <td
                                                        key={dayIndex}
                                                        className={`appointment ${appointment.type.toLowerCase().replace(' ', '-')}`}
                                                        onMouseEnter={(e) => handleMouseEnter(e, appointment.details)}
                                                        onMouseLeave={handleMouseLeave}
                                                    >
                                                        <div className="appointment-content">
                                                            <p>{appointment.details.date}</p>
                                                            <p>{appointment.details.time}</p>
                                                            <span>{appointment.patient}</span>
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <td key={dayIndex}></td>
                                                )
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* {hoveredAppointment && (
                            <div
                                className="popup"
                                style={{
                                    top: `${popupPosition.top}px`,
                                    left: `${popupPosition.left}px`
                                }}
                            >
                                <h4>{hoveredAppointment.title}</h4>
                                <p className="patient-note"><strong>Patient's Note:</strong> {hoveredAppointment.note}</p>
                                <div className="attendance-time">
                                    <span>🗓️ {hoveredAppointment.date}</span>
                                    <span>⏰ {hoveredAppointment.time}</span>
                                </div>
                                <div className="patient-name">
                                    <img src="https://via.placeholder.com/24" alt="Patient" />
                                    <span>{hoveredAppointment.patientName}</span>
                                    <span>Visited {hoveredAppointment.visits} Times</span>
                                </div>
                                <div className="button-group">
                                    <button className="button accept">Accept</button>
                                    <button className="button reschedule">Reschedule</button>
                                </div>
                            </div>
                        )} */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DashboardLayout;