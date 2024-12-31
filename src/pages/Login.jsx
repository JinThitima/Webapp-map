import React from "react";
import { Container, Row, Col, Form, Button,} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // สไตล์เพิ่มเติม
import { Link } from "react-router-dom";
import EmployeesService from "../server/Employee"; // เพิ่มการใช้งาน EmployeesService


const Login = () => {
    const handleForgotPassword = () => {
      alert(
        "หากท่านต้องการความช่วยเหลือในการเข้าระบบ กรุณาติดต่อเจ้าหน้าที่ฝ่ายสนับสนุนที่หมายเลข 02-123-4567"
      );
    };
  return (
    <div className="login-background">
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <div className="login-card p-4">
              <div className="text-center mb-4">
                <img
                  src="./images/Logo.png"
                  alt="Logo"
                  width="200"
                  height="180"
                  className="login-image"
                  style={{ display: "block", margin: "0 auto" }}
                />
                {/* <h2 className="text-center ">Login</h2>{" "} */}
              </div>
              {/* เปลี่ยนจาก "Login" เป็น "Staff Login" */}
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <br />
                {/* <Link to="/DriverHome" className="w-100 text-center"> */}
                <Link to="/StaffHome" className="w-100 text-center">
                  <Button
                    variant="outline-primary"
                    type="button"
                    className="w-100"
                  >
                    {" "}
                    {/* เปลี่ยน type เป็น "button" */}
                    Login
                  </Button>
                </Link>
              </Form>
              <div style={{ textAlign: "end", marginTop: "20px" }}>
                <Button
                  variant="link"
                  onClick={handleForgotPassword}
                  style={{
                    color: "grey",
                    textDecoration: "none",
                    border: "none",
                  }}
                >
                  แจ้งปัญหาการเข้าสู่ระบบ
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
