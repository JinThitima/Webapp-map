import React, { useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomersService from "../../server/Customer";
import { FaMapMarkerAlt, FaPhone, FaCheck } from "react-icons/fa";
import "./AcceptingWork.css";

const ShippingStopCard = ({ data }) => {
  const [customer, setCustomer] = useState({});
  const [showModal, setShowModal] = useState(false); // State สำหรับการแสดง Modal
  const [confirmDelivery, setConfirmDelivery] = useState(false);

  // ฟังก์ชัน fetch ข้อมูลลูกค้า
  const fetchCustomer = async () => {
    try {
      const res = await CustomersService.get(data.customer_id);
      setCustomer(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect เพื่อเรียก fetchCustomer เมื่อ data เปลี่ยน
  useEffect(() => {
    fetchCustomer();
  }, [data]);

  // ฟังก์ชันสำหรับเปิด Modal
  const handleShowModal = () => setShowModal(true);

  // ฟังก์ชันสำหรับปิด Modal
  const handleCloseModal = () => setShowModal(false);

  // ฟังก์ชันยืนยันการจัดส่ง
  const handleConfirmDelivery = () => {
    setConfirmDelivery(true);
    handleCloseModal(); // ปิด Modal หลังยืนยันการจัดส่ง
    // เพิ่มฟังก์ชันที่ทำการจัดส่งที่นี่ (เช่น การอัปเดตสถานะการจัดส่ง)
    console.log("Delivery confirmed for:", customer.name);
  };

  return (
    <ListGroup.Item className="location-item">
      <div className="location-index">{customer.sequence}</div>
      <div className="location-details">
        <strong className="location-name">
          <div>{customer.name}</div>
          <div className="location-address">
            <FaMapMarkerAlt style={{ marginRight: "5px" }} />
            {customer.address}
          </div>
          <div className="location-tel">
            <FaPhone style={{ marginRight: "5px" }} />
            {customer.tel}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="success"
              size="sm"
              className="d-flex align-items-center"
              onClick={handleShowModal} // เปิด Modal เมื่อคลิก
            >
              <FaCheck className="me-2" /> ยืนยันการจัดส่ง
            </Button>
            <Link
              to={`${customer.map_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="modern-button btn btn-outline-primary ms-auto"
            >
              จัดส่งสินค้า
            </Link>
          </div>
        </strong>
      </div>

      {/* Modal สำหรับยืนยันการจัดส่ง */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการจัดส่ง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          คุณต้องการยืนยันการจัดส่งให้กับ <strong>{customer.name}</strong>{" "}
          หรือไม่?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={handleConfirmDelivery}>
            ยืนยันการจัดส่ง
          </Button>
        </Modal.Footer>
      </Modal>
    </ListGroup.Item>
  );
};

export default ShippingStopCard;
