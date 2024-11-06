import React from 'react';
import { Layout, Card } from 'antd';
import {
    CalendarOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './styles.scss';

const { Content } = Layout;

const Dashboard = () => {
    return (
        <Layout className="dashboard-container">
            <Layout>
                <Content className="content">
                    <div className="info-cards">
                        <Card className="card" hoverable>
                            <CalendarOutlined className="icon" />
                            <div>
                                <h3>Lịch Khám</h3>
                                <p>123</p>
                            </div>
                        </Card>
                        <Card className="card" hoverable>
                            <UserOutlined className="icon" />
                            <div>
                                <h3>Bệnh Nhân Mới</h3>
                                <p>32</p>
                            </div>
                        </Card>
                        <Card className="card" hoverable>
                            <CalendarOutlined className="icon" />
                            <div>
                                <h3>Lịch Hôm Nay</h3>
                                <p>21</p>
                            </div>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
