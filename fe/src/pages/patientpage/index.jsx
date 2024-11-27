import React, { useState, useEffect } from 'react';
import { Table, Pagination, Input, Button, Modal, Row, Col } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import UserRepository from '../../api/indexUser';
import './styles.scss';

const PatientList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [patients, setPatients] = useState([]);
    const [totalPatients, setTotalPatients] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');  // Thêm state cho tìm kiếm
    const [loading, setLoading] = useState(false);
    const [filteredPatient, setFilteredPatient] = useState([]);


    const getRandomStatus = () => {
        const statuses = ['Đang điều trị', 'Đã khỏi', 'Đang theo dõi'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    };

    const getRandomDoctor = () => {
        const doctors = ['Dr. Nguyen', 'Dr. Tran', 'Dr. Le'];
        return doctors[Math.floor(Math.random() * doctors.length)];
    };

    // Hàm gọi API để lấy dữ liệu người dùng
    const fetchPatients = async () => {
        setLoading(true);
        try {
            const userRepository = new UserRepository();
            const response = await userRepository.getUser({ search: searchQuery });
            const filteredPatients = response
                .filter(patient => patient.role_id === 4) // Lọc bệnh nhân có role_id = 4
                .map(patient => ({
                    name: `${patient.last_name} ${patient.first_name}`,
                    address: patient.address,
                    email: patient.email,
                    status: getRandomStatus(),
                    doctor: getRandomDoctor()
                }));

            setPatients(filteredPatients);
            setTotalPatients(filteredPatients.length);
        } catch (error) {
            console.error('API Error:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchPatients();
    }, [searchQuery]);

    // Lọc danh sách bác sĩ theo từ khóa tìm kiếm

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase())

    );

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button icon={<UserOutlined />} onClick={() => handleView(record)}>
                    View
                </Button>
            ),
        },
    ];


    const handleView = (record) => {
        Modal.info({
            title: 'Patient Info',
            content: (
                <div>
                    <p><strong>Name:</strong> {record.name}</p>
                    <p><strong>Address:</strong> {record.address}</p>
                    <p><strong>Email:</strong> {record.email}</p>
                    <p><strong>Status:</strong> {record.status}</p>
                    <p><strong>Doctor:</strong> {record.doctor}</p>
                </div>
            ),
        });
    };

    return (
        <div className="patient-list">

            <Row justify="space-between" align="middle" className="header">
                <Col>
                    <h2>Danh Sách Bệnh Nhân</h2>
                </Col>
                <Col>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm bệnh nhân"
                        value={searchQuery}
                        onChange={handleSearch}
                        style={{ width: 200 }}
                    />
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={filteredPatients}
                rowKey="id"
                loading={loading}
                pagination={false}
            />
            <Pagination
                current={currentPage}
                total={totalPatients}
                pageSize={10} // 10 bệnh nhân mỗi trang
                onChange={handlePageChange}
                showSizeChanger={false} // Không cho thay đổi số lượng trên mỗi trang
                style={{ marginTop: 16, textAlign: 'right' }}
            />
        </div>
    );
};

export default PatientList;
