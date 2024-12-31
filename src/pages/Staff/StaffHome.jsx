import React from "react";
import { Container, Card, Row, Col, Table, Button } from "react-bootstrap";
import {
  FaClipboardList,
  FaTruck,
  FaUsers,
  FaRoad,
  FaCar,
} from "react-icons/fa"; // นำเข้าคอลเลคชันไอคอนจาก react-icons
import StaffLayout from "../../layouts/StaffLayout";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom
import "./Car.css"; // นำเข้าไฟล์ CSS เพื่อปรับแต่งเพิ่มเติม

const StaffHome = () => {
  // กำหนดข้อมูลสถิติต่างๆ สำหรับการ์ด
  const stats = [
    {
      title: "ใบงานทั้งหมด",
      value: "20 ใบ",
      subtitle: "รวมใบงานของเราทั้งหมด",
      icon: <FaClipboardList size={100} className="icon-style" />,
      color: "linear-gradient(135deg, #1e3c72, #2a5298)",
      link: "/DeliveryJobOrder", // ลิงค์ไปยังหน้าใบงานทั้งหมด
    },
    {
      title: "รถส่งสินค้า",
      value: "5 คัน",
      subtitle: "รถส่งสินค้าภายในของเราทั้งหมด",
      icon: <FaTruck size={100} className="icon-style" />,
      color: "linear-gradient(135deg, #6a11cb, #2575fc)",
      link: "/Car", // ลิงค์ไปยังหน้ารถส่งสินค้า
    },
    {
      title: "ลูกค้าของเรา",
      value: "0 ราย",
      subtitle: "รวมลูกค้าของเราทั้งหมด",
      icon: <FaUsers size={100} className="icon-style" />,
      color: "linear-gradient(135deg, #11998e, #38ef7d)",
      link: "/Customer", // ลิงค์ไปยังหน้าลูกค้า
    },
    {
      title: "เส้นทางการขนส่ง",
      value: "0 เส้น",
      subtitle: "รวมเส้นทางการขนส่งของเราทั้งหมด",
      icon: <FaRoad size={100} className="icon-style" />,
      color: "linear-gradient(135deg, #2b5876, #4e4376)",
      link: "/GroupTransport", // ลิงค์ไปยังหน้าเส้นทางการขนส่ง
    },
    {
      title: "รถขนส่งเอกชน",
      value: "0 ราย",
      subtitle: "รวมรถขนส่งเอกชนที่ใช้งานทั้งหมด",
      icon: <FaCar size={100} className="icon-style" />,
      color: "linear-gradient(135deg, #f12711, #f5af19)",
      link: "/PrivateTransport", // ลิงค์ไปยังหน้ารถขนส่งเอกชน
    },
  ];

  return (
    <StaffLayout>
      <Container className="mt-4">
        <Row>
          {stats.map((stat, index) => (
            <Col key={index} md={4} className="mb-4">
              <Link to={stat.link} style={{ textDecoration: "none" }}>
                <Card className="stat-card" style={{ background: stat.color }}>
                  <Card.Body
                    className="d-flex align-items-center"
                    style={{ color: "white" }}
                  >
                    <div className="icon-container">{stat.icon}</div>
                    <div className="ml-auto text-right">
                      <Card.Title
                        className="mt-2 card-title"
                        style={{ color: "white" }}
                      >
                        {stat.title}
                      </Card.Title>
                      <Card.Text
                        className="stat-value"
                        style={{ color: "white" }}
                      >
                        {stat.value}
                      </Card.Text>
                      <Card.Text
                        className="stat-subtitle"
                        style={{ color: "white" }}
                      >
                        {stat.subtitle}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <Card className="recent-orders-card">
          <Card.Body>
            <Card.Title>Recent WorkJob</Card.Title>
            <br />
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: "13%" }} className="text-center">
                    เลขที่ใบงาน
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    ชื่อเส้นทาง
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    จำนวนร้านค้า
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    ผู้ส่ง
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    รถที่ใช้ในการส่ง
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    วันที่จัดส่ง
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    วันที่สร้าง
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center" style={{ fontWeight: "bold" }}>
                    <Link
                      to="/Details_DJO"
                      style={{ textDecoration: "none", color: "blue" }} // เปลี่ยนจาก "blue" เป็น "black"
                    >
                      PTN151067-01
                    </Link>
                  </td>
                  <td className="text-center">เส้นทาง A</td>
                  <td className="text-center">5</td>
                  <td className="text-center">นายสมชาย</td>
                  <td className="text-center">รถตู้</td>
                  <td className="text-center">2024-10-20</td>
                  <td className="text-center">2024-10-15</td>
                </tr>
                {/* ข้อมูลใบงานอื่น ๆ สามารถเพิ่มในนี้ */}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default StaffHome;
