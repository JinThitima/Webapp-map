import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CustomersService from "./services/CustomersService";
import ShippingCompaniesService from "./services/ShippingCompaniesService";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [shippingCompanies, setShippingCompanies] = useState([]);

  const [transportType, setTransportType] = useState("");
  const [privateTransport, setPrivateTransport] = useState("");

  // ดึงข้อมูลลูกค้า
  const fetchCustomer = async () => {
    try {
      const res = await CustomersService.getAll();
      setCustomer(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  // ดึงข้อมูลชื่อขนส่งจากฐานข้อมูล
  const fetchShippingCompanies = async () => {
    try {
      const res = await ShippingCompaniesService.getAll();
      setShippingCompanies(res.data.data || []); // เก็บข้อมูลขนส่ง
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCustomer();
    fetchShippingCompanies();
  }, []);

  const handleAddClose = () => setShowAddModal(false);
  const handleEditClose = () => setShowEditModal(false);
  const handleDeleteClose = () => setShowDeleteModal(false);

  const handleShowAdd = () => {
    setSelectedCustomer(null);
    setShowAddModal(true);
  };

  const handleShowEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleShowDelete = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleTransportTypeChange = (event) => {
    setTransportType(event.target.value);
    if (event.target.value !== "private") {
      setPrivateTransport("");
    }
  };

  return (
    <Modal show={showAddModal} onHide={handleAddClose} size="lg">
      <Modal.Header closeButton className="modal-header-add">
        <Modal.Title>เพิ่มข้อมูลลูกค้า</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* ฟอร์มข้อมูลลูกค้า */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCustomerShopName">
                <Form.Label>ชื่อร้านค้า</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCustomerOwnerFirstName">
                <Form.Label>ชื่อเจ้าของร้าน</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCustomerOwnerLastName">
                <Form.Label>นามสกุลเจ้าของร้าน</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCustomerPhone">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCustomerLatitude">
                <Form.Label>ละติจูด</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCustomerLongitude">
                <Form.Label>ลองติจูด</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formCustomerAddress">
            <Form.Label>ที่อยู่</Form.Label>
            <Form.Control as="textarea" rows={2} />
          </Form.Group>

          <Form.Group controlId="formCustomerMapUrl">
            <Form.Label>แผนที่ URL</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group controlId="formCustomerImage">
            <Form.Label>ภาพร้านค้า</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Row className="mb-3">
            {/* ประเภทขนส่ง */}
            <Form.Group as={Col} controlId="transportType">
              <Form.Label>ประเภทขนส่ง</Form.Label>
              <Form.Select
                value={transportType}
                onChange={handleTransportTypeChange}
              >
                <option value="">-- กรุณาเลือกประเภทขนส่ง --</option>
                <option value="company">รถบริษัท</option>
                <option value="private">ขนส่งเอกชน</option>
              </Form.Select>
            </Form.Group>

            {transportType === "private" && (
              <Form.Group as={Col} controlId="privateTransport">
                <Form.Label>เลือกชื่อขนส่งเอกชน</Form.Label>
                <Form.Select
                  value={privateTransport}
                  onChange={(e) => setPrivateTransport(e.target.value)}
                >
                  <option value="">-- กรุณาเลือกชื่อขนส่ง --</option>
                  {shippingCompanies.map((company) => (
                    <option key={company.id} value={company.name}>
                      {company.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleAddClose}>
          ปิด
        </Button>
        <Button variant="outline-primary" onClick={handleAddClose}>
          บันทึกข้อมูล
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Customer;
