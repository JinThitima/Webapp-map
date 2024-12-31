import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button,
  Modal,
} from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import { BsShop, BsFillPersonPlusFill } from "react-icons/bs";
import { useParams, NavLink } from "react-router-dom";
import CustomersService from "../../server/Customer";

const DetailCustomer = () => {
  let params = useParams();
  let id = params.id;  
  let [customer, setCustomer] = useState({});  
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const fetchCustomer = (id) => {
    CustomersService.get(id)
      .then((res) => {
        setCustomer(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchCustomer(id);
  }, [id]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = selectedImage.split("/").pop();
    link.click();
  };

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
                <BsShop
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                รายละเอียดลูกค้า
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
        <Card
          className="mb-4 shadow-sm"
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <Card.Body className="py-3 px-4">
            <Row className="align-items-center">
              {/* Image Section */}
              <Col md={4} className="d-flex justify-content-center">
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid #4A90E2",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="../images/Store.png"
                    alt="customer"
                    style={{
                      width: "90%",
                      height: "90%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Col>

              {/* Text Section */}
              <Col md={8} className="text-center text-md-start">
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#2A2A2A",
                    marginBottom: "8px",
                  }}
                >
                  {customer.name}
                </h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Driver Information */}
        <Card className="shadow-sm">
          <Card.Header
            as="h4"
            style={{
              backgroundColor: "#007BFF", // สีฟ้า
              color: "#fff", // ข้อความสีขาว
              fontSize: "18px", // ขนาดฟอนต์หัวข้อ
              fontWeight: "bold", // หนักเพื่อเน้น
              borderRadius: "8px 8px 0 0", // มุมโค้งมนที่ด้านบน
            }}
          >
            ข้อมูลเบื้องต้น
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>ชื่อเจ้าของร้าน : </strong> {customer.contact_person}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ที่อยู่ : </strong> {customer.address}
              73000{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>เบอร์ติดต่อ : </strong> {customer.tel}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ละติจูด , ลองติจูด : </strong> {customer.lat} , {customer.long}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>แผนที่ : </strong>
              <a
                href={customer.map_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                ดูแผนที่
              </a>{" "}
              {/* เปลี่ยนเป็น URL แผนที่ที่ต้องการ */}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ประเภทขนส่ง : </strong> {customer.delivery_type}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ขนส่งเอกชน : </strong>
              {customer.delivery_type === "รถบริษัท"
                ? "ไม่มี"
                : customer.shipping_company}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>เส้นทางการขนส่ง : </strong> นครปฐม
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>

      {/* Modal for Image Enlargement */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>ดูภาพการจัดส่ง</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image
            src={selectedImage}
            alt="Enlarged Delivery Image"
            fluid
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
          <br />
          <Button className="mt-3" variant="success" onClick={handleDownload}>
            ดาวน์โหลดภาพ
          </Button>
        </Modal.Body>
      </Modal>
      <br />
    </StaffLayout>
  );
};

export default DetailCustomer;
