import React, { useState, useEffect } from 'react';
import { Card, Row, Divider, Table, Button, Spin, Modal, Input, Form, DatePicker, Select } from 'antd';
import MedicalRecordRepository from '../../api/apiMedicalRecord';
import UserRepository from '../../api/apiUsers';
import moment from 'moment';
import './styles.scss';

const { TextArea } = Input;

// Columns cho bảng lịch sử điều trị
const columns = (handleDelete) => [
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'start_date',
        key: 'start_date',
        render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'end_date',
        key: 'end_date',
        render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
        title: 'Chẩn đoán',
        dataIndex: 'diagnosis',
        key: 'diagnosis',
    },
    {
        title: 'Điều trị',
        dataIndex: 'treatment',
        key: 'treatment',
    },
    {
        title: 'Toa thuốc',
        dataIndex: 'prescription',
        key: 'prescription',
    },
    {
        title: 'Bác sĩ',
        dataIndex: 'doctor',
        key: 'doctor',
        render: (doctor) => {
            if (!doctor || !doctor.user || !doctor.user.first_name || !doctor.user.last_name) {
                return <p>Bác sĩ không xác định</p>;
            }
            return <p>{doctor.user.first_name} {doctor.user.last_name}</p>;
        },
    },
    {
        title: 'Bệnh Nhân',
        dataIndex: 'user',
        key: 'user',
        render: (user) => {
            if (!user || !user.first_name || !user.last_name) {
                return <p>Bệnh nhân không xác định</p>;
            }
            return <p>{user.first_name} {user.last_name}</p>;
        },
    },
    {
        title: 'Ghi chú',
        dataIndex: 'notes',
        key: 'notes',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Button danger onClick={() => handleDelete(record.id)}>
                Xóa
            </Button>
        ),
    }
];

