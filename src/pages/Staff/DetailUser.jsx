import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import { BsPerson, BsFillPersonPlusFill } from "react-icons/bs";
import { useParams, NavLink } from "react-router-dom";
import EmployeesService from "../../server/Employee";

const DetailUser = () => {
  let params = useParams();
  let id = params.id;
  let [employee, setEmployee] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchEmployee = (id) => {
    EmployeesService.get(id)
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchEmployee(id);
  }, [id]);

  const handlePasswordEdit = () => {
    setShowModal(true);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMessage("รหัสผ่านใหม่ควรมีอย่างน้อย 8 ตัวอักษร");
      return;
    }
    EmployeesService.updatePassword(employee.id, { newPassword })
      .then(() => {
        setSuccessMessage("รหัสผ่านถูกเปลี่ยนเรียบร้อยแล้ว!");
        setTimeout(() => {
          setShowModal(false);
          resetForm();
        }, 1500);
      })
      .catch((error) => {
        setErrorMessage("เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
      });
  };
    const resetForm = () => {
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      setSuccessMessage("");
    };

  return (
    <StaffLayout>
      <Container className="mt-4">
        {/* Header */}
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
                <BsPerson
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                รายละเอียดผู้ใช้งาน
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
                    src={`../images/${employee.image_employee}`}
                    alt="admin"
                    style={{
                      width: "100%",
                      height: "100%",
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
                  {employee.name}
                </h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* User Information */}
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
              <strong>UserName : </strong> {employee.username}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email : </strong> {employee.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>เบอร์โทร : </strong> {employee.phone}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ประเภทผู้ใช้งาน: </strong>
              {employee.type}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>สถานะผู้ใช้งาน : </strong>
              {employee.status === "active"
                ? "พร้อมใช้งาน"
                : employee.status === "inactive"
                ? "ไม่พร้อมใช้งาน"
                : "ไม่ระบุสถานะ"}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-center">
                <strong>รหัสผ่าน: ********</strong>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handlePasswordEdit}
                >
                  แก้ไขรหัสผ่าน
                </Button>
              </div>
              {/* Modal */}
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>แก้ไขรหัสผ่าน</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {errorMessage && (
                    <Alert variant="danger">{errorMessage}</Alert>
                  )}
                  {successMessage && (
                    <Alert variant="success">{successMessage}</Alert>
                  )}
                  <Form>
                    <Form.Group controlId="newPassword" className="mb-3">
                      <Form.Label>รหัสผ่านใหม่</Form.Label>
                      <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" className="mb-3">
                      <Form.Label>ยืนยันรหัสผ่านใหม่</Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </Button>
                  <Button variant="primary" onClick={handleSavePassword}>
                    บันทึก
                  </Button>
                </Modal.Footer>
              </Modal>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default DetailUser;
