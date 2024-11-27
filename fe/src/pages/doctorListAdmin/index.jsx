import React, { useState, useEffect } from 'react';
import { Card, Avatar, Input, Pagination, Button, Modal, Form, Select, TimePicker, notification, Row, Col, InputNumber } from 'antd';
import { UserOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import DoctorRepository from '../../api/indexDT';
import './styles.scss';

const DoctorListAdmin = () => {
    const [doctors, setDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pageSize = 8;

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await DoctorRepository.getAllDoctors();
                console.log('Doctors fetched:', data.results); // Log kết quả từ API
                setDoctors(data.results); // Sử dụng `results` từ phản hồi API
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

    // Lọc danh sách bác sĩ theo từ khóa tìm kiếm
    const filteredDoctors = doctors.filter((doctor) =>
        `${doctor.user.first_name} ${doctor.user.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
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
                user: {
                    email: values.email,
                    password: values.password || 'defaultpassword123', // Mật khẩu mặc định
                    role_id: 2, // Vai trò bác sĩ
                    first_name: values.first_name,
                    last_name: values.last_name,
                    address: values.address,
                    phone: values.phone,
                },
                description: values.description,
                price: parseFloat(values.price), // Chuyển giá trị thành số thực
                specialty: parseInt(values.specialty, 10), // ID chuyên khoa (số nguyên)
                department: parseInt(values.department, 10), // ID khoa (số nguyên)
            };

            console.log('Payload gửi lên API:', newDoctor); // Log để kiểm tra

            const createdDoctor = await DoctorRepository.createDoctor(newDoctor);
            setDoctors((prevDoctors) => [...prevDoctors, createdDoctor]);
            notification.success({
                message: 'Thành công',
                description: 'Bác sĩ đã được thêm',
            });
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error adding doctor:', err);
            notification.error({
                message: 'Lỗi',
                description: 'Không thể thêm bác sĩ. Vui lòng kiểm tra lại thông tin.',
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

            <div className="doctor-grid">
                {currentDoctors.map((doctor) => (
                    <Card key={doctor.id} className="doctor-card" hoverable>
                        <Avatar
                            size={80}
                            src="https://via.placeholder.com/150"
                            icon={!doctor.avatar && <UserOutlined />}
                        />
                        <h3>{`${doctor.user.first_name} ${doctor.user.last_name}`}</h3>
                        <p>{doctor.specialty.name}</p>
                        <p>{doctor.department.name}</p>
                        <p>{doctor.description}</p>
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

            <Modal
                title="Thêm Bác Sĩ Mới"
                visible={isModalOpen}
                onCancel={handleModalCancel}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleAddDoctor}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Họ"
                                name="last_name"
                                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                            >
                                <Input placeholder="Họ" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Tên"
                                name="first_name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    >
                        <Input placeholder="Địa chỉ" />
                    </Form.Item>
                    <Form.Item
                        label="Số Điện Thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    >
                        <Input.TextArea placeholder="Mô tả chuyên môn" rows={3} />
                    </Form.Item>
                    <Form.Item
                        label="Giá Khám"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá khám' }]}
                    >
                        <InputNumber placeholder="Giá khám" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Chuyên Khoa"
                        name="specialty"
                        rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa' }]}
                    >
                        <Select placeholder="Chọn chuyên khoa">

                            <Select.Option value={1}>Tim mạch can thiệp</Select.Option>
                            <Select.Option value={2}>Điện sinh lý tim</Select.Option>
                            <Select.Option value={3}>Suy tim và ghép tim</Select.Option>
                            <Select.Option value={4}>Chẩn đoán hình ảnh tim mạch</Select.Option>
                            <Select.Option value={5}>Tim mạch nhi</Select.Option>
                            <Select.Option value={6}>Thần kinh đột quỵ</Select.Option>
                            <Select.Option value={7}>Thần kinh vận động</Select.Option>
                            <Select.Option value={8}>Thần kinh nhi</Select.Option>
                            <Select.Option value={9}>Thần kinh lão khoa</Select.Option>
                            <Select.Option value={10}>Chẩn đoán hình ảnh thần kinh</Select.Option>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Khoa"
                        name="department"
                        rules={[{ required: true, message: 'Vui lòng chọn khoa' }]}
                    >
                        <Select placeholder="Chọn khoa">
                            <Select.Option value={2}>Khoa thần kinh</Select.Option>
                            <Select.Option value={1}>Khoa tim mạch</Select.Option>
                            <Select.Option value={3}>Khoa chấn thương chỉnh hình</Select.Option>
                            <Select.Option value={4}>Khoa nhi</Select.Option>
                            <Select.Option value={5}>Khoa sản phụ</Select.Option>
                            <Select.Option value={6}>Khoa da liễu</Select.Option>
                            <Select.Option value={7}>Khoa nội</Select.Option>
                            <Select.Option value={9}>Khoa ngoại</Select.Option>
                            <Select.Option value={10}>Khoa y học cổ truyền</Select.Option>



                        </Select>
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
