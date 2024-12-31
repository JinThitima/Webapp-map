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
import StaffLayout from "../layouts/StaffLayout";
import { Link } from "react-router-dom";

const Salesperson = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State สำหรับป๊อปอัพลบ
  const [editData, setEditData] = useState(null); // ใช้สำหรับเก็บข้อมูลที่จะแก้ไข
  const [deleteData, setDeleteData] = useState(null); // เก็บข้อมูลที่ต้องการลบ

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (data) => {
    setEditData(data);
    setShowEditModal(true);
  };
  const handleCloseEdit = () => setShowEditModal(false);

  const handleShowDelete = (data) => {
    setDeleteData(data);
    setShowDeleteModal(true);
  };
  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleDelete = () => {
    // ลบข้อมูลที่เลือกที่นี่
    handleCloseDelete();
  };


  return (
    <StaffLayout>
      <Container>
        <Row className="my-4 align-items-center">
          <Col md={6}>
            <h2 className="main-title" style={{ fontWeight: "bold" }}>
              ข้อมูลพนักงานขาย
            </h2>
          </Col>
        </Row>
        <hr className="main-line" />

        <Row>
          <Col md={4}>
            <Form inline>
              <FormControl
                type="text"
                placeholder="ค้นหาพนักงานขาย"
                className="mr-sm-2"
              />
            </Form>
          </Col>
          <Col md={8} className="text-right">
            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                className="d-flex align-items-center"
                onClick={handleShowAdd} // แสดงป๊อปอัพสำหรับเพิ่ม
              >
                <BsPlusCircle
                  size={20}
                  className="me-2"
                  style={{ fontSize: "1.5rem" }}
                />
                เพิ่มพนักงานขาย
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
                  <th style={{ width: "25%" }} className="text-center">
                    ชื่อพนักงานขาย
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    เขตพื้นที่การขาย
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    เบอร์ติดต่อ
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    อีเมล
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    จำนวนร้านค้า
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
                      src="./images/admin.png"
                      alt="พนักงานขาย"
                      style={{ width: "80px", height: "auto" }}
                      className="mx-auto"
                    />
                  </td>
                  <td>
                    <Link
                      to="/DetailSale"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      นางสาวจิราพร
                    </Link>
                  </td>
                  <td className="text-center">เหนือตอนล่าง</td>
                  <td className="text-center">089-123-4568</td>
                  <td className="text-center">jiraporn@example.com</td>
                  <td className="text-center">25</td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="warning"
                        className="me-2 d-flex align-items-center"
                        onClick={() =>
                          handleShowEdit({
                            /* ข้อมูลที่จะแก้ไข */
                          })
                        } // แสดงป๊อปอัพสำหรับแก้ไข
                      >
                        <BsPencilSquare className="me-2" />
                        แก้ไข
                      </Button>
                      <Button
                        variant="danger"
                        className="d-flex align-items-center"
                        onClick={() =>
                          handleShowDelete({
                            /* ข้อมูลที่ต้องการลบ */
                          })
                        } // แสดงป๊อปอัพสำหรับลบ
                      >
                        <BsTrash className="me-2" />
                        ลบ
                      </Button>
                    </div>
                  </td>
                </tr>
                {/* ข้อมูลพนักงานขายคนอื่น ๆ สามารถเพิ่มในนี้ */}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* ป๊อปอัพสำหรับเพิ่มพนักงานขาย */}
        <Modal show={showAddModal} onHide={handleCloseAdd}>
          <Modal.Header closeButton className="modal-header-add">
            <Modal.Title>เพิ่มพนักงานขาย</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>ชื่อพนักงานขาย</Form.Label>
                    <Form.Control type="text" placeholder="กรุณากรอกชื่อ" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formRegion">
                    <Form.Label>เขตพื้นที่การขาย</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรุณากรอกเขตพื้นที่"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPhone">
                    <Form.Label>เบอร์ติดต่อ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรุณากรอกเบอร์ติดต่อ"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control type="email" placeholder="กรุณากรอกอีเมล" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group controlId="formStores">
                    <Form.Label>จำนวนร้านค้า</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="กรุณากรอกจำนวนร้านค้า"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formImage">
                    <Form.Label>รูปภาพ</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseAdd}>
              ปิด
            </Button>
            <Button variant="outline-primary" onClick={handleCloseAdd}>
              บันทึกข้อมูล
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ป๊อปอัพสำหรับแก้ไขพนักงานขาย */}
        <Modal show={showEditModal} onHide={handleCloseEdit}>
          <Modal.Header closeButton className="modal-header-edit">
            <Modal.Title>แก้ไขพนักงานขาย</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>ชื่อพนักงานขาย</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรุณากรอกชื่อ"
                      defaultValue={editData?.name} // ใช้ defaultValue หากมีข้อมูลที่จะแก้ไข
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formRegion">
                    <Form.Label>เขตพื้นที่การขาย</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรุณากรอกเขตพื้นที่"
                      defaultValue={editData?.region} // ใช้ defaultValue หากมีข้อมูลที่จะแก้ไข
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPhone">
                    <Form.Label>เบอร์ติดต่อ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรุณากรอกเบอร์ติดต่อ"
                      defaultValue={editData?.phone} // ใช้ defaultValue หากมีข้อมูลที่จะแก้ไข
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="กรุณากรอกอีเมล"
                      defaultValue={editData?.email} // ใช้ defaultValue หากมีข้อมูลที่จะแก้ไข
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formStores">
                    <Form.Label>จำนวนร้านค้า</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="กรุณากรอกจำนวนร้านค้า"
                      defaultValue={editData?.stores} // ใช้ defaultValue หากมีข้อมูลที่จะแก้ไข
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formImage">
                    <Form.Label>รูปภาพ</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseEdit}>
              ปิด
            </Button>
            <Button variant="outline-warning" onClick={handleCloseEdit}>
              บันทึกการเปลี่ยนแปลง
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ป๊อปอัพสำหรับยืนยันการลบพนักงานขาย */}
        <Modal show={showDeleteModal} onHide={handleCloseDelete}>
          <Modal.Header closeButton className="modal-header-delete">
            <Modal.Title>ยืนยันการลบ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>คุณแน่ใจหรือว่าต้องการลบพนักงานขายนี้?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              ยกเลิก
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              ยืนยันการลบ
            </Button>
          </Modal.Footer>
        </Modal>
        <br />
      </Container>
    </StaffLayout>
  );
};

export default Salesperson;
