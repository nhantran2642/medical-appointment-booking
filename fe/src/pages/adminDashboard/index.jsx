import React, { useState, useEffect } from 'react';
import { Layout, Card, Table, Progress, Timeline, Typography } from 'antd';
import {
    CalendarOutlined,
    UserOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import './styles.scss';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patientChartData, setPatientChartData] = useState([]);
    const [revenueChartData, setRevenueChartData] = useState([]);

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

        const fetchChartsData = async () => {
            const patientData = [
                { month: 'Jan', patients: 50 },
                { month: 'Feb', patients: 80 },
                { month: 'Mar', patients: 45 },
                { month: 'Apr', patients: 60 },
                { month: 'May', patients: 100 },
                { month: 'Jun', patients: 75 },
                { month: 'Jul', patients: 90 },
                { month: 'Aug', patients: 120 },
                { month: 'Sep', patients: 85 },
                { month: 'Oct', patients: 95 },
                { month: 'Nov', patients: 110 },
                { month: 'Dec', patients: 130 },
            ];

            const revenueData = [
                { month: 'Jan', revenue: 2000 },
                { month: 'Feb', revenue: 3000 },
                { month: 'Mar', revenue: 2500 },
                { month: 'Apr', revenue: 2800 },
                { month: 'May', revenue: 3500 },
                { month: 'Jun', revenue: 4000 },
                { month: 'Jul', revenue: 4500 },
                { month: 'Aug', revenue: 5000 },
                { month: 'Sep', revenue: 4700 },
                { month: 'Oct', revenue: 5200 },
                { month: 'Nov', revenue: 6000 },
                { month: 'Dec', revenue: 6500 },
            ];

            setPatientChartData(patientData);
            setRevenueChartData(revenueData);
        };

        fetchStats();
        fetchDoctors();
        fetchChartsData();
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

                {/* Biểu đồ */}
                <div className="chart-section">
                    <Card title="Số Lượng Bệnh Nhân Theo Tháng">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={patientChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="patients" stroke="#007BFF" name="Bệnh Nhân" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card title="Tổng Doanh Thu Theo Tháng">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#007BFF" name="Doanh Thu" />
                            </BarChart>
                        </ResponsiveContainer>
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
