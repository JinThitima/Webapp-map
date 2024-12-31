import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  FormControl,
  Card,
  Modal,
  NavLink,
} from "react-bootstrap";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import StaffLayout from "../../layouts/StaffLayout";
import { Link, useNavigate } from "react-router-dom";
import CustomersService from "../../server/Customer";
import ShippingCompaniesService from "../../server/Shipping_companies";
import { BsShop, BsFillPersonPlusFill } from "react-icons/bs";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // ไอคอนจาก react-icons

const Customer = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // ใช้สำหรับจัดการ modalType
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // คำค้นหา

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shippingCompanies, setShippingCompanies] = useState([]);

  const [transportType, setTransportType] = useState("");
  const [privateTransport, setPrivateTransport] = useState("");

  //เพิ่มข้อมูล
  const [createFormData, setCreateFormData] = useState({});
  const handleChangeCreate = (event) => {
    setCreateFormData({
      ...createFormData,
      [event.target.name]: event.target.value,
    });
  };
  const handleCreateSubmit = (event) => {
    event.preventDefault();
    console.log(createFormData);
    CustomersService.create(createFormData)
      .then((res) => {
        alert("ข้อมูลลูกค้าถูกบันทึกเรียบร้อยแล้ว");
        setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
        fetchCustomer(); // รีเฟรชข้อมูลพนักงาน

        // ใช้ setTimeout เพื่อรอให้ Modal ปิดก่อนจะเปลี่ยนเส้นทาง
        setTimeout(() => {
          navigate("/Customer"); // เปลี่ยนเส้นทางหลังจากปิด Modal
        }, 300); // ใช้เวลา 300ms ก่อนที่จะเปลี่ยนเส้นทาง
      })
      .catch((e) => console.log(e));
  };

  //แก้ไขข้อมูล
  const [editFormData, setEditFormData] = useState({});
  const handleChangeEdit = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  // เพิ่มฟังก์ชัน handleEditSubmit สำหรับบันทึกข้อมูลที่แก้ไข
  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (!selectedCustomers || !selectedCustomers._id) {
      alert("ไม่พบข้อมูลลูกค้าที่ต้องการแก้ไข");
      return;
    }

    console.log("ข้อมูลที่จะส่งไป:", editFormData);

    CustomersService.updateCustomers(selectedCustomers._id, editFormData)
      .then((res) => {
        alert("ข้อมูลลูกค้าถูกแก้ไขเรียบร้อยแล้ว");
        setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
        fetchCustomer(); // รีเฟรชข้อมูลลูกค้า
      })
      .catch((e) => {
        console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล", e);
        alert("ไม่สามารถแก้ไขข้อมูลได้");
      });
  };

  const handleDeleteSubmit = () => {
    if (!selectedCustomers || !selectedCustomers._id) {
      alert("กรุณาเลือกข้อมูลที่ต้องการลบ");
      return;
    }

    CustomersService.deleteCustomers(selectedCustomers._id) // ลบข้อมูลพนักงาน
      .then((res) => {
        alert("ข้อมูลลูกค้าถูกลบเรียบร้อยแล้ว");
        setShowModal(false); // ปิด Modal หลังจากลบเสร็จ
        fetchCustomer(); // รีเฟรชข้อมูลพนักงาน
      })
      .catch((error) => {
        console.error(
          "เกิดข้อผิดพลาดในการลบข้อมูล",
          error.response || error.message
        );
        alert(error.response?.data?.message || "ไม่สามารถลบข้อมูลได้");
      });
  };
  
  const handleTransportTypeChange = (event) => {
    setTransportType(event.target.value);
    if (event.target.value !== "private") {
      setPrivateTransport("");
    }
  };

  const fetchCustomer = async () => {
    try {
      const res = await CustomersService.getAll();
      setCustomer(res.data.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchShippingCompanies = async () => {
    try {
      const res = await ShippingCompaniesService.getAll();
      setShippingCompanies(res.data.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCustomer();
    fetchShippingCompanies();
  }, []);

  const handleShowAdd = () => {
    setSelectedCustomers(null);
    setModalType("add");
    setShowModal(true);
  };

  const handleShowEdit = (customer) => {
    setSelectedCustomers(customer); // ตั้งค่าพนักงานที่ถูกเลือก
    setModalType("edit");
    setShowModal(true);
    setEditFormData({ ...customer }); // ส่งค่า employee (รวมทั้ง _id) ไปใน editFormData
  };

  const handleShowDelete = (customer) => {
    setSelectedCustomers(customer);
    setModalType("delete"); // ตั้งค่าประเภทของ Modal เป็น "delete"
    setShowModal(true); // แสดง Modal
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // ฟิลเตอร์ลูกค้าโดยการค้นหาจากชื่อ
  const filteredCustomers = customer.filter((cust) =>
    cust.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    // Logic for handling add/edit/delete based on modalType
  };

  //ส่งค่าประเภทเพิ่มข้อมูล
  const handleDeliveryTypeChange = (e) => {
    const { name, value } = e.target;

    // อัปเดตค่า transportType
    setTransportType(value);

    // ส่งค่าผ่าน handleChangeCreate
    handleChangeCreate({ target: { name, value } });
  };

  ///ส่งค่าชื่อขนส่งเอกชนเพิ่มข้อมูล
  const handleChangeCombined = (e) => {
    handleChangeCreate(e); // เรียกฟังก์ชันแรก
    setPrivateTransport(e.target.value); // อัปเดตค่า `privateTransport`
  };

  //ส่งค่าประเภทแก้ไขข้อมูล
  const handleEditDLTChange = (e) => {
    const { name, value } = e.target;

    // อัปเดตค่า transportType
    setTransportType(value);

    // ส่งค่าผ่าน handleChangeCreate
    handleChangeEdit({ target: { name, value } });
  };

  ///ส่งค่าชื่อขนส่งเอกชนแก้ไขข้อมูล
  const handleEditCombined = (e) => {
    handleChangeEdit(e); // เรียกฟังก์ชันแรก
    setPrivateTransport(e.target.value); // อัปเดตค่า `privateTransport`
  };

  const handleClose = () => setShowModal(false);
  return (
    <StaffLayout>
      <Container>
        <Row className="my-4 align-items-center">
          <Col md={12} className="text-center">
            <h2
              className="main-title"
              style={{
                fontWeight: "bold",
                fontSize: "2.5rem",
                color: "#4A90E2",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <BsShop
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                จัดการข้อมูลลูกค้า
              </span>
            </h2>
            <hr
              style={{
                border: "none",
                height: "4px",
                background: "linear-gradient(90deg, #4A90E2, #56CCF2)",
                margin: "20px 0",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col
            md={12}
            className="d-flex justify-content-end align-items-center"
          >
            {/* Form สำหรับค้นหาลูกค้า */}
            <Form className="me-3" style={{ flex: 1 }}>
              <FormControl
                type="text"
                placeholder="ค้นหาลูกค้า"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  padding: "10px 15px", // ขยายขนาดภายในช่องค้นหา
                  fontSize: "16px", // ปรับขนาดฟอนต์
                  borderRadius: "8px", // มุมโค้งมน
                  border: "2px solid #007BFF", // กรอบสีฟ้า
                  boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)", // เงาบางๆ
                  transition: "box-shadow 0.3s ease-in-out", // เพิ่มการเคลื่อนไหวตอน hover
                  maxWidth: "350px", // กำหนดความกว้างสูงสุดของช่องค้นหา
                  width: "100%", // ให้กว้างเต็มที่จนถึง maxWidth
                }}
                className="mr-sm-2"
              />
            </Form>
            {/* ปุ่มเพิ่มลูกค้า */}
            <Button
              variant="primary"
              className="d-flex align-items-center"
              style={{
                backgroundColor: "#007BFF", // สีฟ้า
                borderColor: "#007BFF", // กำหนดขอบให้เป็นสีฟ้า
                padding: "10px 20px", // ปรับขนาดปุ่ม
                fontSize: "16px", // ปรับขนาดฟอนต์
              }}
              onClick={handleShowAdd}
            >
              <BsShop size={20} />
            </Button>
          </Col>
        </Row>

        <br />
        <Card>
          <Card.Header
            style={{
              backgroundColor: "#007BFF", // สีฟ้า
              color: "#fff", // ข้อความสีขาว
              fontSize: "18px", // ขนาดฟอนต์หัวข้อ
              fontWeight: "bold", // หนักเพื่อเน้น
              borderRadius: "8px 8px 0 0", // มุมโค้งมนที่ด้านบน
            }}
          >
            ข้อมูลลูกค้า
          </Card.Header>
          <Card.Body
            style={{
              padding: "20px", // ขยายพื้นที่ให้เนื้อหาภายใน
              backgroundColor: "#f9f9f9", // สีพื้นหลังเบาๆ
              borderRadius: "0 0 8px 8px", // มุมโค้งมนที่ด้านล่าง
              boxShadow: "0 4px 8px rgba(0, 123, 255, 0.1)", // เงาเบาๆ ให้ดูมีมิติ
            }}
          >
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: "10%" }} className="text-center">
                    รูปภาพ
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    ชื่อลูกค้า
                  </th>
                  <th style={{ width: "30%" }} className="text-center">
                    ที่อยู่
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    เบอร์ติดต่อ
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    ประเภทการขนส่ง
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cust, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        <img
                          src={cust.image || "../images/Store.png"}
                          alt={cust.name || "ไม่ระบุ"}
                          style={{
                            width: "80px",
                            height: "70px",
                            borderRadius: "50%", // ให้รูปภาพมีมุมโค้งมน
                            border: "2px solid #007BFF", // ขอบสีฟ้า
                          }}
                          className="mx-auto"
                        />
                      </td>
                      <td>
                        <Link
                          to={`/customers/${cust._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {cust.name || "ไม่ระบุ"}
                        </Link>
                      </td>
                      <td>{cust.address || "ไม่ระบุ"}</td>
                      <td className="text-center">{cust.tel || "ไม่ระบุ"}</td>
                      <td className="text-center">
                        {cust.delivery_type || "ไม่ระบุ"}
                      </td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="warning"
                            className="me-2 d-flex align-items-center"
                            onClick={() => handleShowEdit(cust)}
                            style={{
                              backgroundColor: "#ffc107", // สีเหลือง
                              borderColor: "#ffc107",
                              padding: "8px 16px", // ปรับขนาดปุ่ม
                              fontSize: "14px", // ขนาดฟอนต์
                            }}
                          >
                            <BsPencilSquare />
                          </Button>
                          <Button
                            variant="danger"
                            className="d-flex align-items-center"
                            onClick={() => handleShowDelete(cust)}
                            style={{
                              backgroundColor: "#dc3545", // สีแดง
                              borderColor: "#dc3545",
                              padding: "8px 16px", // ปรับขนาดปุ่ม
                              fontSize: "14px", // ขนาดฟอนต์
                            }}
                          >
                            <BsTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <strong>ไม่พบข้อมูลลูกค้าตรงกับคำค้นหา</strong>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Modal สำหรับเพิ่มข้อมูลลูกค้า */}
        <Modal
          show={modalType === "add" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-add">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaPlus style={{ marginRight: "8px" }} />
              ข้อมูลลูกค้าที่ต้องการเพิ่ม
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerShopName" className="mt-3">
                    <Form.Label>ชื่อร้านค้า</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="กรุณากรอกร้านค้า"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    controlId="formCustomerOwnerFirstName"
                    className="mt-3"
                  >
                    <Form.Label>ชื่อเจ้าของร้าน</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact_person"
                      placeholder="กรุณากรอกชื่อเจ้าของร้าน"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerAddress" className="mt-3">
                    <Form.Label>ที่อยู่</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      placeholder="กรุณากรอกที่อยู่ร้านค้า"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCustomerPhone" className="mt-3">
                    <Form.Label>เบอร์ติดต่อ</Form.Label>
                    <Form.Control
                      type="text"
                      name="tel"
                      placeholder="กรุณากรอกเบอร์โทรติดต่อ"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerLatitude" className="mt-3">
                    <Form.Label>ละติจูด</Form.Label>
                    <Form.Control
                      type="text"
                      name="lat"
                      placeholder="กรุณากรอกละติจูด"
                      onChange={handleChangeCreate}
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
                      name="long"
                      placeholder="กรุณากรอกลองติจูด"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerMapUrl" className="mt-3">
                    <Form.Label>แผนที่ URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="map_url"
                      placeholder="กรุณากรอกแผนที่ URL"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCustomerImage" className="mt-3">
                    <Form.Label>ภาพร้านค้า</Form.Label>
                    <Form.Control
                      type="file"
                      name="image_customer"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                {/* ประเภทขนส่ง และ ชื่อขนส่งเอกชน */}
                <Col md={6}>
                  <Form.Group controlId="transportType" className="mt-3">
                    <Form.Label>ประเภทขนส่ง</Form.Label>
                    <Form.Select
                      value={transportType}
                      name="delivery_type" // ส่งชื่อฟิลด์ที่ต้องการไปด้วย
                      onChange={handleDeliveryTypeChange}
                    >
                      <option>-- กรุณาเลือกประเภทขนส่ง --</option>
                      <option value="รถบริษัท">รถบริษัท</option>
                      <option value="ขนส่งเอกชน">ขนส่งเอกชน</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                {transportType === "ขนส่งเอกชน" && (
                  <Col md={6}>
                    <Form.Group controlId="privateTransport" className="mt-3">
                      <Form.Label>เลือกชื่อขนส่งเอกชน</Form.Label>
                      <Form.Select
                        value={privateTransport}
                        name="shipping_company"
                        onChange={handleChangeCombined} // ใช้ฟังก์ชันที่รวมแล้ว
                      >
                        <option value="">-- กรุณาเลือกชื่อขนส่ง --</option>
                        {shippingCompanies.map((company) => (
                          <option key={company.id} value={company.name}>
                            {company.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
              </Row>
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

        {/* Modal สำหรับแก้ไขข้อมูลลูกค้า */}
        <Modal
          show={modalType === "edit" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-edit">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaEdit style={{ marginRight: "8px" }} />
              ข้อมูลลูกค้าที่ต้องการแก้ไข
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerShopName">
                    <Form.Label>ชื่อร้านค้า</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editFormData.name || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCustomerOwnerFirstName">
                    <Form.Label>ชื่อเจ้าของร้าน</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact_person"
                      value={editFormData.contact_person || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerAddress" className="mt-3">
                    <Form.Label>ที่อยู่</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      value={editFormData.address || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCustomerPhone" className="mt-3">
                    <Form.Label>เบอร์ติดต่อ</Form.Label>
                    <Form.Control
                      type="text"
                      name="tel"
                      value={editFormData.tel || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerLatitude">
                    <Form.Label>ละติจูด</Form.Label>
                    <Form.Control
                      type="text"
                      name="lat"
                      value={editFormData.lat || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCustomerLongitude">
                    <Form.Label>ลองติจูด</Form.Label>
                    <Form.Control
                      type="text"
                      name="long"
                      value={editFormData.long || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCustomerMapUrl" className="mt-3">
                    <Form.Label>แผนที่ URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="map_url"
                      value={editFormData.map_url || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCustomerImage" className="mt-3">
                    <Form.Label>ภาพร้านค้า</Form.Label>
                    <Form.Control
                      type="file"
                      name="image_customer"
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          image_customer: e.target.files[0],
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="transportType" className="mt-3">
                  <Form.Label>
                    ตอนนี้ประเภทขนส่ง :{" "}
                    <span style={{ fontWeight: "bold", color: "#ff6347" }}>
                      {editFormData.delivery_type || ""}
                    </span>
                  </Form.Label>
                  <Form.Select
                    name="delivery_type"
                    value={transportType}
                    onChange={handleEditDLTChange}
                    // {editFormData.delivery_type || ""}
                  >
                    <option>-- กรุณาเลือกประเภทขนส่งที่เหมาะสม --</option>
                    <option value="รถบริษัท">รถบริษัท</option>
                    <option value="ขนส่งเอกชน">ขนส่งเอกชน</option>
                  </Form.Select>
                </Form.Group>

                {transportType === "ขนส่งเอกชน" && (
                  <Form.Group
                    as={Col}
                    controlId="privateTransport"
                    className="mt-3"
                  >
                    <Form.Label>เลือกชื่อขนส่งเอกชน</Form.Label>
                    <Form.Select
                      value={privateTransport}
                      name="shipping_company"
                      onChange={handleEditCombined}
                    >
                      <option value="">-- กรุณาเลือกชื่อขนส่ง --</option>
                      {shippingCompanies.map((company) => (
                        <option key={company._id} value={company.name}>
                          {company.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}
              </Row>

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

        {/* Modal สำหรับลบข้อมูลลูกค้า */}
        <Modal
          show={modalType === "delete" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaTrash style={{ marginRight: '8px' }}  />
              คุณต้องการลบลูกค้า {selectedCustomers?.name} หรือไม่ ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>ยืนยันการลบข้อมูลลูกค้า {selectedCustomers?.name} ?</p>
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
                marginRight: "10px", // ให้มีช่องว่างระหว่างปุ่ม
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a6268")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
            >
              ยกเลิก
            </Button>

            <Button
              variant="danger"
              onClick={handleDeleteSubmit}
              style={{
                padding: "10px 20px",
                fontWeight: "bold",
                fontSize: "16px",
                backgroundColor: "#dc3545",
                borderColor: "#dc3545",
                borderRadius: "5px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
            >
              ตกลง
            </Button>
          </Modal.Footer>
        </Modal>
        <br />
      </Container>
    </StaffLayout>
  );
};

export default Customer;
