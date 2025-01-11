import React, { useEffect, useRef, useState } from "react";
import { Button, ListGroup, Card, Row, Col, Modal } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import CustomersService from "../../server/Customer";
import Ship_worksService from "../../server/Ship_work";
import "../driver/AcceptingWork.css";

const ShippingStopCard = ({ data, shipWorkId }) => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [ship_works, setShip_works] = useState([]);
  const [customer, setCustomer] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Customer ที่เลือก

  const fetchCustomer = async () => {
    try {
      const res = await CustomersService.get(data.customer_id);
      setCustomer(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [data]);

  const handleShowDelete = (customer) => {
    setSelectedCustomer(customer); // เก็บข้อมูล customer ที่เลือก
    setShowModal(true); // แสดง modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // ปิด modal
    setSelectedCustomer(null);
  };

  const handleDelete = async () => {
    try {
      // เรียกฟังก์ชัน deleteCustomer ของ Ship_worksService เพื่อลบลูกค้าจาก shipping_stops
      await Ship_worksService.deleteCustomer(shipWorkId, selectedCustomer._id);

      handleCloseModal(); // ปิด modal หลังจากลบสำเร็จ
      // คุณอาจจะต้องเพิ่ม logic สำหรับการอัพเดต UI หรือ redirect หลังจากลบข้อมูล
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card className="shadow-sm mt-3">
      <Card.Header
        as="h4"
        style={{
          backgroundColor: "#000000",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "bold",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <Row>
          <Col md={11} className="d-flex align-items-center">
            {customer.name}
          </Col>
          <Col md={1}>
            <Button
              variant="danger"
              size="sm"
              className="d-flex align-items-center"
              onClick={() => handleShowDelete(customer)}
            >
              <FaTrashAlt className="me-2" /> ลบ
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>ที่อยู่ : </strong> {customer.address}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>เบอร์โทร : </strong> {customer.tel}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>ผู้ติดต่อ : </strong> {customer.contact_person}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>แผนที่ URL : </strong> {customer.map_url}
        </ListGroup.Item>
      </ListGroup>

      {/* Modal สำหรับยืนยันการลบ */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการลบข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          คุณต้องการลบข้อมูลของ {selectedCustomer ? selectedCustomer.name : ""}{" "}
          หรือไม่?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            ยืนยันการลบ
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ShippingStopCard;
