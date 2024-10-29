import React from 'react';
import { Form, Input, Button, Select, Radio, Row, Col } from 'antd';
import { ClockCircleOutlined, DollarOutlined, CalendarOutlined, LeftOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
import { APP_ROUTER } from '../../constants/appRouter';

const { Option } = Select;

const AppointmentDetails = () => {
    const handleFormSubmit = (values) => {
        console.log('Form values:', values);
        // Handle form submission logic here
    };

    return (
        <div className="appointment-details-container">
            <div className="appointment-box">
                <Row gutter={16}>
                    {/* Left Section: Doctor & Appointment Info */}
                    <Col xs={24} md={10} className="doctor-info">
                        <Link to={APP_ROUTER.BOOKAPOINT}>
                            <Button icon={<LeftOutlined />} type="link" className="back-button" />
                        </Link>
                        <div className="info-content">
                            <h3>Dr. Steven John</h3>
                            <p><ClockCircleOutlined /> 30 mins</p>
                            <p><DollarOutlined /> Fees: 450,000 VND</p>
                            <p><CalendarOutlined /> 02:30pm - 03:00pm, Thursday, August 10th</p>
                        </div>
                    </Col>

                    {/* Right Section: Patient Details Form */}
                    <Col xs={24} md={14} className="form-section">
                        <h2>Enter Details</h2>
                        <Form layout="vertical" onFinish={handleFormSubmit}>
                            <Form.Item
                                label="Patient's Name"
                                name="patientName"
                                rules={[{ required: true, message: "Please enter the patient's name!" }]}
                            >
                                <Input placeholder="Enter patient's name" />
                            </Form.Item>
                            <Form.Item
                                label="Contact Number"
                                name="contactNumber"
                                rules={[{ required: true, message: "Please enter your mobile number!" }]}
                            >
                                <Input addonBefore="+351" placeholder="Enter Mobile Number" />
                            </Form.Item>
                            <Form.Item
                                label="Problem"
                                name="problem"
                                rules={[{ required: true, message: "Please select a problem!" }]}
                            >
                                <Select placeholder="Select problem">
                                    <Option value="fever">Fever</Option>
                                    <Option value="cough">Cough</Option>
                                    <Option value="cold">Cold</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Payment Details" name="paymentMethod">
                                <Radio.Group defaultValue="paypal">
                                    <Radio value="paypal">Paypal</Radio>
                                    <Radio value="paytm">Paytm</Radio>
                                    <Radio value="creditcard">Credit Card</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Button type="primary" htmlType="submit" className="confirm-button">Confirm</Button>
            </div>
        </div>
    );
};

export default AppointmentDetails;
