import React, { useState } from "react";
import { Layout, Menu, Calendar, List, Typography, Badge, Modal, Button, Form, DatePicker, Select, Input } from "antd";
import moment from "moment";
import "./styles.scss";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const CalendarLayout = () => {
    const [appointments, setAppointments] = useState([
        {
            date: "2024-11-06",
            time: "9:00 AM",
            name: "Nguyễn Văn A",
            status: "completed",
            symptoms: "Sốt cao",
            history: "Viêm phổi",
        },
        {
            date: "2024-11-06",
            time: "10:00 AM",
            name: "Trần Thị B",
            status: "waiting",
            symptoms: "Đau bụng",
            history: "Không có tiền sử bệnh nghiêm trọng",
        },
        {
            date: "2024-11-05",
            time: "10:00 AM",
            name: "Sally",
            status: "completed",
            symptoms: "Đau đầu",
            history: "code nhiều",
        },
        {
            date: "2024-11-07",
            time: "10:00 AM",
            name: "Nhân Trần",
            status: "waiting",
            symptoms: "Đau lưng",
            history: "Thoát vị",
        },
        {
            date: "2024-11-05",
            time: "10:00 AM",
            name: "Huy Đỗ",
            status: "completed",
            symptoms: "Đau họng",
            history: "Nói nhiều",
        },
    ]);

    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookingDate, setSelectedBookingDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [patientName, setPatientName] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [history, setHistory] = useState("");

    const workingHours = [
        "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
        "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
    ];

    const getAvailableTimes = (date) => {
        const formattedDate = date.format("YYYY-MM-DD");
        const bookedTimes = appointments
            .filter(appt => appt.date === formattedDate)
            .map(appt => appt.time);
        return workingHours.filter(time => !bookedTimes.includes(time));
    };

    const onDateChange = (date) => {
        const availableTimesForDate = getAvailableTimes(date);
        setSelectedBookingDate(date.format("YYYY-MM-DD"));
        setAvailableTimes(availableTimesForDate);
    };

    const openBookingModal = () => {
        setIsModalOpen(true);
    };

    const confirmBooking = () => {
        const newAppointment = {
            date: selectedBookingDate,
            time: selectedTime,
            name: patientName,
            status: "waiting",
            symptoms: symptoms,
            history: history,
        };
        setAppointments([...appointments, newAppointment]);
        setIsModalOpen(false);
        setPatientName("");
        setSymptoms("");
        setHistory("");
        setSelectedTime("");
    };

    const selectedDateAppointments = appointments.filter(
        (appt) => appt.date === selectedDate
    );

    const getStatusBadge = (status) => {
        return status === "completed" ? "green" : "blue";
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider width={300} className="site-layout-sider">
                <div className="logo">Lịch</div>
                <Calendar
                    fullscreen={false}
                    className="compact-calendar"
                    onSelect={(date) => setSelectedDate(date.format("YYYY-MM-DD"))}
                />
                <Menu mode="vertical" className="calendar-menu">
                    <Menu.Item key="1">Lịch của tôi</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-header">
                    <Title level={3} className="header-title">
                        Lịch Khám Bệnh ({moment(selectedDate).format("DD/MM/YYYY")})
                    </Title>
                    <Button type="primary" className="booking-button" onClick={openBookingModal}>
                        Đặt lịch
                    </Button>
                </Header>
                <Content className="site-layout-content">
                    {selectedDateAppointments.length > 0 ? (
                        <List
                            itemLayout="vertical"
                            dataSource={selectedDateAppointments}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Badge color={getStatusBadge(item.status)} />}
                                        title={<span>{item.name}</span>}
                                        description={
                                            <>
                                                <div>Giờ: {item.time}</div>
                                                <div>Triệu chứng: {item.symptoms}</div>
                                                <div>Tiền sử bệnh: {item.history}</div>
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <div>Không có lịch khám bệnh cho ngày này.</div>
                    )}
                </Content>
            </Layout>

            <Modal
                title="Đặt lịch khám"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={confirmBooking}
            >
                <Form layout="vertical">
                    <Form.Item label="Tên bệnh nhân">
                        <Input value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Chọn ngày">
                        <DatePicker onChange={onDateChange} />
                    </Form.Item>
                    <Form.Item label="Chọn thời gian">
                        <Select
                            onChange={setSelectedTime}
                            options={availableTimes.map(time => ({ value: time, label: time }))}
                            placeholder="Chọn thời gian rảnh"
                        />
                    </Form.Item>
                    <Form.Item label="Triệu chứng">
                        <Input.TextArea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Tiền sử bệnh">
                        <Input.TextArea value={history} onChange={(e) => setHistory(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default CalendarLayout;
