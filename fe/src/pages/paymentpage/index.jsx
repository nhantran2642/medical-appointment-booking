import React, { useState, useEffect } from 'react';
import { Table, Pagination, Input, Button, Badge, Modal, Select, DatePicker } from 'antd';
import { DownloadOutlined, CalendarOutlined, PrinterOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import mockData from '../paymentpage/data.json';
import './styles.scss';

const PaymentPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [pageSize, setPageSize] = useState(10);


    useEffect(() => {
        setData(mockData);
        setFilteredData(mockData);
    }, []);

    useEffect(() => {
        let filtered = data;
        if (searchTerm) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterStatus) {
            filtered = filtered.filter((item) => item.status === filterStatus);
        }
        if (selectedDate) {
            filtered = filtered.filter((item) => item.appointmentDate === selectedDate.format('DD/MM/YYYY'));
        }
        setFilteredData(filtered);
    }, [searchTerm, filterStatus, selectedDate, data]);

    const showModal = (record) => {
        setSelectedInvoice(record);
        setIsModalVisible(true);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách thanh toán');
        XLSX.writeFile(workbook, 'DanhSachThanhToan.xlsx');
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Badge color={status === 'Đã thanh toán' ? 'green' : 'red'} text={status} />
            ),
        },
        {
            title: '',
            key: 'actions',
            render: (_, record) => (
                <div className="actions">
                    <Button icon={<DownloadOutlined />} onClick={() => showModal(record)} />
                    <Button icon={<PrinterOutlined />} />
                </div>
            ),
        },
    ];

    const totalRevenue = filteredData
        .filter((item) => item.status === 'Đã thanh toán')
        .reduce((sum, item) => sum + parseInt(item.price.replace(/\D/g, ''), 10), 0);

    const totalPaid = filteredData.filter((item) => item.status === 'Đã thanh toán').length;
    const totalUnpaid = filteredData.filter((item) => item.status === 'Chưa thanh toán').length;

    return (
        <div className="payment-page">
            <h2>THANH TOÁN</h2>
            <div className="actions-header">
                <Input
                    placeholder="Tìm kiếm bệnh nhân"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                    placeholder="Lọc trạng thái"
                    onChange={(value) => setFilterStatus(value)}
                    style={{ width: 200 }}
                >
                    <Select.Option value="">Tất cả</Select.Option>
                    <Select.Option value="Đã thanh toán">Đã thanh toán</Select.Option>
                    <Select.Option value="Chưa thanh toán">Chưa thanh toán</Select.Option>
                </Select>
                <DatePicker
                    onChange={(date) => setSelectedDate(date)}
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày"
                />
                <Button className="download-button" icon={<DownloadOutlined />} onClick={exportToExcel}>
                    Xuất báo cáo
                </Button>
            </div>
            <div className="summary">
                <div className="summary-item">
                    <span>Số lượng đã thanh toán:</span>
                    <p>{totalPaid}</p>
                </div>
                <div className="summary-item">
                    <span>Số lượng chưa thanh toán:</span>
                    <p>{totalUnpaid}</p>
                </div>
                <div className="summary-item">
                    <span>Tổng doanh thu:</span>
                    <p>{totalRevenue.toLocaleString()} VND</p>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={paginatedData}
                pagination={false}
                className="payment-table"
            />
            <Pagination
                current={currentPage}
                total={filteredData.length}
                pageSize={pageSize}
                onChange={(page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                }}
                showSizeChanger
                pageSizeOptions={[5, 10, 20, 50]}
                className="pagination"
            />
            <Modal
                title="Chi tiết hóa đơn"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedInvoice && (
                    <>
                        <p>Tên: {selectedInvoice.name}</p>
                        <p>Email: {selectedInvoice.email}</p>
                        <p>Ngày hẹn: {selectedInvoice.appointmentDate}</p>
                        <p>Giá tiền: {selectedInvoice.price}</p>
                        <p>Trạng thái: {selectedInvoice.status}</p>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default PaymentPage;
