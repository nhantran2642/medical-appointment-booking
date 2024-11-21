import React, { useState, useEffect } from 'react';
import { Layout, Card, Table, Progress, Timeline, Typography } from 'antd';
import {
    CalendarOutlined,
    UserOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import './styles.scss';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            const data = [
                { icon: CalendarOutlined, title: 'Lịch Khám', number: 123 },
                { icon: UserOutlined, title: 'Bệnh Nhân Mới', number: 32 },
                { icon: CalendarOutlined, title: 'Lịch Hôm Nay', number: 21 },
            ];
            setStats(data);
        };

        const fetchDoctors = async () => {
            const doctorData = [
                { key: 1, name: 'Dr. Nguyễn Văn A', specialty: 'Nội khoa', status: 'Hoạt động' },
                { key: 2, name: 'Dr. Lê Thị B', specialty: 'Ngoại khoa', status: 'Nghỉ phép' },
                { key: 3, name: 'Dr. Phạm Văn C', specialty: 'Tim mạch', status: 'Hoạt động' },
            ];
            setDoctors(doctorData);
        };

        fetchStats();
        fetchDoctors();
    }, []);

    const columns = [
        {
            title: 'Tên Bác Sĩ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chuyên Khoa',
            dataIndex: 'specialty',
            key: 'specialty',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span style={{ color: status === 'Hoạt động' ? 'green' : 'red' }}>{status}</span>
            ),
        },
    ];

    return (
        <Layout className="dashboard-container">
            <Content className="content">
                <Title level={2}>Tổng Quan</Title>

                {/* Dòng đầu tiên: Thẻ thống kê */}
                <div className="info-cards-row1">
                    {stats.map((stat, index) => (
                        <Card className="card" hoverable key={index}>
                            <stat.icon className="icon" />
                            <div>
                                <h3>{stat.title}</h3>
                                <p>{stat.number}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Dòng thứ hai: Extra thông tin */}
                <div className="info-cards-row2">
                    <Card title="Tỉ lệ Bệnh Nhân Mới">
                        <Progress
                            percent={32}
                            format={(percent) => `${percent}% Bệnh Nhân Mới`}
                            strokeColor="#007bff"
                        />
                    </Card>
                    <Card title="Lịch Khám Hôm Nay">
                        <Timeline>
                            <Timeline.Item color="green">9:00 - Khám Nội Khoa</Timeline.Item>
                            <Timeline.Item color="blue">11:30 - Phẫu thuật</Timeline.Item>
                        </Timeline>
                    </Card>
                </div>

                {/* Danh sách bác sĩ */}
                <Card title="Danh Sách Bác Sĩ">
                    <Table
                        columns={columns}
                        dataSource={doctors}
                        pagination={{ pageSize: 5 }}
                    />
                </Card>
            </Content>
        </Layout>
    );
};

export default Dashboard;
