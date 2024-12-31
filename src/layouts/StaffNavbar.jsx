import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
  FaBell,
  FaTachometerAlt,
  FaTruck,
  FaBuilding,
  FaCar,
  FaUsers,
  FaUser,
  FaShippingFast,
  FaFileAlt,
  FaRoute,
  FaChartLine,
  FaMapMarkedAlt,
  FaGasPump,
  FaSignOutAlt,
} from "react-icons/fa";

import "./StaffNavbar.css"; // Add a CSS file for custom styles

function StaffNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Navbar className="text-white" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/StaffHome">
          <img
            src="../images/Logow.png"
            alt="Logo"
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
          >
            {/* <Nav.Item
              href="/StaffHome"
              className="d-flex align-items-center nav-link"
            >
              <FaTachometerAlt
                className="me-2"
                style={{ fontSize: "1.5rem" }}
              />
              Dashboard
            </Nav.Item> */}

            <Nav.Link
              href="/StaffUser"
              className=" me-4 d-flex align-items-center"
            >
              <FaUsers className="me-2" style={{ fontSize: "1.5rem" }} />
              จัดการผู้ใช้งาน
            </Nav.Link>

            <Nav.Link
              href="/Customer"
              className=" me-4 d-flex align-items-center"
            >
              <FaUsers className="me-2" style={{ fontSize: "1.5rem" }} />
              จัดการลูกค้า
            </Nav.Link>

            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <FaTruck className="me-2" style={{ fontSize: "1.5rem" }} />
                  จัดการรถส่งสินค้า
                </span>
              }
              id="manage-vehicles-dropdown"
              className="nav-dropdown"
            >
              <NavDropdown.Item
                href="/Car"
                className="d-flex align-items-center"
              >
                <FaBuilding className="me-2" style={{ fontSize: "1.5rem" }} />
                รถบริษัท
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/PrivateTransport"
                className="d-flex align-items-center"
              >
                <FaCar className="me-2" style={{ fontSize: "1.5rem" }} />
                รถขนส่งเอกชน
              </NavDropdown.Item>
            </NavDropdown>

            {/* <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <FaUsers className="me-2" style={{ fontSize: "1.5rem" }} />
                  จัดการผู้ใช้งาน
                </span>
              }
              id="manage-users-dropdown"
              className="nav-dropdown"
            >
              <NavDropdown.Item
                href="/StaffDriver"
                className="d-flex align-items-center"
              >
                <FaUser className="me-2" style={{ fontSize: "1.5rem" }} />
                พนักงานขับรถ
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/StaffUser"
                className="d-flex align-items-center"
              >
                <FaUser className="me-2" style={{ fontSize: "1.5rem" }} />
                ผู้ใช้งาน
              </NavDropdown.Item>
            </NavDropdown> */}

            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <FaShippingFast
                    className="me-2"
                    style={{ fontSize: "1.5rem" }}
                  />
                  จัดส่งสินค้า
                </span>
              }
              id="shipping-dropdown"
              className="nav-dropdown"
            >
              <NavDropdown.Item
                href="/DeliveryJobOrder"
                className="d-flex align-items-center"
              >
                <FaFileAlt className="me-2" style={{ fontSize: "1.5rem" }} />
                ใบงาน
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/GroupTransport"
                className="d-flex align-items-center"
              >
                <FaRoute className="me-2" style={{ fontSize: "1.5rem" }} />
                กลุ่มเส้นทางการขนส่ง
              </NavDropdown.Item>
            </NavDropdown>

            {/* <NavDropdown
              title={
                <span className="me-4 d-flex align-items-center">
                  <FaChartLine
                    className="me-2"
                    style={{ fontSize: "1.5rem" }}
                  />
                  รายงาน
                </span>
              }
              id="reports-dropdown"
              className="nav-dropdown"
            >
              <NavDropdown.Item
                href="/DeliveryReport"
                className="d-flex align-items-center"
              >
                <FaFileAlt className="me-2" style={{ fontSize: "1.5rem" }} />
                รายงานการจัดส่งสินค้า
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/DistanceReport"
                className="d-flex align-items-center"
              >
                <FaMapMarkedAlt
                  className="me-2"
                  style={{ fontSize: "1.5rem" }}
                />
                รายงานระยะทางวิ่งงาน
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/FuelReport"
                className="d-flex align-items-center"
              >
                <FaGasPump className="me-2" style={{ fontSize: "1.5rem" }} />
                รายงานเชื้อเพลิง
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>

          <div className="d-flex align-items-center">
            {/* <Nav.Link
              href="#notifications"
              className="me-3 d-flex align-items-center"
            >
              <FaBell className="me-1" />
            </Nav.Link> */}
            <NavDropdown
              className="me-3 d-flex align-items-center nav-link"
              id="user-dropdown"
              title={
                <img
                  src="./images/car.png" // URL ของภาพผู้ใช้งาน
                  alt="User Avatar"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                />
              }
            >
              <NavDropdown.Item href="/DetailUser">ดูโปรไฟล์</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              href="/"
              className="d-flex align-items-center nav-link"
              style={{ color: "#F2A900" }} // สี Sunny at Heart
            >
              <FaSignOutAlt style={{ fontSize: "1.5rem" }} />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default StaffNavbar;
