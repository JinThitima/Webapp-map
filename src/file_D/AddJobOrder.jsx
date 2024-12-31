import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import { FaMapMarkerAlt, FaPlus } from "react-icons/fa";

// ตัวอย่างข้อมูล
const vehicles = ["รถ 1", "รถ 2", "รถ 3"];
const employees = ["พนักงาน A", "พนักงาน B", "พนักงาน C"];
const routeGroups = [
  {
    id: 1,
    name: "เส้นทาง A",
    shops: [
      { name: "ร้าน 1", address: "ที่อยู่ 1", phone: "080-1111111" },
      { name: "ร้าน 2", address: "ที่อยู่ 2", phone: "080-2222222" },
    ],
  },
  {
    id: 2,
    name: "เส้นทาง B",
    shops: [
      { name: "ร้าน 3", address: "ที่อยู่ 3", phone: "080-3333333" },
      { name: "ร้าน 4", address: "ที่อยู่ 4", phone: "080-4444444" },
    ],
  },
];


  
function AddJobOrder() {
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedRouteGroups, setSelectedRouteGroups] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [addedShops, setAddedShops] = useState([]);

  const handleSelectRoute = (routeId) => {
    setSelectedRouteGroups((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId]
    );
  };

  const handleAddShop = (shop) => {
    if (!addedShops.includes(shop)) {
      setAddedShops([...addedShops, shop]);
    }
  };

  const handleSaveRoute = () => {
    if (
      selectedVehicles.length > 0 &&
      selectedEmployees.length > 0 &&
      selectedRouteGroups.length > 0
    ) {
      alert("บันทึกข้อมูลสำเร็จ");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  const handleClearData = () => {
    setSelectedVehicles([]);
    setSelectedEmployees([]);
    setSelectedRouteGroups([]);
    setAddedShops([]);
    setDeliveryDate(new Date());
  };

  const handleVehicleChange = (vehicle) => {
    setSelectedVehicles((prev) =>
      prev.includes(vehicle)
        ? prev.filter((v) => v !== vehicle)
        : [...prev, vehicle]
    );
  };

  const handleEmployeeChange = (employee) => {
    setSelectedEmployees((prev) =>
      prev.includes(employee)
        ? prev.filter((e) => e !== employee)
        : [...prev, employee]
    );
  };

  const generateJobNumber = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // วันที่
    const month = String(today.getMonth() + 1).padStart(2, "0"); // เดือน
    const year = String(today.getFullYear()).slice(-2); // ปี
    const jobNumber = `PTN${day}${month}${year}-01`; // แก้ไขเลขใบงานตามต้องการ
    return jobNumber;
  };

  const jobNumber = generateJobNumber();

  return (
    <StaffLayout>
      <Container>
        <br />
        <Row className="my-2 align-items-center">
          <Col md={9}>
            <h2
              className="main-title"
              style={{ fontWeight: "bold", color: "#2a33a1" }}
            >
              Work Sheet
            </h2>
          </Col>
          <Col md={3} className="text-end">
            <h2
              className="main-title"
              style={{
                fontWeight: "bold",
                color: "#2a33a1",
                backgroundColor: "yellow",
                padding: "2px",
              }}
            >
              No : {jobNumber}
            </h2>
          </Col>
          <hr className="main-line" />
        </Row>

        {/* กรอบที่ 1 */}
        <Row className="mb-4">
          <Col md={12}>
            <Card className="shadow">
              <Card.Header className="bg-primary text-white">
                รายละเอียดข้อมูลเส้นทางที่จะไปวันนี้
              </Card.Header>
              <Card.Body>
                <h5>รายละเอียดทั่วไป</h5>
                <Row>
                  <Col md={6}>
                    <div>
                      <strong>กลุ่มเส้นทาง:</strong>{" "}
                      {selectedRouteGroups
                        .map(
                          (id) =>
                            routeGroups.find((route) => route.id === id)?.name
                        )
                        .join(", ") || "ยังไม่เลือก"}
                    </div>
                    <div>
                      <strong>จำนวนร้านค้าที่วิ่งงาน:</strong>{" "}
                      {addedShops.length || 0}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div>
                      <strong>รถที่จะใช้งาน:</strong>{" "}
                      {selectedVehicles.length > 0
                        ? selectedVehicles.join(", ")
                        : "ยังไม่เลือก"}
                    </div>
                    <div>
                      <strong>พนักงานจัดส่ง:</strong>{" "}
                      {selectedEmployees.length > 0
                        ? selectedEmployees.join(", ")
                        : "ยังไม่เลือก"}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div>
                      <strong>วันที่สร้างใบงาน:</strong>{" "}
                      {new Date().toLocaleDateString()}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div>
                      <strong>วันที่จะไปส่งสินค้า:</strong>{" "}
                      {deliveryDate.toLocaleDateString()} {/* อัปเดตที่นี่ */}
                    </div>
                  </Col>
                </Row>

                <h5 className="mt-4">รายละเอียดร้านค้า</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }} className="text-center">
                        ลำดับร้าน
                      </th>
                      <th style={{ width: "20%" }} className="text-center">
                        ชื่อร้าน
                      </th>
                      <th style={{ width: "20%" }} className="text-center">
                        ที่อยู่
                      </th>
                      <th style={{ width: "15%" }} className="text-center">
                        เบอร์โทร
                      </th>
                      <th style={{ width: "20%" }} className="text-center">
                        Map
                      </th>
                      <th style={{ width: "12%" }} className="text-center">
                        สถานะการจัดส่ง
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {addedShops.map((shop, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{shop.name}</td>
                        <td>{shop.address}</td>
                        <td className="text-center">{shop.phone}</td>
                        <td>
                          <Button
                            variant="link"
                            className="d-flex align-items-center mx-auto"
                          >
                            <FaMapMarkerAlt className="me-2" />{" "}
                            {/* ใช้ me-2 เพื่อให้มีช่องว่างระหว่างไอคอนกับข้อความ */}
                            แสดงแผนที่
                          </Button>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-success ">กำลังส่ง</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* กรอบที่ 2 */}
        <Row>
          <Col md={2}>
            <Card className="shadow ">
              <Card.Header className="bg-primary text-white">
                เลือกกลุ่มเส้นทาง
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>กลุ่มเส้นทาง</Form.Label>
                    {routeGroups.map((route) => (
                      <Form.Check
                        key={route.id}
                        type="checkbox"
                        label={route.name}
                        name="routeGroup"
                        onChange={() => handleSelectRoute(route.id)}
                      />
                    ))}
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* กรอบที่ 3 */}
          <Col md={10}>
            <Card className="shadow">
              <Card.Header className="bg-primary text-white">
                แสดงร้านค้าในเส้นทาง
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }} className="text-center">
                        ชื่อร้าน
                      </th>
                      <th style={{ width: "30%" }} className="text-center">
                        ที่อยู่
                      </th>
                      <th style={{ width: "15%" }} className="text-center">
                        เบอร์โทร
                      </th>
                      <th style={{ width: "20%" }} className="text-center">
                        Map
                      </th>
                      <th style={{ width: "10%" }} className="text-center">
                        เพิ่มร้าน
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {routeGroups
                      .filter((route) => selectedRouteGroups.includes(route.id))
                      .flatMap((route) => route.shops)
                      .map((shop, index) => (
                        <tr key={index}>
                          <td>{shop.name}</td>
                          <td>{shop.address}</td>
                          <td className="text-center">{shop.phone}</td>
                          <td className="text-center">
                            <Button
                              variant="link"
                              className="d-flex align-items-center mx-auto"
                            >
                              <FaMapMarkerAlt className="me-2" />{" "}
                              {/* ใช้ me-2 เพื่อให้มีช่องว่างระหว่างไอคอนกับข้อความ */}
                              แสดงแผนที่
                            </Button>
                          </td>
                          <td className="text-center">
                            {" "}
                            {/* เพิ่ม className นี้เพื่อจัดแนวกึ่งกลาง */}
                            <Button
                              className="d-flex align-items-center mx-auto" // ใช้ mx-auto เพื่อจัดกลาง
                              variant="success"
                              onClick={() => handleAddShop(shop)}
                            >
                              <FaPlus className="me-2" /> เพิ่ม
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* กรอบที่ 4 */}
        <Row className="mt-4">
          <Col md={2}></Col>
          <Col md={10}>
            <Card className="shadow">
              <Card.Header className="bg-primary text-white">
                ข้อมูลการจัดส่งทั่วไป
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Row className="mb-4">
                      <Col md={4}>
                        <Form.Label>เลือกวันเวลาการจัดส่ง</Form.Label>
                        <Form.Control
                          type="date"
                          value={deliveryDate.toISOString().split("T")[0]}
                          onChange={(e) =>
                            setDeliveryDate(new Date(e.target.value))
                          }
                        />
                      </Col>
                      <Col md={2}></Col>
                      <Col md={2}>
                        <Form.Label>เลือกพนักงาน</Form.Label>
                        {employees.map((employee) => (
                          <Form.Check
                            key={employee}
                            type="checkbox"
                            label={employee}
                            name="employee"
                            onChange={() => handleEmployeeChange(employee)}
                          />
                        ))}
                      </Col>
                      <Col md={4}>
                        <Form.Label>เลือกรถที่ใช้</Form.Label>
                        {vehicles.map((vehicle) => (
                          <Form.Check
                            key={vehicle}
                            type="checkbox"
                            label={vehicle}
                            name="vehicle"
                            onChange={() => handleVehicleChange(vehicle)}
                          />
                        ))}
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* กรอบที่ 5 */}
        <Row className="mt-1">
          <Col md={12} className="text-center">
            <Button
              variant="success"
              onClick={handleSaveRoute}
              className="mt-3 me-3"
            >
              บันทึกข้อมูล
            </Button>
            <Button
              variant="secondary"
              onClick={handleClearData}
              className="mt-3"
            >
              เคลียร์ข้อมูล
            </Button>
          </Col>
        </Row>
        <br />
      </Container>
    </StaffLayout>
  );
}

export default AddJobOrder;
