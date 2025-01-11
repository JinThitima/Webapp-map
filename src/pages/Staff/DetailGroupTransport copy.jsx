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
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Route_templatesService from "../../server/Route_template";
import CustomersService from "../../server/Customer";

function DetailGroupTransport() {
  const params = useParams();
  const { id } = params;
  // route_template
  const navigate = useNavigate();
  const [routeTemplate, setRouteTemplate] = useState({});
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalType, setModalType] = useState(""); // ใช้สำหรับจัดการ modalType
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const tableBodyRef = useRef(null);

  const fetchRouteTemplate = async () => {
    try {
      const res = await Route_templatesService.get(id);
     
      setRouteTemplate(res.data.data);
      setShops(res.data.data.customers);
    } catch (e) {
      console.log(e);
    }
  };

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
  // Handle showing the delete modal

  const fetchCustomer = async () => {
    try {
      const res = await CustomersService.getAll();
      console.log('customer',res.data.data)
      setCustomers(res.data.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCustomerChange = (event) => {
    const customerName = event.target.value;
    // หา customer ที่ตรงกับชื่อที่เลือก
    const customer = customers.find((c) => c.name === customerName);
    setSelectedCustomer(customer || null);
  };

  useEffect(() => {
    fetchCustomer();
    fetchRouteTemplate();
  }, []);
  //เพิ่มข้อมูลลูกค้า ลงไปในข้อมูลเดิม
  const [editFormData, setEditFormData] = useState({});
  const handleChangeEdit = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  // เพิ่มฟังก์ชัน handleEditSubmit สำหรับบันทึกข้อมูลที่แก้ไข
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!routeTemplate || !routeTemplate._id) {
      alert("ไม่พบข้อมูลลูกค้าที่ต้องการเพิ่ม");
    }

    try {
      const customer = {
        customer_id: selectedCustomer.customer_id._id,
        name: selectedCustomer.name,
        address: selectedCustomer.address,
        latitude: selectedCustomer.lat,
        longitude: selectedCustomer.long,
        map_url: selectedCustomer.map_url,
        delivery_type: selectedCustomer.delivery_type,
        shipping_company: selectedCustomer.shipping_company._id,
        // sequence: selectedCustomer.shipping_company,
      };
      console.log(selectedCustomer);
      await Route_templatesService.addCustomer(routeTemplate._id, customer);
      alert("ข้อมูลลูกค้าถูกเพิ่มเรียบร้อยแล้ว");
      setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
      fetchRouteTemplate(); // รีเฟรชข้อมูลลูกค้า
    } catch (e) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล", e);
      alert("ไม่สามารถเพิ่มข้อมูลได้");
    }
  };

  // ลบข้อมูลลูกค้า
  const handleDeleteSubmit = async (customerId) => {
    if (!customerId) {
      alert("กรุณาเลือกข้อมูลที่ต้องการลบ");
      return;
    }

    try {
      await Route_templatesService.deleteCustomer(
        routeTemplate._id,
        customerId
      ); // ฟังก์ชันลบข้อมูลลูกค้า
      alert("ข้อมูลลูกค้าถูกลบเรียบร้อยแล้ว");
      fetchRouteTemplate(); // รีเฟรชข้อมูลลูกค้า
      //ปิด modal
      setTimeout(() => {
        navigate(`/GroupTransport/`);
       // เปลี่ยนเส้นทางหลังจากปิด Modal
      }, 300); // ใช้เวลา 300ms ก่อนที่จะเปลี่ยนเส้นทาง
    } catch (error) {
      console.error(
        "เกิดข้อผิดพลาดในการลบข้อมูล",
        error.response || error.message
      );
      alert(error.response?.data?.message || "ไม่สามารถลบข้อมูลได้");
    }
  };

  const handleClose = () => setShowModal(false);

  const handleShowEdit = (Route_templates) => {
    // setSelectedRouteTemplate(Route_templates);
    setModalType("edit");
    setShowModal(true);
    setEditFormData({ ...Route_templates });
  };

  const handleShowDelete = (Route_templates) => {
    // setSelectedRouteTemplate(Route_templates);
    setModalType("delete");
    setShowModal(true);
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
              {/* <th style={{ width: "5%" }} className="text-center"></th> */}
              <th style={{ width: "5%" }} className="text-center">
                #
              </th>
              <th style={{ width: "25%" }} className="text-center">
                ชื่อร้าน
              </th>
              <th style={{ width: "45%" }} className="text-center">
                ที่อยู่
              </th>
              <th style={{ width: "10%" }} className="text-center">
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody ref={tableBodyRef}>
            {filteredShops.map((shop) => (
              <tr key={shop._id}>
                {/* <td className="drag-handle text-center">
                  <AiOutlineHolder size={30} />
                </td> */}
                <td className="text-center">{shop.sequence}</td>
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
                    onClick={() => {
                      setSelectedCustomer(shop);
                      handleShowDelete(shop);
                    }}
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
            onClick={() => {
              setShowModal(true);
              handleShowEdit();
            }}
            className="me-2 d-flex align-items-center"
          >
            <FaPlus /> เพิ่มข้อมูล
          </Button>
          {/* <NavLink
            to={`/Sortshops/${routeTemplate._id}`} // กำหนดเส้นทางสำหรับการนำทาง
            className="d-flex align-items-center justify-content-center btn btn-success" // Flexbox + ปุ่มสีเขียว
            style={{
              textDecoration: "none", // เอาเส้นใต้ในข้อความออก
              padding: "10px 15px",
              borderRadius: "5px",
            }}
          >
            เรียงร้านค้า
          </NavLink> */}
        </div>

        {/* Add Modal */}
        <Modal
          show={modalType === "edit" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มร้านค้าใหม่ : {routeTemplate.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              {/* ฟอร์มลำดับ */}
              <Form.Group controlId="formCustomerHidden">
                <Form.Control type="hidden" name="sequence" />
              </Form.Group>
              <Form.Group controlId="shopName">
                <Form.Label>ชื่อร้านค้า</Form.Label>
                <Form.Select
                  name="name"
                  onChange={(e) => {
                    handleCustomerChange(e);
                    handleChangeEdit(e);
                  }}
                >
                  <option value={selectedCustomer?.name || ""}>
                    -- เลือกร้านค้า --
                  </option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="shopName">
                <Row>
                  <Col md={6}>
                    <Form.Group
                      controlId="formCustomerAddress"
                      className="mt-3"
                    >
                      <Form.Label>ที่อยู่</Form.Label>
                      <Form.Control
                        name="address"
                        as="textarea"
                        disabled
                        onChange={handleChangeEdit}
                        value={selectedCustomer?.address || ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formCustomerMapUrl" className="mt-3">
                      <Form.Label>แผนที่ URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="map_url"
                        disabled
                        onChange={handleChangeEdit}
                        value={selectedCustomer?.map_url || ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formCustomerMapUrl" className="mt-3">
                      <Form.Label>customer</Form.Label>
                      <Form.Control
                        type="text"
                        name="customer_id"
                        disabled
                        onChange={handleChangeEdit}
                        value={selectedCustomer?._id || ""}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group
                      controlId="formCustomerLatitude"
                      className="mt-3"
                    >
                      <Form.Label>ละติจูด</Form.Label>
                      <Form.Control
                        type="text"
                        name="latitude"
                        disabled
                        onChange={handleChangeEdit}
                        value={selectedCustomer?.lat || ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      controlId="formCustomerLongitude"
                      className="mt-3"
                    >
                      <Form.Label>ลองติจูด</Form.Label>
                      <Form.Control
                        type="text"
                        name="longitude"
                        disabled
                        onChange={handleChangeEdit}
                        value={selectedCustomer?.long || ""}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="transportType" className="mt-3">
                      <Form.Label>ประเภทขนส่ง</Form.Label>
                      <Form.Control
                        type="text"
                        name="delivery_type"
                        onChange={handleChangeEdit}
                        disabled
                        value={selectedCustomer?.delivery_type || ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="shippingCompany" className="mt-3">
                      <Form.Label>ชื่อขนส่งเอกชน</Form.Label>
                      <Form.Control
                        type="text"
                        name="shipping_company"
                        onChange={handleChangeEdit}
                        disabled
                        value={selectedCustomer?.shipping_company || ""}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
              <Row className="d-flex justify-content-center align-items-center mt-3">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "100%",
                    maxWidth: "400px",
                  }}
                >
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    style={{
                      flex: "1",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      padding: "10px",
                    }}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    style={{
                      flex: "1",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      padding: "10px",
                    }}
                  >
                    บันทึกข้อมูล
                  </Button>
                </div>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
        {/* 
        Delete Modal */}
        {selectedCustomer && (
          <Modal
            show={modalType === "delete" && showModal}
            onHide={handleClose}
            size="lg"
          >
            <Modal.Header closeButton className="modal-header-delete">
              <Modal.Title>ลบร้านค้า</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              คุณต้องการลบร้าน <b>{selectedCustomer.name}</b> หรือไม่?
            </Modal.Body>
            <Modal.Footer
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "15px",
              }}
            >
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{
                  padding: "10px 20px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  backgroundColor: "#6c757d",
                  borderColor: "#6c757d",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  marginRight: "10px",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5a6268")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#6c757d")
                }
              >
                ยกเลิก
              </Button>

              <Button
                variant="danger"
                onClick={() => handleDeleteSubmit(selectedCustomer._id)}
                style={{
                  padding: "10px 20px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  backgroundColor: "#dc3545",
                  borderColor: "#dc3545",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#c82333")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#dc3545")
                }
              >
                ตกลง
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </StaffLayout>
  );
}

export default DetailGroupTransport;
