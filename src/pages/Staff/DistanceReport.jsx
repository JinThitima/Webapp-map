import React from "react";
import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { BsDownload } from "react-icons/bs";
import { Chart, registerables } from "chart.js";
import StaffLayout from "../../layouts/StaffLayout";

Chart.register(...registerables);

const DistanceReport = () => {
  const dataTotalDistance = {
    labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน"],
    datasets: [
      {
        label: "ระยะทางรวมทั้งหมด (กิโลเมตร)",
        data: [500, 950, 1550, 2100, 2750, 3450],
        fill: false,
        backgroundColor: "green",
        borderColor: "green",
      },
    ],
  };

  const dataMonthlyDistance = {
    labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน"],
    datasets: [
      {
        label: "ระยะทางรวมรายเดือน (กิโลเมตร)",
        data: [500, 450, 600, 550, 650, 700],
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  const dataDailyDistance = {
    labels: [
      "วันที่ 1",
      "วันที่ 2",
      "วันที่ 3",
      "วันที่ 4",
      "วันที่ 5",
      "วันที่ 6",
    ],
    datasets: [
      {
        label: "ระยะทางรายวัน (กิโลเมตร)",
        data: [20, 30, 25, 35, 40, 45],
        fill: false,
        backgroundColor: "orange",
        borderColor: "orange",
      },
    ],
  };

  // ข้อมูลสำหรับตารางรายละเอียดระยะทางวิ่งงาน
  const distanceData = [
    {
      date: "01/10/2024",
      routeName: "เส้นทาง A",
      distance: 50,
      vehicleReg: "ฒ 1234",
      mileageTo: 1000,
      mileageBack: 1050,
    },
    {
      date: "02/10/2024",
      routeName: "เส้นทาง B",
      distance: 65,
      vehicleReg: "ก 5678",
      mileageTo: 1100,
      mileageBack: 1165,
    },
    {
      date: "03/10/2024",
      routeName: "เส้นทาง C",
      distance: 55,
      vehicleReg: "ข 9012",
      mileageTo: 1200,
      mileageBack: 1255,
    },
  ];

  return (
    <StaffLayout>
      <Container>
        <Row className="my-4 align-items-center">
          <Col md={8}>
            <h2 className="main-title" style={{ fontWeight: "bold" }}>
              รายงานระยะทางวิ่งงาน
            </h2>
          </Col>
          <hr className="main-line" />
          <Col md={4} className="text-end">
            <Button variant="primary" className="d-flex align-items-center">
              <BsDownload size={20} className="me-2" />
              ดาวน์โหลด PDF
            </Button>
          </Col>
        </Row>


        <Row className="mb-4">
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>ระยะทางรวมทั้งหมด</h5>
                <Line data={dataTotalDistance} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>ระยะทางรวมรายเดือน</h5>
                <Line data={dataMonthlyDistance} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>ระยะทางรายวัน</h5>
                <Line data={dataDailyDistance} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h3 className="main-title" style={{ fontWeight: "bold" }}>
              รายละเอียดระยะทางวิ่งงาน
            </h3>
            <hr className="main-line" />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "10%" }}>
                    วันที่
                  </th>
                  <th className="text-center" style={{ width: "20%" }}>
                    ชื่อเส้นทาง
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    ทะเบียนรถ
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    เลขไมค์รถขาไป
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    เลขไมค์รถขากลับ
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    ระยะทาง (กิโลเมตร)
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    ดูรายละเอียด
                  </th>
                </tr>
              </thead>
              <tbody>
                {distanceData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.date}</td>
                    <td className="text-center">{item.routeName}</td>
                    <td className="text-center">{item.vehicleReg}</td>
                    <td className="text-center">{item.mileageTo}</td>
                    <td className="text-center">{item.mileageBack}</td>
                    <td className="text-center">{item.distance}</td>
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

export default DistanceReport;
