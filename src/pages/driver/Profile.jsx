import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import DriverLayout from "../../layouts/DriverLayout";
import "./Profile.css"; // เพิ่ม CSS สำหรับการออกแบบที่ปรับใหม่

function Profile() {
  const user = {
    name: "นายสมชาย สังข์ศรี",
    username: "somchai123",
    status: "พนักงานขับรถ",
    nickname: "สมชาย",
    gender: "ชาย",
    email: "somchai@example.com",
    profilePicture: "./images/admin.png",
  };

  return (
    <DriverLayout>
      <Container className="mt-5">
        <h3 className="text-center mb-4">ข้อมูลส่วนตัว</h3>
        <Row className="justify-content-center my-4">
          {/* กรอบที่ 1 */}
          <Col lg={12} md={12} sm={12}>
            <Card className="profile-card shadow-lg border-0 rounded-3">
              <div className="profile-image-container d-flex justify-content-center align-items-center">
                {/* รูปภาพพนักงานขับรถ */}
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="profile-img rounded-circle"
                  width="150"
                  height="150"
                />
              </div>
              {/* ข้อมูลส่วนตัว */}
              <Card.Body>
                <h4 className="text-center">{user.name}</h4>
                <hr />
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>Username : </strong> {user.username}
                  </div>
                  <div>
                    <strong>สถานะ : </strong>
                    <Badge
                      bg={user.status === "Active" ? "success" : "secondary"}
                    >
                      {user.status}
                    </Badge>
                  </div>
                </div>
                <h5>ข้อมูลเพิ่มเติม</h5>
                <hr />
                <div>
                  <strong>ชื่อเล่น:</strong> {user.nickname}
                </div>
                <div>
                  <strong>เพศ:</strong> {user.gender}
                </div>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DriverLayout>
  );
}

export default Profile;
