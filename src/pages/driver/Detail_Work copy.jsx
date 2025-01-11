import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Delivery success icon
import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import CustomersService from "../../server/Customer";

const DetailWork = () => {
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

  // Function to handle the success button
  const handleSendSuccess = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate("/AcceptingWork"); // Redirect after 3 seconds
    }, 3000);
  };

  return (
    <DriverLayout>
      <Container className="mt-2">
        {/* Title */}
        <Row className="my-4 d-flex justify-content-center">
          <Col md={12} className="text-center">
            <h2
              className="main-title"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaUser style={{ marginRight: "10px" }} />
              รายละเอียดลูกค้า
            </h2>
          </Col>
        </Row>
        {/* Delivery Details */}
        <Card className="shadow-lg rounded-lg border-0 mb-4">
          <Card.Body>
            {/* Store Info */}
            <Row className="mb-4">
              <Col
                xs={4}
                sm={3}
                className="d-flex justify-content-center mb-3 mb-sm-0"
              >
                <img
                  src="/images/Store.png"
                  alt="Store"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #f1f1f1",
                  }}
                />
              </Col>
              <Col xs={8} sm={9} className="d-flex align-items-center">
                <div>
                  <h6
                    className="fw-bold mb-1"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                  >
                    {" "}
                    <span className="text-primary">{customer.name}</span>
                    <Badge bg="info" className="ms-2">
                      ใหม่
                    </Badge>
                  </h6>
                  <p
                    className="mb-0"
                    style={{
                      color: "#555",
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <FaMapMarkerAlt style={{ marginRight: "10px" }} />
                      <strong>{customer.address}</strong>
                    </span>
                  </p>
                  <p
                    className="mb-0"
                    style={{
                      color: "#555",
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <FaPhone style={{ marginRight: "10px" }} />
                      <strong>{customer.tel}</strong>
                    </span>
                  </p>
                </div>
              </Col>
            </Row>

            {/* Upload Delivery Images */}
            <Row className="mb-4">
              <Col xs={12} className="text-center">
                <h5 className="fw-bold mb-3" style={{ color: "#333" }}>
                  รูปภาพการจัดส่งสินค้า
                </h5>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className="position-relative">
                      <Form.Group
                        controlId={`uploadImage${item}`}
                        className="upload-container"
                      >
                        <Form.Control
                          type="file"
                          className="d-none"
                          id={`imageUpload${item}`}
                          onChange={(e) => {
                            // แสดงภาพที่ถูกเลือก
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const imagePreview = document.getElementById(
                                `imagePreview${item}`
                              );
                              imagePreview.src = reader.result;
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <div
                          onClick={() =>
                            document
                              .getElementById(`imageUpload${item}`)
                              .click()
                          }
                          className="image-upload-box d-flex justify-content-center align-items-center"
                        >
                          <span style={{ fontSize: "2rem", color: "#007bff" }}>
                            +
                          </span>
                        </div>
                        {/* แสดงภาพตัวอย่างหลังการเลือก */}
                        <img
                          id={`imagePreview${item}`}
                          src=""
                          alt={`Preview ${item}`}
                          className="img-preview"
                        />
                      </Form.Group>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            {/* Success Button */}
            <Row className="mb-4">
              <Col xs={12} className="text-center">
                <Button
                  variant="success"
                  className="px-4 py-2 rounded-pill"
                  onClick={handleSendSuccess}
                  style={{
                    backgroundColor: "#28a745",
                    borderColor: "#28a745",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  ส่งสินค้าสำเร็จ
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Success Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        animation
      >
        <Modal.Body
          className="text-center"
          style={{
            backgroundColor: "#eafaf1",
            borderRadius: "15px",
            padding: "40px 30px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "5rem",
              color: "#28a745",
              marginBottom: "20px",
            }}
          >
            <FaCheckCircle />
          </div>
          <h4
            className="text-success mt-3"
            style={{
              fontWeight: "bold",
              fontSize: "1.7rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            การจัดส่งสำเร็จ!
          </h4>
          <p
            className="text-success"
            style={{ fontSize: "1.2rem", color: "#4b8c42", fontWeight: "500" }}
          >
            คุณจัดส่งสินค้าเรียบร้อยเเล้ว
          </p>
        </Modal.Body>
      </Modal>
    </DriverLayout>
  );
};

export default DetailWork;
