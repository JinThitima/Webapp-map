import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import "./DriverHome.css";
import { Link } from "react-router-dom";

function DriverHome() {
  return (
    <div className="full-screen-bg">
      <Container className="d-flex flex-column align-items-center justify-content-center">
        {/* Logo Banner */}

        <img src="/images/Logo.png" alt="PTN Logo" className="logo-image" />

        {/* Main Card Content */}
        <Card className="main-card text-center p-3">
          <Card.Body>
            {/* Profile Image */}
            <div className="d-flex justify-content-center align-items-center mb-4">
              <img
                src="/images/admin.png"
                alt="Profile"
                className="profile-image"
              />
            </div>

            {/* Driver Information */}
            <h4 className="mb-1">ลุงดำแดง แสงสีฟ้า (ลุงตุ๋)</h4>
            <p className="text-muted">
              รถยนต์ทะเบียน: 1กค5671 | เชื้อเพลิง: LPG
            </p>

            {/* License Plate Input */}
            <Form.Group controlId="formLicensePlate" className="mb-3">
              <Form.Label className="text-muted">
                กรุณากรอกเลขไมล์รถยนต์
              </Form.Label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white">
                    <FaCar />
                  </span>
                </div>
                <Form.Control type="text" placeholder="เลขไมล์รถยนต์" />
              </div>
            </Form.Group>

            {/* Image Upload */}
            <Form.Group controlId="formFileUpload" className="mb-4">
              <Form.Label className="text-muted">รูปภาพหน้าจอรถยนต์</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            {/* Start Delivery Button */}
            <Link to="/AcceptingWork" className="w-100 text-center">
              <Button variant="primary" size="lg" className="start-button">
                เริ่มต้นส่งสินค้า
              </Button>
            </Link>

            {/* Contact Information */}
            <p className="contact-info mt-3">ติดต่อผู้ดูแลระบบ 063-464-6665</p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DriverHome;
