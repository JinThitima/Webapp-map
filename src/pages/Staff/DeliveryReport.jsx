import React from "react";
import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2"; // ใช้ Chart.js สำหรับกราฟ
import { BsDownload } from "react-icons/bs";
import { Chart, registerables } from "chart.js"; // เพิ่มการนำเข้า Chart และ registerables
import StaffLayout from "../../layouts/StaffLayout";

// ลงทะเบียน scale ที่จำเป็น
Chart.register(...registerables);

const DeliveryReport = () => {
  // ข้อมูลสำหรับกราฟ
  const dataOverall = {
    labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน"],
    datasets: [
      {
        label: "จำนวนการจัดส่งทั้งหมด",
        data: [120, 130, 140, 150, 160, 170],
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  };

  const dataMonthly = {
    labels: ["สัปดาห์ที่ 1", "สัปดาห์ที่ 2", "สัปดาห์ที่ 3", "สัปดาห์ที่ 4"],
    datasets: [
      {
        label: "จำนวนการจัดส่งรายเดือน",
        data: [30, 50, 40, 60],
        fill: false,
        backgroundColor: "orange",
        borderColor: "orange",
        borderWidth: 2,
      },
    ],
  };

  const dataDaily = {
    labels: ["วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์"],
    datasets: [
      {
        label: "จำนวนการจัดส่งรายวัน",
        data: [10, 20, 15, 25, 30],
        fill: false,
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 2,
      },
    ],
  };

  // ข้อมูลสำหรับตาราง
  const deliveryData = [
    { date: "01/10/2024", total: 10, successful: 8, failed: 2 },
    { date: "02/10/2024", total: 15, successful: 12, failed: 3 },
    { date: "03/10/2024", total: 20, successful: 18, failed: 2 },
  ];

  return (
    <StaffLayout>
      <Container>
        <Row className="my-4 align-items-center">
          <Col md={8}>
            <h2 className="main-title" style={{ fontWeight: "bold" }}>
              รายงานการจัดส่งสินค้า
            </h2>
          </Col>
        <hr className="main-line" />
        <Col md={4} className="text-end">
          <Button variant="primary" className="d-flex align-items-center">
            <BsDownload size={20} className="me-2" />
            ดาวน์โหลด PDF
          </Button>
              </Col>
              <br />
        </Row>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-center">ภาพรวมการจัดส่ง</h5>
                <Line data={dataOverall} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-center">จำนวนการจัดส่งรายเดือน</h5>
                <Line data={dataMonthly} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-center">จำนวนการจัดส่งรายวัน</h5>
                <Line data={dataDaily} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h2 className="main-title" style={{ fontWeight: "bold" }}>
              รายละเอียดการจัดส่ง
            </h2>
            <hr className="main-line" />
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">วันที่</th>
                  <th className="text-center">จำนวนที่ส่งทั้งหมด</th>
                  <th className="text-center">จำนวนที่ส่งสำเร็จ</th>
                  <th className="text-center">จำนวนที่ส่งไม่สำเร็จ</th>
                  <th className="text-center">ดูรายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                {deliveryData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.date}</td>
                    <td className="text-center">{item.total}</td>
                    <td className="text-center">{item.successful}</td>
                    <td className="text-center">{item.failed}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <Button
                          variant="success"
                          onClick={() =>
                            console.log(`ดูรายละเอียด ${item.date}`)
                          }
                        >
                          ดูรายละเอียด
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </StaffLayout>
  );
};

export default DeliveryReport;
