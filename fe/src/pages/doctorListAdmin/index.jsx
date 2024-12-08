import React, { useState, useEffect } from 'react';
import { Card, Avatar, Input, Pagination, Button, Modal, Form, Select, TimePicker, notification, Row, Col, InputNumber } from 'antd';
import { UserOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import DoctorRepository from '../../api/indexDT';
import './styles.scss';

const DoctorListAdmin = () => {
    const [doctors, setDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const pageSize = 8;
    const roleId = parseInt(localStorage.getItem('role_id'), 10);

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

    const showAddModal = () => {
        setIsAddModalOpen(true);
    };

    const showEditModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsEditModalOpen(true);
    };

    const handleAddModalCancel = () => {
        setIsAddModalOpen(false);
    };

    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
        setSelectedDoctor(null);
    };

    const handleAddDoctor = async (values) => {
        try {
            const newDoctor = {
                user: {
                    email: values.email,
                    password: values.password || 'defaultpassword123',
                    role_id: 2,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    address: values.address,
                    phone: values.phone,
                },
                description: values.description,
                price: parseFloat(values.price),
                specialty: parseInt(values.specialty, 10),
                department: parseInt(values.department, 10),
            };

            const createdDoctor = await DoctorRepository.createDoctor(newDoctor);
            setDoctors((prevDoctors) => [...prevDoctors, createdDoctor]);
            notification.success({
                message: 'Thành công',
                description: 'Bác sĩ đã được thêm',
            });
            setIsAddModalOpen(false);
        } catch (err) {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể thêm bác sĩ. Vui lòng kiểm tra lại thông tin.',
            });
        }
    };

    const handleUpdateDoctor = async (values) => {
        try {
            const updatedDoctor = {
                ...selectedDoctor,
                user: {
                    ...selectedDoctor.user,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    address: values.address,
                    phone: values.phone,
                },
                description: values.description,
                price: parseFloat(values.price),
                active: true,
            };

            const response = await DoctorRepository.updateDoctor(selectedDoctor.id, updatedDoctor);
            setDoctors((prevDoctors) =>
                prevDoctors.map((doc) => (doc.id === response.id ? response : doc))
            );
            notification.success({
                message: 'Thành công',
                description: 'Thông tin bác sĩ đã được cập nhật',
            });
            setIsEditModalOpen(false);
            setSelectedDoctor(null);
        } catch (err) {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể cập nhật thông tin. Vui lòng thử lại.',
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
                {roleId === 1 && (
                    <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                        Thêm Bác Sĩ
                    </Button>
                )}

            </div>

            <div className="doctor-grid">
                {currentDoctors.map((doctor) => (
                    <Card
                        key={doctor.id}
                        className="doctor-card"
                        hoverable
                        onClick={() => showEditModal(doctor)}
                    >
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
                visible={isAddModalOpen}
                onCancel={handleAddModalCancel}
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
                        <Button type="default" onClick={handleAddModalCancel} style={{ marginRight: '10px' }}>
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Thêm Bác Sĩ
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Cập Nhật Thông Tin Bác Sĩ"
                visible={isEditModalOpen}
                onCancel={handleEditModalCancel}
                footer={null}
            >
                {selectedDoctor && (
                    <Form
                        layout="vertical"
                        initialValues={{
                            first_name: selectedDoctor.user.first_name,
                            last_name: selectedDoctor.user.last_name,
                            email: selectedDoctor.user.email,
                            address: selectedDoctor.user.address,
                            phone: selectedDoctor.user.phone,
                            description: selectedDoctor.description,
                            price: selectedDoctor.price,
                            specialty: selectedDoctor.specialty.id,
                            department: selectedDoctor.department.id,
                        }}
                        onFinish={handleUpdateDoctor}
                    >
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
                            <Button type="default" onClick={handleEditModalCancel} style={{ marginRight: '10px' }}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Edit Bac Si
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default DoctorListAdmin;
