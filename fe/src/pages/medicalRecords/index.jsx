import React, { useEffect, useState } from 'react';
import './style.scss';
import NavigationSidebar from '../../components/NavigationSidebar';
import MedicalRecordRepository from '../../api/apiMedicalRecord';
import { useNavigate } from 'react-router-dom';  // Để sử dụng tính năng điều hướng

const PatientRecords = () => {
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
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const handleViewDetails = (recordId) => {
        navigate(`/medical-record/${recordId}`); // Điều hướng đến trang chi tiết hồ sơ bệnh án
    };

    return (
        <div className="patient-records">
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
                        <div className="table-container-medical">
                            <table className="medical-records-table">
                                <thead>
                                    <tr>
                                        <th>Mã Hồ Sơ</th>
                                        <th>Bệnh (Chẩn đoán)</th>
                                        <th>Ngày Hẹn</th>
                                        <th>Bác Sĩ</th>
                                        <th>Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicalRecords.map((record) => (
                                        <tr key={record.id}>
                                            <td>{record.id}</td>
                                            <td>{record.diagnosis || 'Không có'}</td>
                                            <td>{formatDate(record.start_date)}</td>
                                            <td>{`${record.doctor?.user?.first_name} ${record.doctor?.user?.last_name}`}</td>
                                            <td>
                                                <button onClick={() => handleViewDetails(record.id)} className="view-details-btn">Xem chi tiết</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientRecords;
