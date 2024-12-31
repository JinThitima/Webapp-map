import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Table,
  Alert,
} from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";


function AddJobOrder() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedShops, setSelectedShops] = useState([]);
  const [selectedShopDetails, setSelectedShopDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSave = () => {
    setShowDetails(true);
  };

  const handleCheckboxChange = (shop) => {
    setSelectedShops((prevState) => {
      if (prevState.includes(shop)) {
        return prevState.filter((item) => item !== shop);
      } else {
        return [...prevState, shop];
      }
    });
  };

  const handleSaveDetails = () => {
    // Here you can save the selected shops for the job order
    alert("ข้อมูลถูกบันทึกแล้ว!");
  };

  const filteredShops = [
    { id: 1, name: "ร้าน ก", route: "เส้นทาง 1", address: "123/4 ม.1" },
    { id: 2, name: "ร้าน ข", route: "เส้นทาง 2", address: "56/7 ม.2" },
    { id: 3, name: "ร้าน ค", route: "เส้นทาง 3", address: "89/10 ม.3" },
  ].filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StaffLayout>
      <Container className="my-4">
        {/* กรอบกราดที่ 1 */}
        <div className="border p-4 mb-4 shadow-sm rounded">
          {/* หัวข้อหลัก */}
          <Row className="mb-4">
            <Col md={9}>
              <h3 className="fw-bold text-primary">
                ใบงาน เลขที่ PTN231167-01
              </h3>
            </Col>
            <Col md={3}>
              <Alert
                variant="info"
                className="d-flex justify-content-center align-items-center py-4 mb-0"
              >
                <h5 className="text-dark mb-0">เพิ่มใบงาน</h5>
              </Alert>
            </Col>
          </Row>
          {/* หัวข้อรอง */}
          <h5 className="fw-semibold text-secondary">รายละเอียดใบงาน</h5>

          {/* ฟอร์มข้อมูล */}
          <div className="border p-3 mb-3 mt-4">
            {/* แถววันที่จัดส่ง */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="deliveryDate">
                  <Form.Label className=" fw-medium text-dark">
                    วันที่จัดส่ง
                  </Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>

            {/* แถวข้อมูลยานพาหนะและพนักงานขับรถ */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="vehicle">
                  <Form.Label className=" fw-medium text-dark">
                    ยานพาหนะ
                  </Form.Label>
                  <Form.Select>
                    <option>เลือกยานพาหนะ</option>
                    <option>ยานพาหนะ 1</option>
                    <option>ยานพาหนะ 2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="driver">
                  <Form.Label className="fw-medium text-dark">
                    พนักงานขับรถ
                  </Form.Label>
                  <Form.Select>
                    <option>เลือกพนักงานขับรถ</option>
                    <option>พนักงาน 1</option>
                    <option>พนักงาน 2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* แถวเวลาจัดส่งและเวลาจัดส่งเสร็จสิ้น */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="deliveryTime">
                  <Form.Label className="fw-medium text-dark">
                    เวลาจัดส่ง
                  </Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="deliveryEndTime">
                  <Form.Label className=" fw-medium text-dark">
                    เวลาจัดส่งเสร็จสิ้น
                  </Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
            </Row>

            {/* ปุ่มบันทึกข้อมูล */}
            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="success"
                onClick={handleSave}
                className="px-4 py-2 fw-semibold"
              >
                บันทึกข้อมูล
              </Button>
            </div>
          </div>
        </div>

        {showDetails && (
          <>
            {/* กรอบกราดที่ 2 */}
            <div className="border p-4 mb-4 shadow-sm rounded">
              <Row className="mb-3">
                <Col md={4}>
                  <h5 className="fw-semibold text-secondary">
                    รายการร้านค้าที่จัดส่ง
                  </h5>
                </Col>
                <Col md={8} className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="ค้นหาชื่อร้าน"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="primary" className="ms-3">
                    ค้นหา
                  </Button>
                </Col>
              </Row>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="fw-bold">เลือก</th>
                    <th className="fw-bold">กลุ่มเส้นทาง</th>
                    <th className="fw-bold">ชื่อร้านค้า</th>
                    <th className="fw-bold">ที่อยู่</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShops.map((shop) => (
                    <tr key={shop.id}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          onChange={() => handleCheckboxChange(shop)}
                        />
                      </td>
                      <td>{shop.route}</td>
                      <td>{shop.name}</td>
                      <td>{shop.address}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* กรอบกราดที่ 3 */}
            <div className="border p-3 mb-3 shadow-sm">
              <Row className="mb-3">
                <Col
                  md={2}
                  className="d-flex align-items-center justify-content-center"
                >
                  {/* หัวข้อ 'รายการที่เลือก' อยู่กึ่งกลางทั้งซ้ายขวาและบนล่าง */}
                  <h5 className="fw-semibold text-secondary">รายการที่เลือก</h5>
                </Col>
                <Col md={10}>
                  {/* Dismissable Alert แสดงข้อมูลร้านค้า */}
                  {selectedShops.map((shop) => (
                    <Alert
                      variant="primary"
                      className="mb-1"
                      dismissible
                      key={shop.id}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <strong className="me-2">{shop.name}</strong>
                        </div>
                        <div className="badge d-flex align-items-center">
                          <div className="badge bg-warning text-dark px-3 py-2 mx-2 rounded">
                            เวลาที่ออกจัดส่ง : 12:00
                          </div>
                          <div className="badge bg-success text-white px-3 py-2 mx-2 rounded">
                            เวลาเสร็จสิ้นการจัดส่ง : 12:30
                          </div>
                        </div>
                      </div>
                    </Alert>
                  ))}
                </Col>
                {/* ปุ่มบันทึกข้อมูล */}
              </Row>
              <div className="d-flex justify-content-end mt-4">
                <Button
                  variant="success"
                  onClick={handleSave}
                  className="px-4 py-2 fw-semibold"
                >
                  บันทึกข้อมูล
                </Button>
              </div>
            </div>
          </>
        )}
      </Container>
    </StaffLayout>
  );
}

export default AddJobOrder;
