import React, { useState, useEffect } from 'react';
import { Table, Pagination, Input, Button, Modal, Row, Col, Form, message } from 'antd';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import UserRepository from '../../api/indexUser';
import './styles.scss';

const PatientList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [patients, setPatients] = useState([]);
    const [totalPatients, setTotalPatients] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State cho tìm kiếm
    const [pageSize] = useState(10); // Số bệnh nhân trên mỗi trang
    const [form] = Form.useForm();


    const getRandomStatus = () => {
        const statuses = ['Khám', 'Chưa khám'];
        const randomIndex = Math.floor(Math.random() * statuses.length); // Chọn trạng thái ngẫu nhiên
        return statuses[randomIndex];
    };

    // Hàm gọi API để lấy dữ liệu người dùng
    const fetchPatients = async (page = 1, searchQuery = '') => {
        setLoading(true);
        try {
            const userRepository = new UserRepository();
            const response = await userRepository.getUser({ page, pageSize });
            const filteredPatients = response
                .filter(patient => patient.role_id === 4) // Lọc bệnh nhân có role_id = 4
                .filter(patient =>
                    patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    patient.last_name.toLowerCase().includes(searchQuery.toLowerCase()) // Tìm kiếm theo tên
                )
                .map(patient => ({
                    id: patient.id, // Đảm bảo có trường id
                    name: `${patient.last_name} ${patient.first_name}`,
                    address: patient.address,
                    email: patient.email,
                    status: getRandomStatus(),
                    doctor: patient.doctor || "Chưa chỉ định",
                    diagnosis: patient.diagnosis || "Chưa có thông tin",
                    treatmentPlan: patient.treatmentPlan || "Chưa có thông tin",
                    prescription: patient.prescription || "Chưa có thông tin",
                    startDate: patient.startDate || "Chưa có thông tin",
                    endDate: patient.endDate || "Chưa có thông tin",
                    notes: patient.notes || "Chưa có ghi chú",
                    doctorName: patient.doctorName || "Chưa chỉ định"
                }));

            // Giả sử API trả về tổng số bệnh nhân từ cơ sở dữ liệu
            const totalRecords = response.totalCount || 0; // Thêm trường totalCount vào API để trả tổng số bệnh nhân
            setPatients(filteredPatients);
            setTotalPatients(totalRecords); // Tổng số bệnh nhân để phân trang
        } catch (error) {
            console.error('API Error:', error);
            message.error('Đã xảy ra lỗi khi tải dữ liệu.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients(currentPage, searchQuery); // Gọi lại hàm fetch khi searchQuery hoặc currentPage thay đổi
    }, [currentPage, searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Cập nhật searchQuery khi thay đổi ô tìm kiếm
    };

    const handleViewRecord = (record) => {
        setCurrentRecord(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            diagnosis: record.diagnosis,
            treatmentPlan: record.treatmentPlan,
            prescription: record.prescription,
            startDate: record.startDate,
            endDate: record.endDate,
            notes: record.notes,
            doctorName: record.doctorName
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentRecord(null);
        form.resetFields();
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedRecord = { ...currentRecord, ...values };

            // Gọi API để cập nhật dữ liệu
            const userRepository = new UserRepository();
            const response = await userRepository.updateUser(updatedRecord.id, updatedRecord);

            if (response.success) {
                message.success('Cập nhật hồ sơ bệnh án thành công.');
                // Cập nhật danh sách bệnh nhân
                setPatients(prevPatients =>
                    prevPatients.map(patient => patient.id === updatedRecord.id ? updatedRecord : patient)
                );
                setIsModalVisible(false);
                setCurrentRecord(null);
                form.resetFields();
            } else {
                message.error('Cập nhật hồ sơ bệnh án thất bại.');
            }
        } catch (error) {
            console.error('Update Error:', error);
            message.error('Đã xảy ra lỗi khi cập nhật.');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page); // Cập nhật currentPage khi thay đổi trang
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span
                    style={{
                        color: status === 'Khám' ? 'green' : 'red', // Xanh cho 'Khám', đỏ cho 'Chưa khám'
                        fontWeight: 'bold',
                    }}
                >
                    {status}
                </span>
            ),

        },
        {
            title: 'Hồ Sơ',
            key: 'actions',
            render: (text, record) => (
                <Button icon={<EditOutlined />} onClick={() => handleViewRecord(record)}>
                    View Record
                </Button>
            ),
        },
    ];

    return (
        <div className="patient-list">
            <Row justify="space-between" align="middle" className="header">
                <Col>
                    <h2>Danh Sách Bệnh Nhân</h2>
                </Col>
                <Col>
                    <Input
                        placeholder="Tìm kiếm bệnh nhân"
                        style={{ width: 200 }}
                        value={searchQuery}
                        onChange={handleSearch} // Cập nhật giá trị khi người dùng nhập
                        prefix={<SearchOutlined />}
                    />
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={patients}
                rowKey="id"
                loading={loading}
                pagination={false}
            />
            <Pagination
                current={currentPage}
                total={totalPatients}
                pageSize={pageSize}
                showSizeChanger={false}
                style={{ marginTop: 16, textAlign: 'right' }}
                onChange={handlePageChange} // Xử lý thay đổi trang
            />

            {/* Modal để chỉnh sửa hồ sơ bệnh án */}
            <Modal
                visible={isModalVisible}
                title={<div style={{ textAlign: 'center' }}>Hồ Sơ Bệnh Án</div>}
                onCancel={handleCancel}
                onOk={handleSave}
                okText="Lưu"
                cancelText="Hủy"
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="doctorName"
                                label="Bác sĩ"
                                rules={[{ required: true, message: 'Vui lòng nhập tên bác sĩ!' }]}>
                                <Input placeholder="Tên bác sĩ" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="diagnosis"
                                label="Chẩn đoán"
                                rules={[{ required: true, message: 'Vui lòng nhập chẩn đoán!' }]}>
                                <Input placeholder="Chẩn đoán" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="startDate"
                                label="Ngày bắt đầu"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}>
                                <Input type="date" placeholder="Ngày bắt đầu" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="endDate"
                                label="Ngày kết thúc"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}>
                                <Input type="date" placeholder="Ngày kết thúc" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="treatmentPlan"
                                label="Phác đồ điều trị"
                                rules={[{ required: true, message: 'Vui lòng nhập phác đồ điều trị!' }]}>
                                <Input placeholder="Phác đồ điều trị" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="prescription"
                                label="Đơn thuốc"
                                rules={[{ required: true, message: 'Vui lòng nhập đơn thuốc!' }]}>
                                <Input placeholder="Đơn thuốc" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="notes"
                                label="Ghi chú"
                                rules={[{ required: false }]}>
                                <Input placeholder="Ghi chú" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default PatientList;
