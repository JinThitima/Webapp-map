import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";

const AddCustomer = () => {
  return (
    <StaffLayout>
      <Container>
        {/* Modal สำหรับเพิ่มข้อมูลลูกค้า */}
        <Modal size="lg">
          <Modal.Header closeButton className="modal-header-add">
            <Modal.Title>เพิ่มข้อมูลลูกค้า</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerShopName">
                    <Form.Label>ชื่อร้านค้า</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCustomerOwnerFirstName">
                    <Form.Label>ชื่อเจ้าของร้าน</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerOwnerLastName">
                    <Form.Label>นามสกุลเจ้าของร้าน</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCustomerPhone">
                    <Form.Label>เบอร์ติดต่อ</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerLatitude">
                    <Form.Label>ละติจูด</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCustomerLongitude">
                    <Form.Label>ลองติจูด</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formCustomerAddress">
                <Form.Label>ที่อยู่</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>

              <Form.Group controlId="formCustomerMapUrl">
                <Form.Label>แผนที่ URL</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group controlId="formCustomerImage">
                <Form.Label>ภาพร้านค้า</Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              <Row className="mb-3">
                {/* ประเภทขนส่ง */}
                <Form.Group as={Col} controlId="transportType">
                  <Form.Label>ประเภทขนส่ง</Form.Label>
                  <Form.Select
                  // value={transportType}
                  // onChange={handleTransportTypeChange}
                  >
                    <option value="">-- กรุณาเลือกประเภทขนส่ง --</option>
                    <option value="company">รถบริษัท</option>
                    <option value="private">ขนส่งเอกชน</option>
                  </Form.Select>
                </Form.Group>
              </Row>
                          <br />
              <Row className="d-flex justify-content-center align-items-center mt-3">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "100%",
                    maxWidth: "400px",
                  }}
                >
                  <Button
                    variant="outline-secondary"

                    style={{
                      flex: "1",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      padding: "10px",
                    }}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    style={{
                      flex: "1",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      padding: "10px",
                    }}
                  >
                    บันทึกข้อมูล
                  </Button>
                </div>
              </Row>                          
            </Form>
          </Modal.Body>
        </Modal>
        <br />
      </Container>
    </StaffLayout>
  );
};

export default AddCustomer;
