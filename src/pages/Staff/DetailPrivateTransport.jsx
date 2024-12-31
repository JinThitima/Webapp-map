import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import { FaTruck } from "react-icons/fa"; // FontAwesome truck icon
import Shipping_companiesService from "../../server/Shipping_companies"; // Ensure this is correct
import { useParams, NavLink } from "react-router-dom";

const DetailPrivateTransport = () => {
    let params = useParams();
    let id = params.id;
    let [shipping_companies, setShipping_companies] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

  const fetchShipping_companie = (id) => {
    Shipping_companiesService.get(id)
      .then((res) => {
        setShipping_companies(res.data.data);
      })
      .catch((e) => console.log(e));
  };

    useEffect(() => {
      fetchShipping_companie(id);
    }, [id]);

  return (
    <StaffLayout>
      <Container className="mt-4">
        <Row className="my-4 align-items-center">
          <Col md={12} className="text-center">
            <h2
              className="main-title"
              style={{
                fontWeight: "bold",
                fontSize: "2.5rem",
                color: "#4A90E2",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <FaTruck
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                จัดการข้อมูลขนส่งเอกชน
              </span>
            </h2>
            <hr
              style={{
                border: "none",
                height: "4px",
                background: "linear-gradient(90deg, #4A90E2, #56CCF2)",
                margin: "20px 0",
              }}
            />
          </Col>
        </Row>
        {/* Header */}
        <Card className="mb-4 shadow-sm">
          <Row className="align-items-center">
            <Col md={12}>
              <br />
              <h3 className="text-center text-md-center">
                {shipping_companies.name}
              </h3>{" "}
              <br />
              {/* เปลี่ยนเป็นชื่อขนส่งที่ต้องการ */}
            </Col>
          </Row>
        </Card>

        {/* Vehicle Information */}
        <Card className="shadow-sm">
          <Card.Header
            as="h4"
            style={{ backgroundColor: "#2a33a1", color: "#ffffff" }}
          >
            ข้อมูลเบื้องต้น
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>เบอร์โทร : </strong> {shipping_companies.tel}
              {/* เปลี่ยนเป็นหมายเลขโทรศัพท์ที่ต้องการ */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ที่อยู่ : </strong> {shipping_companies.address}
              {/* เปลี่ยนเป็นที่อยู่ที่ต้องการ */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>แผนที่ : </strong>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                ดูแผนที่
              </a>{" "}
              {/* เปลี่ยนเป็น URL แผนที่ที่ต้องการ */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ละติจูด :</strong> {shipping_companies.lat}
              {/* เปลี่ยนเป็นละติจูดที่ต้องการ */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ลองติจูด :</strong> {shipping_companies.long}
              {/* เปลี่ยนเป็นลองติจูดที่ต้องการ */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>กลุ่มเส้นทางการวิ่งงาน :</strong> เส้นทางที่ 1{" "}
              {/* รายการเส้นทางที่ต้องการแสดง */}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default DetailPrivateTransport;
