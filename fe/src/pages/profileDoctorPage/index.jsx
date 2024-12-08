import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import DoctorRepository from '../../api/indexDT'; // Import repo của bạn
import './styles.scss';

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [doctorId, setDoctorId] = useState(null); // State để lưu doctorId
    const [error, setError] = useState(null); // State để lưu lỗi nếu có

    // Lấy dữ liệu từ localStorage
    const user_name = localStorage.getItem('user_name') || '';
    const user_email = localStorage.getItem('user_email') || '';
    const user_phone = localStorage.getItem('user_phone') || '';
    const user_address = localStorage.getItem('user_address') || '';
    const user_id = localStorage.getItem('user_id'); // Lấy user_id

    useEffect(() => {
        const fetchDoctorId = async () => {
            if (!user_id) {
                setError('Không tìm thấy thông tin người dùng.');
                return;
            }
            try {
                const response = await DoctorRepository.getDoctorsByUserId(user_id);
                console.log('Doctor ID fetched:', response);
                if (response) {
                    setDoctorId(response);
                } else {
                    setError('Không tìm thấy doctor_id trong dữ liệu trả về');
                }
            } catch (error) {
                console.error('Error fetching doctor ID:', error);
                setError('Không thể lấy thông tin bác sĩ. Vui lòng thử lại!');
            }
        };

        fetchDoctorId();
    }, [user_id]);

    const handleSubmit = async (values) => {
        try {
            if (!doctorId) {
                message.error('Không tìm thấy doctor_id');
                return;
            }

            setLoading(true);

            // Cấu trúc lại dữ liệu theo yêu cầu
            const doctorData = {
                user: {
                    first_name: values.fullName.split(' ')[0], // Giả sử bạn tách first_name từ fullName
                    last_name: values.fullName.split(' ').slice(1).join(' '), // Phần còn lại là last_name
                    address: values.address,
                    phone: values.phone,
                },
                description: values.description || '', // Nếu bạn có thêm trường mô tả
                price: values.price, // Đặt giá mặc định nếu không có
                active: true, // Nếu có trường active
            };

            // Gọi API để cập nhật thông tin bác sĩ
            await DoctorRepository.updateDoctor(doctorId, doctorData);
            message.success('Thông tin của bạn đã được cập nhật');
            setLoading(false);

            // Sau khi cập nhật thành công, bạn có thể cập nhật lại localStorage nếu cần
            localStorage.setItem('user_name', values.fullName);
            localStorage.setItem('user_email', values.email);
            localStorage.setItem('user_phone', values.phone);
            localStorage.setItem('user_address', values.address);
        } catch (error) {
            setLoading(false);
            message.error('Có lỗi xảy ra khi cập nhật thông tin');
        }
    };

    return (
        <div className="profile-container">
            <h2>Thông Tin Người Dùng</h2>
            {error && <div className="error-message">{error}</div>}

            <Form
                name="user-profile"
                initialValues={{
                    email: user_email,
                    fullName: user_name,
                    address: user_address,
                    phone: user_phone,
                }}
                onFinish={handleSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Email là bắt buộc!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Họ và Tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Họ và tên là bắt buộc!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Địa chỉ là bắt buộc!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Số điện thoại là bắt buộc!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô Tả"
                    name="description"
                    rules={[{ required: true, message: 'Mô tả là bắt buộc!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: 'Giá là bắt buộc!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" block loading={loading} disabled={loading}>
                        Cập Nhật Thông Tin
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProfilePage;
