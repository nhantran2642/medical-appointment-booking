import React, { useState, useEffect } from 'react';
import { Card, Avatar, Input, Pagination, Button, Modal, Form, Select, TimePicker, notification, Row, Col } from 'antd';
import { UserOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import DoctorRepository from '../../api/indexDT';
import './styles.scss';


const DoctorListAdmin = () => {
    const [doctors, setDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const pageSize = 12;

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await DoctorRepository.getAllDoctors();
                console.log('Doctors fetched:', data); // Log kết quả từ API
                setDoctors(data);
            } catch (err) {
                console.error('Error fetching doctors:', err);
                notification.error({
                    message: 'Lỗi',
                    description: err || 'Không thể tải danh sách bác sĩ',
                });
            }
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * pageSize;
    const currentDoctors = filteredDoctors.slice(startIndex, startIndex + pageSize);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const handleAddDoctor = async (values) => {
        try {
            const newDoctor = {
                name: values.name,
                specialty: values.specialty,
                email: values.email,
                startTime: values.startTime.format('HH:mm'),
                endTime: values.endTime.format('HH:mm'),
                phone: values.phone,
                avatar: 'https://via.placeholder.com/150',
            };
            const createdDoctor = await DoctorRepository.createDoctor(newDoctor);
            setDoctors([...doctors, createdDoctor]);
            notification.success({
                message: 'Thành công',
                description: 'Bác sĩ đã được thêm',
            });
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error adding doctor:', err);
            notification.error({
                message: 'Lỗi',
                description: typeof err === 'string' ? err : 'Không thể thêm bác sĩ',
            });
        }
    };

    return (
        <div className="doctor-list-container">
            <div className="doctor-list-header">
                <h2>DANH SÁCH BÁC SĨ</h2>
                <Input
                    placeholder="Tìm kiếm bác sĩ"
                    prefix={<SearchOutlined />}
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Thêm Bác Sĩ
                </Button>
            </div>

            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <>
                    <div className="doctor-grid">
                        {currentDoctors.map((doctor, index) => (
                            <Card key={index} className="doctor-card" hoverable>
                                <Avatar
                                    size={80}
                                    src={doctor.avatar}
                                    icon={!doctor.avatar && <UserOutlined />}
                                />
                                <h3>{doctor.name}</h3>
                                <p>{doctor.specialty}</p>
                            </Card>
                        ))}
                    </div>

                    <Pagination
                        current={currentPage}
                        total={filteredDoctors.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        className="pagination"
                        showTotal={(total) => `Hiển thị ${currentDoctors.length} trên tổng ${total} bác sĩ`}
                    />
                </>
            )}

            <Modal
                title="Thêm Bác Sĩ Mới"
                visible={isModalOpen}
                onCancel={handleModalCancel}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleAddDoctor}>
                    <Form.Item label="Tên Bác Sĩ" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên bác sĩ' }]}>
                        <Input placeholder="Tên bác sĩ" />
                    </Form.Item>
                    <Form.Item label="Chuyên Khoa" name="specialty" rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa' }]}>
                        <Select placeholder="Chọn chuyên khoa">
                            <Select.Option value="Virologist">Virologist</Select.Option>
                            <Select.Option value="Oncologist">Oncologist</Select.Option>
                            <Select.Option value="Surgeon">Surgeon</Select.Option>
                            <Select.Option value="Pediatrician">Pediatrician</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Giờ Bắt Đầu" name="startTime" rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu' }]}>
                                <TimePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Giờ Kết Thúc" name="endTime" rules={[{ required: true, message: 'Vui lòng chọn giờ kết thúc' }]}>
                                <TimePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Số Điện Thoại" name="phone">
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" onClick={handleModalCancel} style={{ marginRight: '10px' }}>
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Thêm Bác Sĩ
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DoctorListAdmin;
