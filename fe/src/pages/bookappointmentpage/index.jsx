import React from "react";
import { Form, Input, Button, Select, Row, Col, DatePicker, TimePicker } from "antd";
import { ClockCircleOutlined, HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import "./style.scss"; // Import SCSS
import { Color } from "antd/es/color-picker";
import { Link } from "react-router-dom";

const { Option } = Select;

const AppointmentPage = () => {

    return (
        <div className="appointment-container">
            <Row gutter={16}>
                {/* Appointment Form */}
                <Col xs={24} md={12}>
                    <div className="appointment-form">
                        <h2>Book an Appointment</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
                        </p>
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Name">
                                        <Input placeholder="Enter your name" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Gender">
                                        <Select placeholder="Select gender">
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Email">
                                        <Input placeholder="Enter your email" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Phone">
                                        <Input placeholder="Enter your phone number" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Date">
                                        <DatePicker className="full-width" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Time">
                                        <TimePicker className="full-width" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Doctor">
                                        <Select placeholder="Select a doctor">
                                            <Option value="dr_smith">Dr. Smith</Option>
                                            <Option value="dr_jones">Dr. Jones</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Department">
                                        <Select placeholder="Select a department">
                                            <Option value="cardiology">Cardiology</Option>
                                            <Option value="neurology">Neurology</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Message">
                                <Input.TextArea rows={4} placeholder="Enter your message" />
                            </Form.Item>

                            <Form.Item>
                                <Link to="/detailappointment">
                                    <Button type="primary" htmlType="submit" className="submit-button" >
                                        Submit
                                    </Button>
                                </Link>
                            </Form.Item>

                        </Form>
                    </div>
                </Col>

                <Col xs={24} md={12}>
                    <div className="schedule-info">
                        <h2>Schedule hours</h2>
                        <ul>
                            <li>Monday — 09:00 AM - 07:00 PM</li>
                            <li>Tuesday — 09:00 AM - 07:00 PM</li>
                            <li>Wednesday — 09:00 AM - 07:00 PM</li>
                            <li>Thursday — 09:00 AM - 07:00 PM</li>
                            <li>Friday — 09:00 AM - 07:00 PM</li>
                            <li>Saturday — 09:00 AM - 07:00 PM</li>
                            <li>Sunday — Closed</li>
                        </ul>
                        <div className="emergency-info">
                            <PhoneOutlined />
                            <h3>Emergency</h3>
                            <p>(237) 681-812-255</p>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Map and Contact Info */}
            <div className="map-contact-section">
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9478096744414!2d-74.0060153!3d40.7127754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQyJzQ0LjAiTiA3NMKwMDAnMjAuMCJX!5e0!3m2!1sen!2sus!4v1634126184135!5m2!1sen!2sus"
                        width="100%"
                        height="350"
                        allowFullScreen=""
                        loading="lazy"
                    />
                </div>
                <div className="slogan">
                    <h1>Get in touch</h1>
                    <a>Contact</a>
                </div>

                <div className="contact-info">
                    <Row gutter={16}>
                        <Col xs={24} md={6}>
                            <div className="contact-item">
                                <PhoneOutlined />
                                <h3>Emergency</h3>
                                <p>(237) 681-812-255</p>
                                <p>(237) 666-331-894</p>
                            </div>
                        </Col>
                        <Col xs={24} md={6}>
                            <div className="contact-item">
                                <HomeOutlined />
                                <h3>Location</h3>
                                <p>0373 Some place</p>
                                <p>9876 Some country</p>
                            </div>
                        </Col>
                        <Col xs={24} md={6}>
                            <div className="contact-item">
                                <MailOutlined />
                                <h3>Email</h3>
                                <p>fildineesoe@gmail.com</p>
                                <p>myebstudio@gmail.com</p>
                            </div>
                        </Col>
                        <Col xs={24} md={6}>
                            <div className="contact-item">
                                <ClockCircleOutlined />
                                <h3>Working Hours</h3>
                                <p>Mon-Sat: 08:00 - 20:00</p>
                                <p>Sunday: Emergency only</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    );
};

export default AppointmentPage;
