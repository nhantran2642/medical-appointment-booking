
import React, { useState } from 'react';
import { Table, Pagination, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.scss';

const PatientList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const data = Array.from({ length: 10 }, (_, index) => ({
        key: index,
        name: 'Sally Trần',
        email: 'sallysayhi@gmail.com',
        appointmentDate: '10/10/2024',
        time: '9h-10h SA',
        doctor: 'Mai Văn Hà',
        department: 'Răng-Hàm-Mặt'
    }));

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <div className="patient-name">
                    <UserOutlined />
                    <span>{text}</span>
                </div>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Ngày hẹn',
            dataIndex: 'appointmentDate',
            key: 'appointmentDate'
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctor',
            key: 'doctor'
        },
        {
            title: 'Khoa',
            dataIndex: 'department',
            key: 'department'
        }
    ];

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="patient-list">
            <h2>DANH SÁCH BỆNH NHÂN</h2>
            <Input placeholder="Tìm kiếm bệnh nhân" className="search-input" />
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                className="patient-table"
            />
            <Pagination
                current={currentPage}
                total={40}
                pageSize={10}
                onChange={onPageChange}
                className="pagination"
            />
        </div>
    );
};

export default PatientList;
