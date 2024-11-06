import React, { useState } from 'react';
import { Card, Avatar, Input, Pagination, Button, Modal, Form, DatePicker, Select, TimePicker, Upload, Row, Col } from 'antd';
import { UserOutlined, SearchOutlined, StarFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './styles.scss';

const DoctorList = () => {
    const doctors = [
        { name: 'Dr. Bellamy N', specialty: 'Virologist', rating: 4.5, reviews: 123, avatar: 'https://img.freepik.com/free-photo/portrait-3d-female-doctor_23-2151107332.jpg' },
        { name: 'Dr. Mensah T', specialty: 'Oncologist', rating: 4.3, reviews: 150, avatar: 'https://cdn3d.iconscout.com/3d/premium/preview/doctor-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--medical-medicine-profession-pack-people-icons-8179550.png?f=webp&h=700' },
        { name: 'Dr. Klimisch J', specialty: 'Surgeon', rating: 4.5, reviews: 155, avatar: 'https://static.vecteezy.com/system/resources/previews/015/407/577/non_2x/doctor-round-avatar-medicine-flat-avatar-with-male-doctor-medical-clinic-team-round-icon-medical-collection-illustration-vector.jpg' },
        { name: 'Dr. Martinez K', specialty: 'Pediatrician', rating: 4.3, reviews: 130, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSovKBbJwLkfKIsQeCeCc2HYWXasbq1BkXQBQ&s' },
        { name: 'Dr. Ronaldo', specialty: 'Pediatrician', rating: 4.6, reviews: 50, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUgJwIvxpd55DbFBhTtLZb9vDeYzz7aAfL6g&s' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pageSize = 12;
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

    const handleModalOk = () => {

        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
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
                        <div className="doctor-rating">
                            <StarFilled style={{ color: '#fadb14' }} />
                            <span>{doctor.rating}</span> ({doctor.reviews} reviews)
                        </div>
                    </Card>
                ))}
            </div>

            <Pagination
                current={currentPage}
                total={filteredDoctors.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                className="pagination"
            />

            {/* Modal for Adding a New Doctor */}
            <Modal
                title="Thêm Bác Sĩ Mới"
                visible={isModalOpen}
                onCancel={handleModalCancel}
                footer={null}
            >
                <Form layout="vertical">
                    <Form.Item label="Hình đại diện">
                        <Avatar size={64} src="https://via.placeholder.com/150" />
                        <Upload>
                            <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
                        </Upload>
                    </Form.Item>

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
                            <Form.Item label="Giờ Bắt Đầu">
                                <TimePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Giờ Kết Thúc">
                                <TimePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Số Điện Thoại" name="number">
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="default" onClick={handleModalCancel} style={{ marginRight: '10px' }}>
                            Hủy
                        </Button>
                        <Button type="primary" onClick={handleModalOk}>
                            Thêm Bác Sĩ
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DoctorList;