const RecordsPatient = () => {
    const [medicalRecords, setMedicalRecords] = useState([]); // Hồ sơ bệnh án
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(null); // Lỗi khi gọi API
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]); // Danh sách người dùng
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);  // Modal Thêm hồ sơ
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const currentUserRole = localStorage.getItem('role_id');

    // Lấy danh sách người dùng 
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoadingUsers(true);
                const response = await UserRepository.getusers();
                console.log('Fetched users:', response);
                if (Array.isArray(response.data)) {
                    const filteredUsers = response.data.filter(user => user.role_id === 4);
                    setUsers(filteredUsers);
                } else {
                    console.error('Dữ liệu không phải là mảng JSON');
                    setError('Dữ liệu không hợp lệ.');
                }
            } catch (err) {
                console.error('Lỗi khi lấy danh sách người dùng:', err);
                setError('Không thể tải danh sách người dùng.');
            } finally {
                setIsLoadingUsers(false);
            }
        };

        fetchUsers();
    }, []); // Chỉ gọi một lần khi component mount


    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await MedicalRecordRepository.getAllMedical(); // Gọi API một lần
                console.log('API Response:', response);

                if (response && response.results) {
                    const updatedRecords = await Promise.all(
                        response.results.map(async (record) => {
                            try {
                                const userResponse = await UserRepository.getUserById(record.user_id);
                                return {
                                    ...record,
                                    user: {
                                        first_name: userResponse.first_name,
                                        last_name: userResponse.last_name,
                                    },
                                };
                            } catch (err) {
                                console.error('Error fetching user:', err);
                                return record;
                            }
                        })
                    );

                    setMedicalRecords(updatedRecords);
                    // Cập nhật pagination.total với tổng số bản ghi
                    setPagination({
                        current: 1, // Đặt lại trang hiện tại về 1
                        pageSize: pagination.pageSize,
                        total: updatedRecords.length, // Cập nhật tổng số bản ghi
                    });
                } else {
                    setMedicalRecords([]);
                }
            } catch (err) {
                console.error('Error fetching medical records:', err);
                setError('Không thể tải hồ sơ bệnh án. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicalRecords(); // Gọi API một lần khi component mount
    }, []);

    const handleAddMedicalRecord = async (values) => {
        try {
            const newMedicalRecord = {
                diagnosis: values.diagnosis,
                treatment: values.treatment,
                prescription: values.prescription,
                notes: values.notes,
                start_date: values.start_date,
                end_date: values.end_date,
                user_id: values.user_id,  // user_id là người dùng đã chọn
            };

            const response = await MedicalRecordRepository.createMedical(newMedicalRecord);
            console.log('API Response:', response);

            if (response) {
                setMedicalRecords((prevRecords) => [response, ...prevRecords]); // Thêm hồ sơ mới vào danh sách
                setModalVisible(false);
                alert('Thêm hồ sơ bệnh án thành công!');
            }
        } catch (error) {
            console.error('Thêm hồ sơ bệnh án không thành công:', error);
            alert('Thêm hồ sơ bệnh án thất bại, vui lòng thử lại!');
        }
    };

    const handleDelete = (id) => {
        setSelectedRecordId(id);
        setIsModalVisible(true);
    };

    const handleRecordClick = (record) => {
        if (currentUserRole === '2') {  // Kiểm tra role_id lấy từ localStorage
            setSelectedRecord(record);
            form.setFieldsValue({
                diagnosis: record.diagnosis,
                treatment: record.treatment,
                prescription: record.prescription,
                notes: record.notes,
                doctor: record.doctor ? `${record.doctor.first_name} ${record.doctor.last_name}` : '',
                start_date: moment(record.start_date),
                end_date: moment(record.end_date),

            });
            setIsUpdateModalVisible(true);  // Mở modal cập nhật
        } else {
            setIsUpdateModalVisible(false);
        }
    };


    const handleUpdateMedicalRecord = async (values) => {
        try {
            const updatedRecord = {
                ...selectedRecord,
                diagnosis: values.diagnosis,
                treatment: values.treatment,
                prescription: values.prescription,
                notes: values.notes,
                start_date: values.start_date,
                end_date: values.end_date,
            };
            console.log('Payload gửi lên:', updatedRecord);
            const response = await MedicalRecordRepository.updateMedical(selectedRecord.id, updatedRecord);
            console.log('API Response:', response);
            if (response) {
                setMedicalRecords((prevRecords) =>
                    prevRecords.map((record) =>
                        record.id === selectedRecord.id ? { ...record, ...updatedRecord } : record
                    )
                );
                setModalVisible(false);
                alert('Cập nhật thành công!');
            }
        } catch (error) {
            console.error('Cập nhật bệnh án không thành công:', error);
            alert('Cập nhật thất bại, vui lòng thử lại!');
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await MedicalRecordRepository.deleteMedical(selectedRecordId); // Gọi API xóa
            setMedicalRecords(medicalRecords.filter(record => record.id !== selectedRecordId)); // Xóa khỏi bảng
            setIsModalVisible(false); // Đóng modal
            alert('Xóa bệnh án thành công!');
        } catch (error) {
            console.error('Error deleting medical record:', error);
            alert('Xóa bệnh án không thành công.');
        }
    };

    const handleCancelDelete = () => {
        setIsModalVisible(false);
    };

    const handleTableChange = (pagination) => {
        setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total, // Đảm bảo pagination.total luôn chính xác
        });
    };

    // Phân trang trên client-side
    const paginatedData = medicalRecords.slice(
        (pagination.current - 1) * pagination.pageSize,
        pagination.current * pagination.pageSize
    );

    return (
        <div className="patient-profile">
            {loading ? (
                <Spin size="large" tip="Đang tải..." />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Card title="Tất cả hồ sơ bệnh án" className="patient-profile__treatment-history">
                    <Table
                        columns={columns(handleDelete)} // Gửi handleDelete vào columns
                        dataSource={paginatedData}  // Hiển thị dữ liệu phân trang
                        rowKey="id"
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: pagination.total,  // Đảm bảo pagination.total chính xác
                            onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
                        }}
                        onRow={(record) => ({
                            onClick: () => handleRecordClick(record),
                        })}
                    />
                </Card>
            )}

            <Divider />


            {/* Modal Thêm Hồ Sơ Bệnh Án */}
            {currentUserRole === '2' && (
                <Row justify="end">
                    <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
                        Thêm hồ sơ bệnh án
                    </Button>
                </Row>
            )}

            <Modal
                visible={isAddModalVisible}  // Thêm hồ sơ
                title="Thêm hồ sơ bệnh án"
                onCancel={() => setIsAddModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddMedicalRecord}>
                    <Form.Item
                        label="Chẩn đoán"
                        name="diagnosis"
                        rules={[{ required: true, message: 'Chẩn đoán không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Điều trị"
                        name="treatment"
                        rules={[{ required: true, message: 'Điều trị không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Toa thuốc"
                        name="prescription"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Ghi chú"
                        name="notes"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Ngày bắt đầu"
                        name="start_date"
                        rules={[{ required: true, message: 'Ngày bắt đầu không được để trống' }]}
                    >
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item
                        label="Ngày kết thúc"
                        name="end_date"
                        rules={[{ required: true, message: 'Ngày kết thúc không được để trống' }]}
                    >
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>
                    {/* Chọn người dùng (bác sĩ hoặc bệnh nhân) */}
                    <Form.Item label="Người thực hiện" name="user_id" rules={[{ required: true, message: 'Vui lòng chọn người thực hiện' }]}>
                        <Select placeholder="Chọn người thực hiện">
                            {isLoadingUsers ? (
                                <Spin />
                            ) : (
                                users.map((user) => (
                                    <Select.Option key={user.id} value={user.id}>
                                        {user.first_name} {user.last_name}
                                    </Select.Option>
                                ))
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm hồ sơ
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/* Modal Cập Nhật Hồ Sơ Bệnh Án */}
            <Modal
                visible={isUpdateModalVisible}
                title="Cập nhật hồ sơ bệnh án"
                onCancel={() => setIsUpdateModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleUpdateMedicalRecord}>
                    <Form.Item
                        label="Chẩn đoán"
                        name="diagnosis"
                        initialValue={selectedRecord?.diagnosis}
                        rules={[{ required: true, message: 'Chẩn đoán không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Điều trị"
                        name="treatment"
                        initialValue={selectedRecord?.treatment}
                        rules={[{ required: true, message: 'Điều trị không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Toa thuốc"
                        name="prescription"
                        initialValue={selectedRecord?.prescription}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Ghi chú"
                        name="notes"
                        initialValue={selectedRecord?.notes}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Ngày bắt đầu"
                        name="start_date"
                        initialValue={selectedRecord?.start_date}
                        rules={[{ required: true, message: 'Ngày bắt đầu không được để trống' }]}
                    >
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item
                        label="Ngày kết thúc"
                        name="end_date"
                        initialValue={selectedRecord?.end_date}
                        rules={[{ required: true, message: 'Ngày kết thúc không được để trống' }]}
                    >
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Cập nhật</Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal xác nhận xóa */}
            <Modal
                title="Xác nhận xóa"
                visible={isModalVisible}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                okText="Xóa"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn xóa bệnh án này không?</p>
            </Modal>



        </div>
    );
};

export default RecordsPatient;
