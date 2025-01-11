import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // สไตล์เพิ่มเติม
import { useNavigate } from "react-router-dom"; // สำหรับการเปลี่ยนเส้นทาง
import EmployeesService from "../server/Employee";
import Swal from "sweetalert2";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนเส้นทาง

     const handleChange = (e) => {
       const { name, value } = e.target;
       setLoginData({ ...loginData, [name]: value });
     }; 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await EmployeesService.login(loginData);

      // ตรวจสอบว่ามี data และ employee อยู่ใน response
      if (res.data && res.data.data && res.data.data.employee) {
        const employee = res.data.data.employee;
        const token = res.data.data.token;

        // เก็บ token ลง localStorage
        localStorage.setItem("token", token);

        // ตรวจสอบ type ของพนักงาน
        const userRole = employee.type;
        console.log("Employee data:", employee);

        // แจ้งเตือน และเปลี่ยนเส้นทางตาม userRole
        switch (userRole) {
          case "เจ้าหน้าที่ประสานงานขนส่ง":
            Swal.fire({
              icon: "success",
              title: "เข้าสู่ระบบ",
              text: "ยินดีต้อนรับเข้าสู่ระบบ",
              timer: 1000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            navigate("/StaffHome");
            break;

          case "พนักงานขับรถส่งสินค้า":
            Swal.fire({
              icon: "success",
              title: "เข้าสู่ระบบ",
              text: "ยินดีต้อนรับเข้าสู่ระบบ",
              timer: 1000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            navigate("/DriverHome");
            break;

          default:
            Swal.fire({
              icon: "warning",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่มีสิทธิ์ในการเข้าถึง",
              showConfirmButton: true,
            });
            break;
        }
      } else {
        throw new Error("รูปแบบข้อมูลที่ได้รับไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Login Error:", error);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "โปรดใส่ username และ password ให้ถูกต้อง",
        showConfirmButton: false,
        timer: 1000,
      });
    } finally {
      setLoading(false);
    }
  };


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
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Username"
                    name="username"
                    value={loginData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br />
                {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
                {/* <Button
                  variant="outline-primary"
                  type="button"
                  className="w-100"
                
                >
                  Login
                </Button> */}
                <center>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "LOG IN"}
                </button>
                </center>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
