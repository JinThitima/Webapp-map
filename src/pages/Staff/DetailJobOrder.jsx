import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";

const DetailJobOrder = () => {
  // State for modal visibility and selected store to delete
  const [show, setShow] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  // Sample data for demonstration
  const stores = [
    {
      id: 1,
      name: "ร้านค้า A",
      deliveryOrder: 1,
      address: "ที่อยู่ A",
      phone: "012-345-6789",
      status: "จัดส่งสำเร็จ",
    },
    {
      id: 2,
      name: "ร้านค้า B",
      deliveryOrder: 2,
      address: "ที่อยู่ B",
      phone: "098-765-4321",
      status: "กำลังจัดส่ง",
    },
    // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
  ];

  // Handlers for modal
  const handleShow = (store) => {
    setSelectedStore(store);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleDelete = () => {
    // เพิ่มการลบข้อมูลตามต้องการ
    console.log("ลบข้อมูลร้านค้า:", selectedStore);
    setShow(false);
  };

  return (
    <StaffLayout>
      <Container className="mt-4">
        {/* Header */}
        <Row className="my-2 align-items-center">
          <Col md={9}>
            <h2
              className="main-title"
              style={{ fontWeight: "bold", color: "#2a33a1" }}
            >
              ราละเอียดใบงาน
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
              No : PTN151067-01
            </h2>
          </Col>
          <hr className="main-line" />
        </Row>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="text-md-start">
              {/* Row 1: สายวิ่งงาน */}
              <Col xs={12}>
                <h4 className="text-md-start">สายวิ่งงาน: ลาดกระบัง</h4>
              </Col>

              {/* Row 2: วันที่-เวลาเปิดใบงาน และ วันที่-เวลาส่งสินค้า */}
              <Col xs={6} className="text-md-start">
                <strong>วันที่-เวลาเปิดใบงาน : </strong>{" "}
                {/* ใส่ข้อมูลวันที่-เวลา */}
              </Col>
              <Col xs={6} className="text-md-end">
                <strong>วันที่-เวลาส่งสินค้า : </strong>{" "}
                {/* ใส่ข้อมูลวันที่-เวลา */}
              </Col>

              {/* Row 3: พนักงานขับรถ และ ประเภทรถ */}
              <Col xs={6} className="text-md-start">
                <strong>พนักงานขับรถ : </strong> {/* ใส่ชื่อพนักงาน */}
              </Col>
              <Col xs={6} className="text-md-end">
                <strong>ประเภทรถ : </strong> {/* ใส่ประเภทของรถ */}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Container className="mt-4">
          <h2
            className="main-title mb-4"
            style={{ fontWeight: "bold", color: "#2a33a1" }}
          >
            รายละเอียดใบงาน
          </h2>

          {/* Table for store information */}
          <Table bordered hover responsive="md" className="shadow-sm">
            <thead style={{ backgroundColor: "#2a33a1", color: "#ffffff" }}>
              <tr>
                <th style={{ width: "10%" }} className="text-center">
                  ลำดับ
                </th>
                <th style={{ width: "20%" }} className="text-center">
                  ชื่อร้าน
                </th>
                <th style={{ width: "10%" }} className="text-center">
                  ลำที่จัดส่ง
                </th>
                <th style={{ width: "20%" }} className="text-center">
                  ที่อยู่ร้านค้า
                </th>
                <th style={{ width: "15%" }} className="text-center">
                  เบอร์โทรร้านค้า
                </th>
                <th style={{ width: "15%" }} className="text-center">
                  สถานะการจัดส่ง
                </th>
                <th style={{ width: "15%" }} className="text-center">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store, index) => (
                <tr key={store.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{store.name}</td>
                  <td className="text-center">{store.deliveryOrder}</td>
                  <td>{store.address}</td>
                  <td className="text-center">{store.phone}</td>
                  <td className="text-center">{store.status}</td>
                  <td className="text-center">
                    <Button variant="danger" onClick={() => handleShow(store)}>
                      ลบ
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for delete confirmation */}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>ยืนยันการลบ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              คุณต้องการลบ "{selectedStore?.name}" หรือไม่?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                ยกเลิก
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                ลบ
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default DetailJobOrder;
