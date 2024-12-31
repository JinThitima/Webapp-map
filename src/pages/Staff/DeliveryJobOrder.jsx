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
import StaffLayout from "../../layouts/StaffLayout";
import { Link } from "react-router-dom"; // สำหรับสร้างลิงค์
import { useNavigate } from "react-router-dom";

const DeliveryJobOrder = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobOrderToDelete, setJobOrderToDelete] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/AddJobOrder"); // เปลี่ยนเส้นทางไปยังหน้าที่คุณต้องการ
  };

  const handleEdit = () => {
    navigate("/EditJobOrder"); // เปลี่ยนเส้นทางไปยังหน้าที่คุณต้องการ
  };

  const handleShowModal = (jobOrder) => {
    setJobOrderToDelete(jobOrder);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setJobOrderToDelete(null);
  };

  const handleDelete = () => {
    // เพิ่มฟังก์ชันสำหรับลบใบงานที่เลือกที่นี่
    console.log(`ลบใบงาน: ${jobOrderToDelete}`);
    // ปิดป๊อปอัพหลังจากการลบ
    handleCloseModal();
  };

  return (
    <StaffLayout>
      <Container>
        <Row className="my-4 align-items-center">
          <Col md={6}>
            <h2 className="main-title" style={{ fontWeight: "bold" }}>
              ใบงานการส่งสินค้า
            </h2>
          </Col>
        </Row>
        <hr className="main-line" />

        <Row>
          <Col md={4}>
            <Form inline>
              <FormControl
                type="text"
                placeholder="ค้นหาใบงาน"
                className="mr-sm-2"
              />
            </Form>
          </Col>
          <Col md={8} className="text-right">
            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                className="d-flex align-items-center"
                onClick={handleNavigate}
              >
                <BsPlusCircle size={20} className="me-2" />
                เพิ่มใบงาน
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
                    วันที่สร้าง
                  </th>
                  <th style={{ width: "13%" }} className="text-center">
                    เลขที่ใบงาน
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    ชื่อเส้นทาง
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    จำนวนร้านค้า
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    ผู้ส่ง
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    รถที่ใช้ในการส่ง
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    วันที่จัดส่ง
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">2024-10-15</td>
                  <td className="text-center" style={{ fontWeight: "bold" }}>
                    <Link
                      to="/DetailJobOrder"
                      style={{ textDecoration: "none", color: "blue" }} // เปลี่ยนจาก "blue" เป็น "black"
                    >
                      PTN151067-01
                    </Link>
                  </td>
                  <td className="text-center">เส้นทาง A</td>
                  <td className="text-center">5</td>
                  <td className="text-center">นายสมชาย</td>
                  <td className="text-center">รถตู้</td>
                  <td className="text-center">2024-10-20</td>

                  <td>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="warning"
                        className="me-2 d-flex align-items-center"
                        onClick={handleEdit}
                      >
                        <BsPencilSquare className="me-2" />
                        แก้ไข
                      </Button>
                      <Button
                        variant="danger"
                        className="me-2 d-flex align-items-center"
                        onClick={() => handleShowModal("PTN151067-01")} // เปลี่ยนเลขที่ใบงานตามที่ต้องการ
                      >
                        <BsTrash className="me-2" />
                        ลบ
                      </Button>
                    </div>
                  </td>
                </tr>
                {/* ข้อมูลใบงานอื่น ๆ สามารถเพิ่มในนี้ */}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <br />

        {/* ป๊อปอัพสำหรับยืนยันการลบ */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>ยืนยันการลบ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            คุณแน่ใจหรือไม่ว่าต้องการลบใบงาน <strong>{jobOrderToDelete}</strong>
            ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              ยกเลิก
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              ลบ
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </StaffLayout>
  );
};

export default DeliveryJobOrder;
