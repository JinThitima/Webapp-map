import React from "react";
import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { BsDownload } from "react-icons/bs";
import { Chart, registerables } from "chart.js";
import StaffLayout from "../../layouts/StaffLayout";

Chart.register(...registerables);

const FuelReport = () => {
  const dataTotalFuelCost = {
    labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน"],
    datasets: [
      {
        label: "ค่าน้ำมันรวมทั้งหมด (บาท)",
        data: [5000, 9500, 15500, 21000, 27500, 34500],
        fill: false,
        backgroundColor: "green",
        borderColor: "green",
      },
    ],
  };

  const dataMonthlyFuelCost = {
    labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน"],
    datasets: [
      {
        label: "ค่าน้ำมันรวมรายเดือน (บาท)",
        data: [5000, 4500, 6000, 5500, 6500, 7000],
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  const dataDailyFuelCost = {
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
        label: "ค่าน้ำมันรายวัน (บาท)",
        data: [200, 300, 250, 350, 400, 450],
        fill: false,
        backgroundColor: "orange",
        borderColor: "orange",
      },
    ],
  };

  // ข้อมูลสำหรับตารางรายละเอียดค่าน้ำมัน
  const fuelData = [
    {
      date: "01/10/2024",
      routeName: "เส้นทาง A",
      fuelCost: 500,
      vehicleReg: "ฒ 1234",
    },
    {
      date: "02/10/2024",
      routeName: "เส้นทาง B",
      fuelCost: 650,
      vehicleReg: "ก 5678",
    },
    {
      date: "03/10/2024",
      routeName: "เส้นทาง C",
      fuelCost: 550,
      vehicleReg: "ข 9012",
    },
  ];

  return (
    <StaffLayout>
      <Container>
        <Row className="my-4 align-items-center">
          <Col md={8}>
            <h2 className="main-title" style={{ fontWeight: "bold" }}>
              รายงานเชื้อเพลิง
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
                <h5>ค่าน้ำมันรวมทั้งหมด</h5>
                <Line data={dataTotalFuelCost} height={200} width={300} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>ค่าน้ำมันรวมรายเดือน</h5>
                <Line data={dataMonthlyFuelCost} height={200} width={300} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>ค่าน้ำมันรายวัน</h5>
                <Line data={dataDailyFuelCost} height={200} width={300} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h3 className="main-title" style={{ fontWeight: "bold" }}>
              รายละเอียดเชื้อเพลิง
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
                    ค่าน้ำมัน (บาท)
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    ดูรายละเอียด
                  </th>
                </tr>
              </thead>
              <tbody>
                {fuelData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.date}</td>
                    <td className="text-center">{item.routeName}</td>
                    <td className="text-center">{item.vehicleReg}</td>
                    <td className="text-center">{item.fuelCost}</td>
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

export default FuelReport;
