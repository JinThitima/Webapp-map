import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";
import { AiOutlineHolder } from "react-icons/ai";

import StaffLayout from "../../layouts/StaffLayout";
import "./DetailGroupTransport.css";
import { useParams } from "react-router-dom";
import Route_templatesService from "../../server/Route_template";

function DetailGroupTransport() {
  const params = useParams();
  const { id } = params;
  // route_template
  const [routeTemplate, setRouteTemplate] = useState({});
  const [shops, setShops] = useState([
    { id: "1", name: "ร้าน ก", location: "123/4 ม.1" },
    { id: "2", name: "ร้าน ข", location: "56/7 ม.2" },
    { id: "3", name: "ร้าน ค", location: "89/10 ม.3" },
  ]);
  const [filteredShops, setFilteredShops] = useState([]);
  const fetchRouteTemplate = async () => {
    try {
      const res = await Route_templatesService.get(id);
      console.log(res.data.data);
      setRouteTemplate(res.data.data);
      setShops(res.data.data.customers);
    } catch (e) {
      console.log(e);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shopToDelete, setShopToDelete] = useState(null);
  const [newShop, setNewShop] = useState({ name: "", location: "" });

  const tableBodyRef = useRef(null);

  // Initialize SortableJS
  useEffect(() => {
    fetchRouteTemplate();
  });
  useEffect(() => {
    if (tableBodyRef.current) {
      Sortable.create(tableBodyRef.current, {
        animation: 150,
        handle: ".drag-handle",
        onEnd: (evt) => {
          const updatedShops = [...shops];
          const [removed] = updatedShops.splice(evt.oldIndex, 1);
          updatedShops.splice(evt.newIndex, 0, removed);
          setShops(updatedShops);
        },
      });
    }
  }, [shops]);

  useEffect(() => {
    const filtered = shops.filter((shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredShops(filtered);
  }, [searchQuery, shops]); // Re-filter whenever searchQuery or shops changes
  // Handle adding a new shop
  const handleAddShop = () => {
    setShops([...shops, { id: Date.now().toString(), ...newShop }]);
    setNewShop({ name: "", location: "" });
    setShowModal(false);
  };

  // Handle showing the delete modal
  const handleShowDeleteModal = (shop) => {
    setShopToDelete(shop);
    setShowDeleteModal(true);
  };

  // Handle closing the delete modal
  const handleCloseDeleteModal = () => {
    setShopToDelete(null);
    setShowDeleteModal(false);
  };

  // Handle deleting a shop
  const handleDeleteShop = () => {
    setShops(shops.filter((shop) => shop.id !== shopToDelete.id));
    setShowDeleteModal(false);
  };

  // Filtered shops based on search query
  // const filteredShops = routeTemplate.customers.filter((shop) =>
  //   shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <StaffLayout>
      <Container className="my-4 align-items-center">
        {/* Header */}
        <Row className="align-items-center mb-2">
          <Col>
            <h5>ชื่อเส้นทาง: {routeTemplate.name}</h5>
          </Col>
        </Row>
        <hr className="main-line" />

        {/* Search and Info */}
        <Row className="align-items-center mb-3">
          <Col md={6}>
            <div>พบ {shops.length} ร้านค้า</div>
          </Col>
          <Col md={6} className="text-end">
            <Form className="d-inline-flex">
              <Form.Control
                type="text"
                placeholder="ค้นหาชื่อร้านค้า"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="me-2"
              />
              <Button variant="primary">
                <FaSearch />
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "5%" }} className="text-center"></th>
              <th style={{ width: "5%" }} className="text-center">
                #
              </th>
              <th style={{ width: "25%" }} className="text-center">
                ชื่อร้าน
              </th>
              <th style={{ width: "55%" }} className="text-center">
                ที่อยู่
              </th>
              <th style={{ width: "20%" }} className="text-center">
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody ref={tableBodyRef}>
            {filteredShops.map((shop, index) => (
              <tr key={shop.id}>
                <td className="drag-handle text-center">
                  <AiOutlineHolder size={30} />
                </td>
                <td className="text-center">{index + 1}</td>
                <td>{shop.name}</td>
                <td>{shop.address}</td>
                <td
                  className="text-center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="danger"
                    size="sm"
                    className="d-flex align-items-center"
                    onClick={() => handleShowDeleteModal(shop)}
                  >
                    <FaTrashAlt className="me-2" /> ลบ
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add Button */}
        <div className="d-flex justify-content-end mt-3">
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            className="me-2 d-flex align-items-center"
          >
            <FaPlus /> เพิ่มข้อมูล
          </Button>
          <Button variant="success" className="d-flex align-items-center">
            บันทึกข้อมูล
          </Button>
        </div>

        {/* Add Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มร้านค้าใหม่ : ชื่อเส้นทาง</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="shopName">
                <Form.Label>ชื่อร้านค้า</Form.Label>
                <Form.Select
                  value={newShop.name}
                  onChange={(e) =>
                    setNewShop({ ...newShop, name: e.target.value })
                  }
                >
                  <option value="">-- เลือกร้านค้า --</option>
                  <option value="ร้าน ก">ร้าน ก</option>
                  <option value="ร้าน ข">ร้าน ข</option>
                  <option value="ร้าน ค">ร้าน ค</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setShowModal(false)}
            >
              ยกเลิก
            </Button>
            <Button variant="outline-primary" onClick={handleAddShop}>
              บันทึกข้อมูล
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>ลบร้านค้า</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            คุณต้องการลบร้าน <b>{shopToDelete?.name}</b> หรือไม่?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              ยกเลิก
            </Button>
            <Button variant="danger" onClick={handleDeleteShop}>
              ยืนยันการลบ
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </StaffLayout>
  );
}

export default DetailGroupTransport;
