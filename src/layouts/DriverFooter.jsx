import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

function DriverFooter() {
  return (
    <footer
      style={{ backgroundColor: "#78b7c6" }} // ใช้โทนสี Boy Scout Blue
      variant="dark"
      expand="lg"
    >
      <Container>
        <hr className="bg-white" />
        <Row>
          <Col className="text-center">
            <p style={{ color: "#ffffff" }}>
              &copy; {new Date().getFullYear()} Pattanatana Company. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default DriverFooter;
