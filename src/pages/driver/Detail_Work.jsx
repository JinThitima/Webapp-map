import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  Modal,
} from "react-bootstrap";
import DriverLayout from "../../layouts/DriverLayout";
import { Link, useNavigate } from "react-router-dom"; // เปลี่ยนจาก useHistory เป็น useNavigate
import { FaCheckCircle } from 'react-icons/fa'; // ไอคอนการจัดส่งสำเร็จ

const DetailWork = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // ใช้ useNavigate แทน

  // ฟังก์ชันที่จะเรียกเมื่อคลิกปุ่มส่งสินค้าสำเร็จ
  const handleSendSuccess = () => {
    setShowModal(true); // แสดงป๊อปอัพ
    setTimeout(() => {
      setShowModal(false); // ซ่อนป๊อปอัพ
      navigate("/AcceptingWork"); // ใช้ navigate แทน history.push
    }, 3000); // 5 วินาที
  };

  return (
    <DriverLayout>
      <Container className="mt-5">
        {/* หัวข้อ */}
        <h3 className="text-center mb-4">รายละเอียดการจัดส่ง</h3>

        {/* รายละเอียดการวิ่งงาน */}
        <Row className="mb-4">
          <Col
            xs={12}
            className="d-flex justify-content-center align-items-center text-center"
          >
            <span>
              <strong>วันที่:</strong> 12 พฤศจิกายน 2024
            </span>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h5 className="fw-bold">
              <strong>เลขที่ใบงาน:</strong> 123456
            </h5>
          </Col>
        </Row>
        {/* กรอบแสดงข้อมูล */}
        <Card className="shadow-lg rounded-lg border-0 mb-4">
          <Card.Body>
            {/* เลขที่ใบงาน */}

            {/* รูปร้าน ชื่อร้าน ที่อยู่ เบอร์โทร */}
            <Row className="mb-3">
              <Col
                xs={4}
                sm={3}
                className="d-flex justify-content-center mb-3 mb-sm-0"
              >
                <img
                  src="/images/Store.png" // ใส่ URL รูปภาพของร้าน
                  alt="Store"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #f1f1f1", // ขอบที่สะอาดตา
                  }}
                />
              </Col>
              <Col xs={8} sm={9} className="d-flex align-items-center">
                <div>
                  <h6
                    className="fw-bold mb-1"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                  >
                    ชื่อร้าน: <span className="text-primary">ร้าน XYZ</span>
                    <Badge bg="info" className="ms-2">
                      ใหม่
                    </Badge>
                  </h6>
                  <p
                    className="mb-0"
                    style={{
                      color: "#555",
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                    }}
                  >
                    <strong>ที่อยู่ : </strong> 123 ถนน ABC, กรุงเทพฯ
                    <br />
                    <strong>เบอร์โทร : </strong> 081-234-5678
                    <br />
                    <strong>Map : </strong>
                    <a
                      href="https://maps.app.goo.gl/xvpgG8yF1EupxEt97"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ดูแผนที่ คลิกที่นี่
                    </a>
                  </p>
                </div>
              </Col>
            </Row>

            {/* อัปโหลดรูปภาพการจัดส่งสินค้า */}
            <Row className="mb-4">
              <Col xs={12} className="text-center">
                <h5 className="fw-bold mb-3">รูปภาพการจัดส่งสินค้า</h5>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <div key={index} className="position-relative">
                      <Form.Group controlId={`uploadImage${item}`}>
                        <Form.Control
                          type="file"
                          className="d-none"
                          id={`imageUpload${item}`}
                        />
                        <Button
                          variant="light"
                          className="rounded-circle"
                          onClick={() =>
                            document
                              .getElementById(`imageUpload${item}`)
                              .click()
                          }
                          style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            border: "2px dashed #007bff",
                            backgroundColor: "#f1f1f1",
                          }}
                        >
                          <span style={{ fontSize: "2rem", color: "#007bff" }}>
                            +
                          </span>
                        </Button>
                      </Form.Group>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            {/* ปุ่มส่งสินค้าสำเร็จ */}
            <Row className="mb-4">
              <Col xs={12} className="text-center">
                <Button
                  variant="success"
                  className="px-4 py-2 rounded-pill"
                  onClick={handleSendSuccess} // เรียกฟังก์ชันเมื่อคลิก
                  style={{
                    backgroundColor: "#28a745",
                    borderColor: "#28a745",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  ส่งสินค้าสำเร็จ
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* ป๊อปอัพการจัดส่งสำเร็จ */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        animation={true} // เพิ่มการเคลื่อนไหว
      >
        <Modal.Body
          className="text-center"
          style={{
            backgroundColor: "#eafaf1",
            borderRadius: "15px", // ขอบมน
            padding: "40px 30px", // เพิ่มพื้นที่ให้ดูสะอาดตา
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", // เงาเบาๆ
            transition: "all 0.3s ease-in-out", // การเคลื่อนไหวที่นุ่มนวล
          }}
        >
          {/* ไอคอนจัดส่งสำเร็จ */}
          <div
            style={{
              display: "flex",
              justifyContent: "center", // จัดตำแหน่งไอคอนในแนวนอน
              alignItems: "center", // จัดตำแหน่งไอคอนในแนวตั้ง
              fontSize: "5rem", // ขนาดไอคอนใหญ่ขึ้น
              color: "#28a745",
              marginBottom: "20px", // เพิ่มระยะห่างระหว่างไอคอนและข้อความ
              animation: "fadeIn 1s", // เพิ่มแอนิเมชั่นการแสดงผล
            }}
          >
            <FaCheckCircle />
          </div>

          {/* ข้อความ */}
          <h4
            className="text-success mt-3"
            style={{
              fontWeight: "bold",
              fontSize: "1.7rem", // ขนาดข้อความใหญ่ขึ้น
              textTransform: "uppercase", // ทำให้ข้อความใหญ่ขึ้นและตัวอักษรหนาขึ้น
              letterSpacing: "1px", // เพิ่มระยะห่างระหว่างตัวอักษร
              animation: "fadeIn 1.5s", // เพิ่มแอนิเมชั่นการแสดงผล
            }}
          >
            การจัดส่งสำเร็จ!
          </h4>
          <p
            className="text-success"
            style={{
              fontSize: "1.2rem",
              color: "#4b8c42",
              fontWeight: "500", // ทำให้ข้อความดูชัดเจนขึ้น
              animation: "fadeIn 2s", // เพิ่มแอนิเมชั่น
            }}
          >
            คุณจัดส่งสินค้าเรียบร้อยเเล้ว
          </p>
        </Modal.Body>
      </Modal>
    </DriverLayout>
  );
};

export default DetailWork;
