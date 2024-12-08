import React from 'react';
import { Layout, Menu } from 'antd';
import {
    CalendarOutlined,
    UserOutlined,
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    MedicineBoxOutlined,
    DollarOutlined,
    IdcardOutlined,

} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { APP_ROUTER } from '../constants/appRouter';

const { Sider } = Layout;

const sidebarStyles = {
    width: '250px',
    backgroundColor: '#F5F5F5',
    logo: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
        padding: '20px 0',
    },
    menu: {
        borderRight: 'none',
        fontSize: '20px',
    },
    logout: {
        color: '#dc3545',
    },
};

const Sidebar = () => {
    const location = useLocation();
    const selectedKey = location.pathname;
    const navigate = useNavigate(); // Thay useHistory bằng useNavigate
    const roleId = parseInt(localStorage.getItem('role_id'), 10);
    // Phương thức đăng xuất
    const onLogout = () => {
        // Xóa token từ localStorage
        localStorage.removeItem('auth_token'); // hoặc sessionStorage tùy vào nơi bạn lưu token

        // Điều hướng người dùng đến trang đăng nhập
        navigate(APP_ROUTER.LOGIN); // Giả sử bạn có định nghĩa route /login trong APP_ROUTER
    };

    return (
        <Sider style={sidebarStyles} collapsible>
            <div style={sidebarStyles.logo}>MEDDICAL</div>
            <Menu theme="light" mode="vertical" selectedKeys={[selectedKey]} style={sidebarStyles.menu}>
                {roleId === 2 && (
                    <Menu.Item key={APP_ROUTER.PROFILEDOCTOR} icon={<UserOutlined />}>
                        <Link to={APP_ROUTER.PROFILEDOCTOR}>Cá nhân</Link>
                    </Menu.Item>
                )}
                <Menu.Item key={APP_ROUTER.ADDASHBOARD} icon={<HomeOutlined />}>
                    <Link to={APP_ROUTER.ADDASHBOARD}>Dashboard</Link>
                </Menu.Item>

                <Menu.Item key={APP_ROUTER.CALENDAR} icon={<CalendarOutlined />}>
                    <Link to={APP_ROUTER.CALENDAR}>Lịch Khám</Link>
                </Menu.Item>
                {roleId === 1 && (
                    <Menu.Item key={APP_ROUTER.DOCTOR} icon={<UserOutlined />}>
                        <Link to={APP_ROUTER.DOCTORLIST}>Bác Sĩ</Link>
                    </Menu.Item>
                )}

                <Menu.Item key={APP_ROUTER.DEPARTMENT} icon={<ProfileOutlined />}>
                    <Link to={APP_ROUTER.DEPARTMENT}>Khoa</Link>
                </Menu.Item>
                <Menu.Item key={APP_ROUTER.PATIENT} icon={<MedicineBoxOutlined />}>
                    <Link to={APP_ROUTER.PATIENT}>Bệnh Nhân</Link>
                </Menu.Item>
                {(roleId === 1 || roleId === 2) && (
                    <Menu.Item key={APP_ROUTER.ADMEDICALRECORD} icon={<IdcardOutlined />}>
                        <Link to={APP_ROUTER.ADMEDICALRECORD}>Bệnh Án</Link>
                    </Menu.Item>
                )}

                {roleId === 1 && (
                    <Menu.Item key={APP_ROUTER.PAYMENT} icon={<DollarOutlined />}>
                        <Link to={APP_ROUTER.PAYMENT}>Thanh Toán</Link>
                    </Menu.Item>
                )}
                <Menu.Divider />
                <Menu.Item key={APP_ROUTER.LOGIN} icon={<LogoutOutlined />} onClick={onLogout} style={sidebarStyles.logout}>
                    <Link to={APP_ROUTER.LOGIN}>Đăng Xuất</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
