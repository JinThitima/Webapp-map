import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  FormControl,
  Card,
  Modal,
} from "react-bootstrap";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import "./Staff.css";
import StaffLayout from "../../layouts/StaffLayout";
import { Link } from "react-router-dom"; // สำหรับสร้างลิงค์

const StaffDriver = () => {
  // State สำหรับควบคุม Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null); // เก็บข้อมูลพนักงานที่เลือก

  // ฟังก์ชันเปิด/ปิด Modal
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (driver) => {
    setSelectedDriver(driver);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDeleteModal = (driver) => {
    setSelectedDriver(driver);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  return (
    <StaffLayout>
      <Container>
        <Row className="my-4 align-items-center">
          <Col md={6}>
            <h2 className="main-title" style={{ fontWeight: "bold" }}>
              ข้อมูลพนักงานขับรถ
            </h2>
          </Col>
        </Row>
        <hr className="main-line" />

        <Row>
          <Col md={4}>
            <Form inline>
              <FormControl
                type="text"
                placeholder="ค้นหาพนักงานขับรถ"
                className="mr-sm-2"
              />
            </Form>
          </Col>
          <Col md={8} className="text-right">
            <div className="d-flex justify-content-end">
              <Button
                className="btn btn-primary d-flex align-items-center"
                onClick={handleShowAddModal}
              >
                <BsPlusCircle
                  size={20}
                  className="me-2"
                  style={{ fontSize: "1.5rem" }}
                />
                เพิ่มพนักงาน
              </Button>
            </div>
          </Col>
        </Row>
        <br />
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: "10%" }} className="text-center">
                    รูปภาพ
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    ชื่อพนักงาน
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    เบอร์ติดต่อ
                  </th>
                  <th style={{ width: "25%" }} className="text-center">
                    อีเมล
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    สถานะการใช้งาน
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    <img
                      src="./images/admin.png" // แทนที่ด้วย URL หรือ path ของภาพ
                      alt="พนักงาน"
                      style={{ width: "80px", height: "auto" }}
                      className="mx-auto"
                    />
                  </td>
                  <td>
                    <Link
                      to="/DetailDriver"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      นายสมหมาย มานะดี
                    </Link>
                  </td>
                  <td className="text-center">089-123-4567</td>
                  <td className="text-center">sommai@example.com</td>
                  <td className="text-center">
                    <span style={{ color: "green" }}>พร้อมใช้งาน</span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="warning"
                        className="me-2 d-flex align-items-center"
                        onClick={() =>
                          handleShowEditModal({
                            name: "นายสมหมาย มานะดี",
                            phone: "089-123-4567",
                            email: "sommai@example.com",
                            licenseType: "ท.2",
                            status: "พร้อมใช้งาน",
                          })
                        }
                      >
                        <BsPencilSquare
                          className="me-2"
                          style={{ fontSize: "1.5rem" }}
                        />
                        แก้ไข
                      </Button>
                      <Button
                        variant="danger"
                        className="d-flex align-items-center"
                        onClick={() =>
                          handleShowDeleteModal({
                            name: "นายสมหมาย มานะดี",
                          })
                        }
                      >
                        <BsTrash
                          className="me-2"
                          style={{ fontSize: "1.5rem" }}
                        />
                        ลบ
                      </Button>
                    </div>
                  </td>
                </tr>
                {/* ข้อมูลพนักงานคนอื่น ๆ สามารถเพิ่มในนี้ */}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* ป๊อปอัพ Modal สำหรับเพิ่มข้อมูล */}
        <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg">
          <Modal.Header closeButton className="modal-header-add">
            <Modal.Title>เพิ่มพนักงาน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text" placeholder="กรอก UserName" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>ชื่อพนักงาน</Form.Label>
                    <Form.Control type="text" placeholder="กรอกชื่อพนักงาน" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formSurname">
                    <Form.Label>นามสกุลพนักงาน</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรอกนามสกุลพนักงาน"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formNickname">
                    <Form.Label>ชื่อเล่น</Form.Label>
                    <Form.Control type="text" placeholder="กรอกชื่อเล่น" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPhone" className="mt-3">
                    <Form.Label>เบอร์ติดต่อ</Form.Label>
                    <Form.Control type="text" placeholder="กรอกเบอร์ติดต่อ" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control type="email" placeholder="กรอกอีเมล" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formCarImage">
                    <Form.Label>อัพโหลดรูปภาพพนักงาน</Form.Label>
                    <Form.Control
                      type="file"
                      name="carImage"
                      accept="image/*"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formCarImage">
                    <Form.Label>อัพโหลดรูปภาพใบขับขี่</Form.Label>
                    <Form.Control
                      type="file"
                      name="carImage"
                      accept="image/*"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formStatus" className="mt-3">
                    <Form.Label>สถานะผู้ใช้งาน</Form.Label>
                    <Form.Control as="select">
                      <option value="พร้อมใช้งาน">พร้อมใช้งาน</option>
                      <option value="ไม่พร้อมใช้งาน">ไม่พร้อมใช้งาน</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseAddModal}>
              ยกเลิก
            </Button>
            <Button variant="outline-primary" onClick={handleCloseAddModal}>
              บันทึกข้อมูล
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ป๊อปอัพ Modal สำหรับแก้ไขข้อมูล */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
          <Modal.Header closeButton className="modal-header-edit">
            <Modal.Title>แก้ไขพนักงาน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text" placeholder="กรอกชื่อพนักงาน" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>ชื่อพนักงาน</Form.Label>
                    <Form.Control type="text" placeholder="กรอกชื่อพนักงาน" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formSurname">
                    <Form.Label>นามสกุลพนักงาน</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรอกนามสกุลพนักงาน"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formNickname">
                    <Form.Label>ชื่อเล่น</Form.Label>
                    <Form.Control type="text" placeholder="กรอกชื่อเล่น" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPhone" className="mt-3">
                    <Form.Label>เบอร์ติดต่อ</Form.Label>
                    <Form.Control type="text" placeholder="กรอกเบอร์ติดต่อ" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control type="email" placeholder="กรอกอีเมล" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formCarImage">
                    <Form.Label>อัพโหลดรูปภาพพนักงาน</Form.Label>
                    <Form.Control
                      type="file"
                      name="carImage"
                      accept="image/*"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formCarImage">
                    <Form.Label>อัพโหลดรูปภาพใบขับขี่</Form.Label>
                    <Form.Control
                      type="file"
                      name="carImage"
                      accept="image/*"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formStatus" className="mt-3">
                    <Form.Label>สถานะผู้ใช้งาน</Form.Label>
                    <Form.Control as="select">
                      <option value="พร้อมใช้งาน">พร้อมใช้งาน</option>
                      <option value="ไม่พร้อมใช้งาน">ไม่พร้อมใช้งาน</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseEditModal}>
              ยกเลิก
            </Button>
            <Button variant="outline-warning" onClick={handleCloseEditModal}>
              บันทึกการเปลี่ยนแปลง
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ป๊อปอัพ Modal สำหรับลบข้อมูล */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>ยืนยันการลบพนักงาน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            คุณแน่ใจหรือไม่ว่าต้องการลบ {selectedDriver?.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              ยกเลิก
            </Button>
            <Button variant="danger" onClick={handleCloseDeleteModal}>
              ยืนยันการลบ
            </Button>
          </Modal.Footer>
        </Modal>
        <br />
      </Container>
    </StaffLayout>
  );
};

export default StaffDriver;
