import React, { useEffect, useState } from 'react';
import './style.scss';
import NavigationSidebar from '../../components/NavigationSidebar';
import MedicalRecordRepository from '../../api/apiMedicalRecord';
import { useNavigate } from 'react-router-dom';  // Để sử dụng tính năng điều hướng

const PatientProfile = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Khởi tạo hàm điều hướng

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await MedicalRecordRepository.getAllMedical();

                if (response && response.results) {
                    setMedicalRecords(response.results);
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

        fetchMedicalRecords();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} ngày ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const handleGoBack = () => {
        navigate('/medical-record');
    };

    return (
        <div className="container">
            <div className="navigation-sidebar">
                <NavigationSidebar />
            </div>
            <div className="profile">
                <h2>Hồ Sơ Bệnh Án</h2>


                {loading && <p>Đang tải...</p>}
                {error && <p className="error">{error}</p>}

                {!loading && !error && medicalRecords.length === 0 && (
                    <p>Không có hồ sơ bệnh án nào được tìm thấy.</p>
                )}

{!loading && !error && medicalRecords.length > 0 && (
    <div className="medical-records-list">
        {medicalRecords.map((record) => (
            <div key={record.id} className="medical-record">
                <h3 className="medical-record-title">Hồ sơ bệnh án #{record.id}</h3>
                <div className="profile-section">
                    <div className="profile-row">
                        <span>Chẩn đoán</span>
                        <span>{record.diagnosis || 'Không có'}</span>
                    </div>
                    <div className="profile-row">
                        <span>Phác đồ điều trị</span>
                        <span>{record.treatment || 'Không có'}</span>
                    </div>
                    <div className="profile-row">
                        <span>Đơn thuốc</span>
                        <span>{record.prescription || 'Không có'}</span>
                    </div>
                    <div className="profile-row">
                        <span>Ngày bắt đầu</span>
                        <span>{formatDate(record.start_date)}</span>
                    </div>
                    <div className="profile-row">
                        <span>Ngày kết thúc</span>
                        <span>{formatDate(record.end_date)}</span>
                    </div>
                    <div className="profile-row">
                        <span>Ghi chú</span>
                        <span>{record.notes || 'Không có'}</span>
                    </div>
                    <div className="profile-row">
                        <span>Bác sĩ</span>
                        <span>{record.doctor?.user?.first_name} {record.doctor?.user?.last_name}</span>
                    </div>
                </div>  
            </div>
        ))}
    </div>
)}

                <button onClick={handleGoBack} className="back-btn">Quay lại</button>

            </div>
        </div>
    );
};

export default PatientProfile;
