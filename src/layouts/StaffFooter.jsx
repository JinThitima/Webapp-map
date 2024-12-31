import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

function StaffFooter() {
  return (
    <footer className="bg-dark text-white py-4 text-center">
      <Container>
        <hr className="bg-white" />
        <Row>
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Pattanatana Company. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default StaffFooter;
