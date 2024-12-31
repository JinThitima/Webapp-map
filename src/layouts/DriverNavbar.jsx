import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Modal,
  Button,
} from "react-bootstrap";
import { FaHome, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./DriverNavbar.css"; // Add a CSS file for custom styles

function DriverNavbar() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Navbar
      style={{ backgroundColor: "#78b7c6" }} // ใช้โทนสีที่เป็นมิตรกับการใช้งาน
      variant="dark"
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="/AcceptingWork">
          <img
            src="./images/LogoDark.png"
            alt="Company Logo"
            width="150"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            style={{ flex: 9, justifyContent: "center" }}
          ></Nav>
          <Nav>
            <Nav.Link
              href="/AcceptingWork"
              className="d-flex align-items-center nav-link"
              style={{ color: "#ffffff" }}
            >
              <FaHome style={{ fontSize: "2rem" }} />
            </Nav.Link>
            <NavDropdown
              className="me-3 d-flex align-items-center nav-link"
              id="user-dropdown"
              title={
                <FaUserCircle style={{ fontSize: "2rem", color: "#fff" }} />
              }
            >
              <NavDropdown.Item href="/Profile">
                ดูข้อมูลส่วนตัว
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleShow}>
                แก้ไขข้อมูลส่วนตัว
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              href="/"
              className="d-flex align-items-center nav-link"
              style={{ color: "#ffffff" }}
            >
              <FaSignOutAlt style={{ fontSize: "1.5rem" }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Modal for edit profile notification */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>แจ้งเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          หากคุณต้องการแก้ไขข้อมูลส่วนตัว กรุณาติดต่อเจ้าหน้าที่ที่ดูแลระบบ
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default DriverNavbar;
