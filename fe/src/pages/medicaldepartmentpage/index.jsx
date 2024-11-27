import React, { useState } from 'react';
import { Input, Card, Pagination } from 'antd';
import './styles.scss';

const { Search } = Input;

const departments = [
    { name: 'Khoa tim mạch', icon: '❤️' },
    { name: 'Khoa răng hàm mặt', icon: '🦷' },
    { name: 'Khoa gan mật', icon: '🩸' },
    { name: 'Khoa khám bệnh', icon: '🩺' },
    { name: 'Khoa hồi sức cấp cứu', icon: '⛑️' },
    { name: 'Khoa truyền nhiễm', icon: '🦠' },
    { name: 'Khoa thần kinh', icon: '🧠' },
    { name: 'Khoa lão', icon: '👴' },
    { name: 'Khoa chỉnh hình', icon: '🦴' },
    { name: 'Khoa phẫu thuật gây mê', icon: '💉' },
    { name: 'Khoa mắt', icon: '👁️' },
    { name: 'Khoa tai mũi họng', icon: '👂' },
    { name: 'Khoa da liễu', icon: '🧴' },
    { name: 'Khoa sản', icon: '🤰' },
];

const DepartmentList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;


    let paginatedDepartments = departments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    while (paginatedDepartments.length % 4 !== 0) {
        paginatedDepartments.push({ name: '', icon: '' });
    }

    return (
        <div className="department-list">
            <h2>DANH SÁCH KHOA</h2>
            <Search placeholder="Tìm kiếm Khoa" style={{ marginBottom: '20px' }} />
            <div className="department-grid">
                {paginatedDepartments.map((dept, index) => (
                    <div className="department-item" key={index}>
                        <Card className={`department-card ${dept.name === '' ? 'empty-card' : ''}`} hoverable={!dept.name}>
                            <div className="department-icon">{dept.icon}</div>
                            <div className="department-name">{dept.name}</div>
                        </Card>
                    </div>
                ))}
            </div>
            <Pagination
                current={currentPage}
                total={departments.length}
                pageSize={pageSize}
                onChange={page => setCurrentPage(page)}
                style={{ textAlign: 'center', marginTop: '20px' }}
            />
        </div>
    );
};

export default DepartmentList;
