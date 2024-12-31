import React from "react";
import { Container, Row, Col, Card, ListGroup, Image } from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";

const DetailDriver = () => {
  return (
    <StaffLayout>
      <Container className="mt-4">
        <Row className="my-4 mb-4 align-items-center">
          <Col md={6}>
            <h2
              className="main-title"
              style={{ fontWeight: "bold", color: "#2a33a1" }}
            >
              รายละเอียดพนักงานขับรถ
            </h2>
          </Col>
          <hr className="custom-hr" />
        </Row>
        {/* Header */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={4} className="text-center">
                <Image
                  src="./images/admin.png"
                  alt="Driver Profile"
                  roundedCircle
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col md={8}>
                <h3 className="text-center text-md-start">ชื่อพนักงาน</h3>
                <h5 className="text-center text-md-start">นามสกุลพนักงาน</h5>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Driver Information */}
        <Card className="shadow-sm">
          <Card.Header
            as="h4"
            style={{ backgroundColor: "#2a33a1", color: "#ffffff" }}
          >
            ข้อมูลเบื้องต้น
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>UserName : </strong> driver_username{" "}
              {/* เปลี่ยนเป็นชื่อผู้ใช้ */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ชื่อพนักงาน : </strong> ชื่อจริง{" "}
              {/* เปลี่ยนเป็นชื่อจริง */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>นามสกุลพนักงาน:</strong> นามสกุล{" "}
              {/* เปลี่ยนเป็นนามสกุล */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ชื่อเล่น : </strong> ชื่อเล่น {/* เปลี่ยนเป็นชื่อเล่น */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>เบอร์ติดต่อ:</strong> 012-345-6789{" "}
              {/* เปลี่ยนเป็นหมายเลขโทรศัพท์ */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>อีเมล : </strong> email@example.com{" "}
              {/* เปลี่ยนเป็นอีเมล */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>รูปภาพใบขับขี่ : </strong>
              <Image
                src="./images/admin.png"
                alt="Driving License"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>สถานะผู้ใช้งาน : </strong>{" "}
              {/* สถานะผู้ใช้งาน (เช่น "Active", "Inactive") */}
              <span className="badge bg-success ms-2">Active</span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default DetailDriver;
