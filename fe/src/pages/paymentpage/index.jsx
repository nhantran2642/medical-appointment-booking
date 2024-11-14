// PaymentPage.jsx
import React, { useState } from 'react';
import { Table, Pagination, Input, Button, Badge } from 'antd';
import { DownloadOutlined, CalendarOutlined, PrinterOutlined } from '@ant-design/icons';
import './styles.scss';

const PaymentPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const data = Array.from({ length: 10 }, (_, index) => ({
        key: index,
        name: 'Sally Trần',
        email: 'sallysayhi@gmail.com',
        appointmentDate: '10/10/2024',
        price: '200.000 VND',
        status: index % 2 === 0 ? 'Đã thanh toán' : 'Chưa thanh toán',
    }));

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <div className="patient-name">
                    <CalendarOutlined />
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
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Badge
                    color={status === 'Đã thanh toán' ? 'green' : 'red'}
                    text={status}
                />
            )
        },
        {
            title: '',
            key: 'actions',
            render: () => (
                <div className="actions">
                    <Button icon={<DownloadOutlined />} />
                    <Button icon={<PrinterOutlined />} />
                </div>
            )
        }
    ];

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="payment-page">
            <h2>THANH TOÁN</h2>
            <Button className="download-button" icon={<DownloadOutlined />}>Tải xuống</Button>
            <Input placeholder="Tìm kiếm bệnh nhân" className="search-input" />
            <div className="summary">
                <div className="summary-item">
                    <CalendarOutlined />
                    <span>DOANH THU</span>
                    <p>13.684.551 VND</p>
                </div>
                <div className="summary-item">
                    <CalendarOutlined />
                    <span>LỢI NHUẬN</span>
                    <p>6.885.547 VND</p>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                className="payment-table"
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

export default PaymentPage;
