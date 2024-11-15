import React, { useState, useEffect } from 'react';
import { Table, Pagination, Input, Button, Modal, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.scss';

const PatientList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [patients, setPatients] = useState([]);
    const [totalPatients, setTotalPatients] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        const data = Array.from({ length: 40 }, (_, index) => ({
            key: index,
            name: `Patient ${index + 1}`,
            email: `patient${index + 1}@gmail.com`,
            appointmentDate: `2024-11-${(index % 30) + 1}`,
            time: '9h-10h SA',
            doctor: `Doctor ${index % 5 + 1}`,
            department: index % 2 === 0 ? 'Răng-Hàm-Mặt' : 'Tim Mạch',
            status: index % 3 === 0 ? 'Đã xác nhận' : 'Chờ xác nhận'
        }));
        const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(searchValue) ||
            item.email.toLowerCase().includes(searchValue)
        );
        setPatients(filteredData.slice((page - 1) * 10, page * 10));
        setTotalPatients(filteredData.length);
    };

    const onSearch = (e) => {
        setSearchValue(e.target.value.toLowerCase());
        setCurrentPage(1);
        fetchData(1);
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const onViewDetails = (record) => {
        setSelectedPatient(record);
    };

    const closeModal = () => {
        setSelectedPatient(null);
    };

    const onEdit = (record) => {
        Modal.info({
            title: 'Chỉnh sửa bệnh nhân',
            content: `Chỉnh sửa thông tin của bệnh nhân: ${record.name}`,
        });
    };

    const onDelete = (record) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa?',
            onOk: () => {
                console.log(`Deleted: ${record.name}`);
                fetchData(currentPage);
            },
        });
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <a onClick={() => onViewDetails(record)}>
                    <UserOutlined />
                    <span>{text}</span>
                </a>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày hẹn',
            dataIndex: 'appointmentDate',
            key: 'appointmentDate',
            sorter: (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate),
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: 'Khoa',
            dataIndex: 'department',
            key: 'department',
            filters: [
                { text: 'Răng-Hàm-Mặt', value: 'Răng-Hàm-Mặt' },
                { text: 'Tim Mạch', value: 'Tim Mạch' },
            ],
            onFilter: (value, record) => record.department.includes(value),
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => (
                <Badge
                    status={record.status === 'Đã xác nhận' ? 'success' : 'processing'}
                    text={record.status}
                />
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <span>
                    <Button type="link" onClick={() => onEdit(record)}>Chỉnh sửa</Button>
                    <Button type="link" danger onClick={() => onDelete(record)}>Xóa</Button>
                </span>
            ),
        },
    ];

    return (
        <div className="patient-list">
            <h2>DANH SÁCH BỆNH NHÂN</h2>
            <Input
                placeholder="Tìm kiếm bệnh nhân"
                className="search-input"
                onChange={onSearch}
            />
            <Table
                columns={columns}
                dataSource={patients}
                pagination={false}
                className="patient-table"
            />
            <Pagination
                current={currentPage}
                total={totalPatients}
                pageSize={10}
                onChange={onPageChange}
                className="pagination"
            />
            <Modal
                visible={!!selectedPatient}
                title="Thông tin chi tiết bệnh nhân"
                onCancel={closeModal}
                footer={null}
            >
                {selectedPatient && (
                    <div>
                        <p><b>Tên:</b> {selectedPatient.name}</p>
                        <p><b>Email:</b> {selectedPatient.email}</p>
                        <p><b>Ngày hẹn:</b> {selectedPatient.appointmentDate}</p>
                        <p><b>Thời gian:</b> {selectedPatient.time}</p>
                        <p><b>Bác sĩ:</b> {selectedPatient.doctor}</p>
                        <p><b>Khoa:</b> {selectedPatient.department}</p>
                        <p><b>Trạng thái:</b> {selectedPatient.status}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PatientList;
