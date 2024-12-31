import React from "react";
import StaffLayout from "../../layouts/StaffLayout";
import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";
import "./AddJobOrder.css"; // ไฟล์ CSS สำหรับกำหนดสไตล์เพิ่มเติม

const AddJobOrder = () => {
  return (
    <StaffLayout>
      <Container className="job-order-container mt-5">
        {/* ส่วนหัวของใบงาน */}
        <Card className="job-header">
          <Card.Body>
            <Row>
              <Col>
                <h4 className="job-number">No.PTN131124-01</h4>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ข้อมูลใบงาน */}
        <Card className="job-details my-4">
          <Card.Body>
            <Table bordered hover responsive>
              <tbody>
                <tr>
                  <td className="label">เลขที่ใบงาน:</td>
                  <td>PTN131124-01</td>
                </tr>
                <tr>
                  <td className="label">วันที่และเวลา:</td>
                  <td>13 พฤศจิกายน 2567 - 10:00 น.</td>
                </tr>
                <tr>
                  <td className="label">ผู้ส่ง:</td>
                  <td>บริษัท ฟัตธนะ ธานา จำกัด</td>
                </tr>
                <tr>
                  <td className="label">ชื่อเส้นทาง:</td>
                  <td>เส้นทางหลัก A</td>
                </tr>
                <tr>
                  <td className="label">จำนวนร้านค้า:</td>
                  <td>10 ร้านค้า</td>
                </tr>
                <tr>
                  <td className="label">วันที่ส่ง:</td>
                  <td>14 พฤศจิกายน 2567</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* ปุ่มการทำงาน */}
        <Row className="justify-content-end">
          <Col xs="auto">
            <Button variant="primary" className="edit-button me-2">
              Edit
            </Button>
            <Button variant="danger" className="delete-button">
              Delete
            </Button>
          </Col>
        </Row>
      </Container>
    </StaffLayout>
  );
};

export default AddJobOrder;


.job-order-container {
  max-width: 800px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.job-header {
  border-left: 4px solid #007bff;
  border-radius: 8px;
  margin-bottom: 20px;
}

.job-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: underline;
}

.job-details .label {
  font-weight: bold;
  color: #555;
}

.edit-button {
  background-color: #17a2b8;
  border: none;
}

.delete-button {
  background-color: #dc3545;
  border: none;
}

.edit-button:hover,
.delete-button:hover {
  opacity: 0.8;
}
