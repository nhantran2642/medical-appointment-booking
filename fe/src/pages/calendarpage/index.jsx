import React, { useState, useEffect } from 'react';
import AppointmentRepository from '../../api/apiAppointment';
import './styles.scss';

const hours = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
];

// Hàm này sẽ trả về chỉ số của ngày trong tuần (1-6 cho thứ 2 đến thứ 7, 0 cho chủ nhật)
const getDayIndex = (date) => {
    const day = new Date(date).getDay();
    if (day === 0) return null; // Chủ nhật không bao gồm
    return day - 1; // Chuyển Chủ nhật (0) thành null và các ngày khác từ 1 đến 6
};

const DashboardLayout = () => {
    const [appointments, setAppointments] = useState([]);
    const [scheduleGrid, setScheduleGrid] = useState(Array(6).fill(Array(12).fill(null)));
    const [hoveredAppointment, setHoveredAppointment] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        // Fetch appointments from API
        const fetchAppointments = async () => {
            try {
                const response = await AppointmentRepository.getAppointments();
                setAppointments(response.results); // Lưu danh sách cuộc hẹn từ API
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        // Cập nhật lại lịch sau khi đã lấy cuộc hẹn
        const newScheduleGrid = Array(6).fill().map(() => Array(12).fill(null)); // Khởi tạo mảng lịch trống

        appointments.forEach((appointment) => {
            const dayIndex = getDayIndex(appointment.appointment_date); // Lấy chỉ số ngày trong tuần từ ngày cuộc hẹn
            if (dayIndex !== null) {
                // Chuyển thời gian cuộc hẹn thành giờ và phút
                const appointmentDate = new Date(appointment.appointment_date);
                const appointmentStartTime = appointmentDate.getHours(); // Lấy giờ từ thời gian cuộc hẹn

                // Tìm vị trí trong mảng giờ (mỗi giờ tương ứng với 1 dòng trong bảng)
                const hourIndex = hours.findIndex(hour => parseInt(hour.split(':')[0], 10) === appointmentStartTime);
                if (hourIndex !== -1) {
                    newScheduleGrid[dayIndex][hourIndex] = appointment; // Điền cuộc hẹn vào đúng vị trí trong bảng
                }
            }
        });

        setScheduleGrid(newScheduleGrid); // Cập nhật lại state để render lịch
    }, [appointments]);

    const handleMouseEnter = (event, appointmentDetails) => {
        if (!selectedAppointment) {
            const { clientX, clientY } = event;
            const popupWidth = 200;  // Chiều rộng của popup
            const popupHeight = 150; // Chiều cao của popup (có thể thay đổi)
            const windowWidth = window.innerWidth;  // Chiều rộng cửa sổ trình duyệt
            const windowHeight = window.innerHeight; // Chiều cao cửa sổ trình duyệt
            const popupMargin = 10;  // Khoảng cách từ chuột đến popup

            // Kiểm tra vị trí bên phải của popup
            let adjustedLeft = clientX + popupMargin;
            if (clientX + popupWidth + popupMargin > windowWidth) {
                // Nếu popup vượt ra ngoài cửa sổ, điều chỉnh sang trái
                adjustedLeft = clientX - popupWidth - popupMargin;
            }

            // Kiểm tra vị trí phía dưới của popup
            let adjustedTop = clientY + popupMargin;
            if (clientY + popupHeight + popupMargin > windowHeight) {
                // Nếu popup vượt ra ngoài dưới của màn hình, điều chỉnh lên trên
                adjustedTop = clientY - popupHeight - popupMargin;
            }

            setPopupPosition({
                top: adjustedTop,
                left: adjustedLeft,
            });

            setHoveredAppointment(appointmentDetails);  // Cập nhật cuộc hẹn khi hover
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
                                                        className={`appointment ${appointment.status.toLowerCase().replace(' ', '-')}`}
                                                        onMouseEnter={(e) => handleMouseEnter(e, appointment)}
                                                        onMouseLeave={handleMouseLeave}
                                                        onClick={(e) => handleClick(e, appointment)}
                                                    >
                                                        <div className="appointment-content">
                                                            <p>{appointment.appointment_date}</p>
                                                            <p>{hour}</p>
                                                            <span>{appointment.user_id}</span>
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
                    </div>

                    {hoveredAppointment && (
                        <div
                            className="popup"
                            style={{
                                top: `${popupPosition.top}px`,
                                left: `${popupPosition.left}px`
                            }}
                        >
                            <h4>{hoveredAppointment.title}</h4>
                            <p><strong>Patient's Note:</strong> {hoveredAppointment.note}</p>
                            <div className="attendance-time">
                                <span>🗓️ {hoveredAppointment.appointment_date}</span>
                                <span>⏰ {hoveredAppointment.time}</span>
                            </div>
                            <div className="patient-name">
                                <img src="https://via.placeholder.com/24" alt="Patient" />
                                <span>{hoveredAppointment.patientName}</span>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default DashboardLayout;
