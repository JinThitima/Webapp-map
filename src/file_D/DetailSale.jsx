import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Badge,
} from "react-bootstrap";
import StaffLayout from "../layouts/StaffLayout";

const DetailSale = () => {
  return (
    <StaffLayout>
      <Container className="mt-5">
        <Row className="my-4 mb-4 align-items-center">
          <Col md={6}>
            <h2
              className="main-title"
              style={{ fontWeight: "bold", color: "#2a33a1" }}
            >
              รายละเอียดพนักงานขาย
            </h2>
          </Col>
          <hr className="custom-hr" />
        </Row>

        {/* Profile Header */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={4} className="text-center">
                <Image
                  src="./images/admin.png"
                  alt="Salesperson Profile"
                  roundedCircle
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col md={8}>
                <h3 className="text-center text-md-start">ชื่อพนักงานขาย</h3>
                <h5 className="text-center text-md-start">
                  เขตพื้นที่การขาย: ภาคกลาง
                </h5>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Salesperson Information */}
        <Card className="shadow-sm mb-4">
          <Card.Header
            as="h4"
            style={{ backgroundColor: "#2a33a1", color: "#ffffff" }}
          >
            ข้อมูลเบื้องต้น
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>เบอร์ติดต่อ : </strong> 012-345-6789
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>อีเมล : </strong> sales@example.com
            </ListGroup.Item>
          </ListGroup>
        </Card>

        {/* Store Information */}
        <Card className="shadow-sm">
          <Card.Header
            as="h4"
            style={{ backgroundColor: "#2a33a1", color: "#ffffff" }}
          >
            ข้อมูลร้านค้า
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>ชื่อร้านค้า : </strong> ร้านค้ายอดนิยม
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>จำนวนร้านค้า : </strong> 50 ร้าน
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default DetailSale;
