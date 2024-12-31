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
import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa";

const AcceptingWork = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <DriverLayout>
      <Container className="mt-4">
        {/* หัวข้อ */}
        <h3 className="text-center mb-3">รายละเอียดการวิ่งงาน</h3>

        {/* วันที่ */}
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <span>
              <strong>วันที่:</strong> 12 พฤศจิกายน 2024
            </span>
          </Col>
        </Row>

        {/* กรอบแสดงข้อมูล */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <Row className="mb-3">
              <Col xs={12} className="text-center">
                <h5 className="fw-bold">
                  <strong>เลขที่ใบงาน:</strong> 123456
                </h5>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={6} className="text-center">
                <span>
                  <strong>เวลาคาดว่าจะเริ่มงาน:</strong> 08:00 น.
                </span>
              </Col>
              <Col xs={6} className="text-center">
                <span>
                  <strong>เวลาคาดว่าจะเสร็จงาน:</strong> 12:00 น.
                </span>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={6} className="text-center">
                <span>
                  <strong>สายวิ่งงาน:</strong> ลาดกระบัง
                </span>
              </Col>
              <Col xs={6} className="text-center">
                <span>
                  <strong>จำนวนร้านค้า:</strong> 14 ร้าน
                </span>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* รายละเอียดร้าน */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <Row className="mb-3">
              <Col xs={8}>
                <h6 className="fw-bold">
                  ลำดับที่: <span style={{ color: "#ff6f61" }}>1</span>
                </h6>
              </Col>
              <Col xs={4} className="text-end">
                <Link to="/Detail_Work">
                  <Button variant="info" className="rounded-pill px-4 py-2">
                    จัดส่ง
                  </Button>
                </Link>
              </Col>
            </Row>

            {/* รูปภาพและข้อมูลร้าน */}
            <Row className="mb-3">
              <Col xs={4} className="text-center">
                <img
                  src="/images/Store.png"
                  alt="Store"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #f1f1f1",
                  }}
                />
              </Col>
              <Col xs={8}>
                <h6 className="fw-bold mb-1" style={{ fontSize: "1rem" }}>
                  ชื่อร้าน: <span className="text-primary">ร้าน XYZ</span>
                  <Badge bg="info" className="ms-2">
                    ใหม่
                  </Badge>
                </h6>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>
                  <strong>ที่อยู่:</strong> 123 ถนน ABC, กรุงเทพฯ
                  <br />
                  <strong>เบอร์โทร:</strong> 081-234-5678
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ปุ่ม "จบงาน" */}
        <center>
          <Button
            variant="success"
            className="px-4 py-2 rounded-pill"
            style={{
              backgroundColor: "#28a745",
              borderColor: "#28a745",
            }}
            onClick={handleShow}
          >
            จัดส่งสำเร็จ
          </Button>
        </center>

        {/* Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>กรอกข้อมูลเพื่อเสร็จสิ้นใบงาน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
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
              <Form.Group controlId="formFileUpload" className="mb-3">
                <Form.Label className="text-muted">
                  รูปภาพหน้าจอรถยนต์
                </Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose} className="w-100">
              จัดส่งสำเร็จ
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </DriverLayout>
  );
};

export default AcceptingWork;
