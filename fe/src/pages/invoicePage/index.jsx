import React, { useRef } from "react";
import { Button } from "antd";
import {
    PhoneOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./styles.scss";

const InvoicePage = () => {
    const invoiceRef = useRef();

    const exportPDF = async () => {
        const element = invoiceRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice.pdf");
    };

    return (
        <div className="invoice-container">
            {/* Header */}
            <div ref={invoiceRef}>
                <div className="invoice-header">
                    <div className="logo">MEDDICAL</div>
                    <div className="contact-info">
                        <p>
                            <PhoneOutlined style={{ color: "#159EEC", marginRight: 5 }} />
                            <span style={{ color: "#1F2B6C" }}>EMERGENCY:</span>
                            <span style={{ color: "#159EEC" }}>(237) 681-812-255</span>
                        </p>
                        <p>
                            <ClockCircleOutlined style={{ color: "#159EEC", marginRight: 5 }} />
                            <span style={{ color: "#1F2B6C" }}>WORK HOUR:</span>
                            <span style={{ color: "#159EEC" }}>09:00 - 20:00 Everyday</span>
                        </p>
                        <p>
                            <EnvironmentOutlined style={{ color: "#159EEC", marginRight: 5 }} />
                            <span style={{ color: "#1F2B6C" }}>LOCATION:</span>
                            <span style={{ color: "#159EEC" }}>0123 Some Place</span>
                        </p>
                    </div>
                </div>

                <h1 className="invoice-title">HÓA ĐƠN</h1>

                {/* Patient Info */}
                <div className="patient-info">
                    <h2>Thông tin bệnh nhân</h2>
                    <p>Họ và tên: Đỗ Minh huy</p>
                    <p>Địa chỉ: 198 Nguyễn Lương Bằng</p>
                    <p>Số điện thoại: 0905656666</p>
                </div>

                {/* Service Description */}
                <div className="service-description">
                    <h2>Mô tả dịch vụ</h2>
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>Ngày hẹn</th>
                                <th>Mô tả</th>
                                <th>Chi phí</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10:00 29/11/2024</td>
                                <td>Bác sĩ Ngọc - Khoa chỉnh hình</td>
                                <td>500,000 VNĐ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Payment Summary */}
                <div className="payment-summary">
                    <div className="summary-row">
                        <span>Chi phí:</span>
                        <span>500,000 VNĐ</span>
                    </div>
                    <div className="summary-row">
                        <span>Thuế (10%):</span>
                        <span>50,000 VNĐ</span>
                    </div>
                    <div className="summary-row total">
                        <span>Tổng:</span>
                        <span>550,000 VNĐ</span>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="payment-info">
                    <h2>Thông tin thanh toán</h2>
                    <p>Hình thức: Ngân hàng</p>
                    <p>Tên tài khoản: 0813764329</p>
                    <p>Số thẻ: 0009999999999</p>
                </div>

                {/* Terms and Conditions */}
                <div className="terms">
                    <h2>Điều khoản và điều kiện</h2>
                    <p>+ Chính sách hủy đặt lịch: Hủy lịch hẹn trước 1 ngày so với ngày khám sẽ được hoàn tiền 100%.</p>
                    <p>+ Hủy lịch hẹn trong vòng 24 giờ trước thời điểm khám sẽ không được hoàn tiền.</p>
                    <p>+ Bệnh nhân có bất kỳ câu hỏi nào liên quan đến đơn này, xin vui lòng liên hệ với chúng tôi để được giải đáp.</p>
                </div>
            </div>

            {/* Button Export PDF */}
            <Button type="primary" onClick={exportPDF} className="export-pdf-button">
                Xuất PDF
            </Button>
        </div>
    );
};

export default InvoicePage;
