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
} from "react-bootstrap";
import { BsFillPersonPlusFill, BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaTruck } from "react-icons/fa"; // FontAwesome truck icon
import Shipping_companiesService from "../../server/Shipping_companies"; // Ensure this is correct
import StaffLayout from "../../layouts/StaffLayout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // ไอคอนจาก react-icons

const PrivateTransport = () => {
  const navigate = useNavigate();
  const [shippingCompanies, setShippingCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedShippingCompany, setSelectedShippingCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Data for adding new shipping company
  const [createFormData, setCreateFormData] = useState({});
  const handleChangeCreate = (event) => {
    setCreateFormData({
      ...createFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    Shipping_companiesService.create(createFormData)
      .then(() => {
        alert("ข้อมูลขนส่งเอกชนถูกบันทึกเรียบร้อยแล้ว");
        setShowModal(false);
        fetchShippingCompanies(); // ใช้ชื่อฟังก์ชันที่ถูกต้อง
        setTimeout(() => {
          navigate("/PrivateTransport"); // Redirect after 300ms
        }, 300);
      })
      .catch((e) => console.log(e));
  };

  // Data for editing existing shipping company
  const [editFormData, setEditFormData] = useState({});

  // Handle changes in the edit form
  const handleChangeEdit = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  // เพิ่มฟังก์ชัน handleEditSubmit สำหรับบันทึกข้อมูลที่แก้ไข
const handleEditSubmit = (event) => {
  event.preventDefault();

  if (!selectedShippingCompany || !selectedShippingCompany._id) {
    alert("ไม่พบข้อมูลขนส่งเอกชนที่ต้องการแก้ไข");
    return;
  }

  console.log("ข้อมูลที่จะส่งไป:", editFormData);

  Shipping_companiesService.updateShipping_companies(
    selectedShippingCompany._id,
    editFormData
  )
    .then((res) => {
      alert("ข้อมูลขนส่งเอกชนถูกแก้ไขเรียบร้อยแล้ว");
      setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
      fetchShippingCompanies(); // รีเฟรชข้อมูลพนักงาน
    })
    .catch((e) => {
      console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล", e);
      alert("ไม่สามารถแก้ไขข้อมูลได้");
    });
  };
  
  // Deleting selected shipping company
  const handleDeleteSubmit = () => {
    if (selectedShippingCompany) {
      Shipping_companiesService.deleteShipping_companies(
        selectedShippingCompany._id
      )
        .then(() => {
          alert("ข้อมูลขนส่งเอกชนถูกลบเรียบร้อยแล้ว");
          setShowModal(false);
          fetchShippingCompanies();
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการลบข้อมูล", error);
          alert("ไม่สามารถลบข้อมูลได้");
        });
    }
  };

  const fetchShippingCompanies = () => {
    Shipping_companiesService.getAll()
      .then((res) => {
        setShippingCompanies(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchShippingCompanies();
  }, []);

  const handleShowAdd = () => {
    setSelectedShippingCompany(null);
    setModalType("add");
    setShowModal(true);
  };

  const handleShowEdit = (shippingCompany) => {
    setSelectedShippingCompany(shippingCompany);
    setModalType("edit");
    setShowModal(true);
    setEditFormData({ ...shippingCompany});
  };

  const handleShowDelete = (shippingCompany) => {
    setSelectedShippingCompany(shippingCompany);
    setModalType("delete");
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredShippingCompanies = shippingCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <FaTruck
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                จัดการข้อมูลขนส่งเอกชน
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
            {/* Form สำหรับค้นหาขนส่งเอกชน */}
            <Form className="me-3" style={{ flex: 1 }}>
              <FormControl
                type="text"
                placeholder="ค้นหาขนส่งเอกชน"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  padding: "10px 15px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "2px solid #007BFF",
                  boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)",
                  transition: "box-shadow 0.3s ease-in-out",
                  maxWidth: "350px",
                  width: "100%",
                }}
                className="mr-sm-2"
              />
            </Form>

            {/* ปุ่มเพิ่มขนส่ง */}
            <Button
              variant="primary"
              className="d-flex align-items-center"
              style={{
                backgroundColor: "#007BFF",
                borderColor: "#007BFF",
                padding: "10px 20px",
                fontSize: "16px",
              }}
              onClick={handleShowAdd}
            >
              <BsFillPersonPlusFill size={20} />
            </Button>
          </Col>
        </Row>

        <br />
        <Card>
          <Card.Header
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "8px 8px 0 0",
            }}
          >
            ข้อมูลขนส่งเอกชน
          </Card.Header>
          <Card.Body
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "0 0 8px 8px",
              boxShadow: "0 4px 8px rgba(0, 123, 255, 0.1)",
            }}
          >
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: "15%" }} className="text-center">
                    ชื่อขนส่ง
                  </th>
                  <th style={{ width: "30%" }} className="text-center">
                    ที่อยู่ขนส่ง
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    เบอร์
                  </th>
                  <th style={{ width: "5%" }} className="text-center">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredShippingCompanies.map((shipping_company) => (
                  <tr key={shipping_company.id}>
                    <td className="text-center">
                      <Link
                        to={`/Shipping_companies/${shipping_company._id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {shipping_company.name || "ไม่ระบุ"}
                      </Link>
                    </td>
                    <td>{shipping_company.address || "ไม่ระบุ"}</td>
                    <td className="text-center">
                      {shipping_company.tel || "ไม่ระบุ"}
                    </td>

                    <td>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="warning"
                          className="me-2 d-flex align-items-center"
                          onClick={() => handleShowEdit(shipping_company)}
                        >
                          <BsPencilSquare />
                        </Button>
                        <Button
                          variant="danger"
                          className="d-flex align-items-center"
                          onClick={() => handleShowDelete(shipping_company)}
                        >
                          <BsTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Modal สำหรับเพิ่ม */}
        <Modal
          show={modalType === "add" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-add">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaPlus style={{ marginRight: "8px" }} />
              ข้อมูลขนส่งเอกชนที่ต้องการเพิ่ม
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTransportName">
                    <Form.Label>ชื่อขนส่ง</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="กรุณากรอกชื่อขนส่ง"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formTransportPhone">
                    <Form.Label>เบอร์โทร</Form.Label>
                    <Form.Control
                      type="text"
                      name="tel"
                      placeholder="กรุณากรอกเบอร์โทร"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTransportAddress">
                    <Form.Label>ที่อยู่ขนส่ง</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="กรุณากรอกที่อยู่"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formTransportMapUrl">
                    <Form.Label>แผนที่ (URL)</Form.Label>
                    <Form.Control
                      type="text"
                      name="map_url"
                      placeholder="กรุณากรอก URL แผนที่"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTransportLatitude">
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
                  <Form.Group controlId="formTransportLongitude">
                    <Form.Label>ลองจิจูด</Form.Label>
                    <Form.Control
                      type="text"
                      name="long"
                      placeholder="กรุณากรอกลองจิจูด"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
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

        {/* Modal สำหรับแก้ไข */}
        <Modal
          show={modalType === "edit" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-edit">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaEdit style={{ marginRight: "8px" }} />
              ข้อมูลขนส่งเอกชนที่ต้องการแก้ไข
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEditSubmit}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTransportName">
                    <Form.Label>ชื่อขนส่ง</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editFormData.name || ""}
                      placeholder="กรุณากรอกชื่อขนส่ง"
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formTransportPhone">
                    <Form.Label>เบอร์โทร</Form.Label>
                    <Form.Control
                      type="text"
                      name="tel"
                      value={editFormData.tel || ""}
                      placeholder="กรุณากรอกเบอร์โทร"
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTransportAddress">
                    <Form.Label>ที่อยู่ขนส่ง</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={editFormData.address || ""}
                      placeholder="กรุณากรอกที่อยู่"
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formTransportMapUrl">
                    <Form.Label>แผนที่ (URL)</Form.Label>
                    <Form.Control
                      type="text"
                      name="map_url"
                      value={editFormData.map_url || ""}
                      placeholder="กรุณากรอก URL แผนที่"
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTransportLatitude">
                    <Form.Label>ละติจูด</Form.Label>
                    <Form.Control
                      type="text"
                      name="lat"
                      value={editFormData.lat || ""}
                      placeholder="กรุณากรอกละติจูด"
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formTransportLongitude">
                    <Form.Label>ลองจิจูด</Form.Label>
                    <Form.Control
                      type="text"
                      name="long"
                      value={editFormData.long || ""}
                      placeholder="กรุณากรอกลองจิจูด"
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
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
            </Modal.Body>
          </Form>
        </Modal>

        {/* Modal สำหรับลบ */}
        <Modal
          show={modalType === "delete" && showModal}
          onHide={handleClose}
          size="lg" // เพิ่มขนาดให้ใหญ่ขึ้น
        >
          <Modal.Header closeButton className="modal-header-delete">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaTrash style={{ marginRight: "8px" }} />
              คุณต้องการลบขนส่งเอกชน {selectedShippingCompany?.name} หรือไม่ ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>ยืนยันการลบข้อมูลขนส่งเอกชน {selectedShippingCompany?.name} ?</p>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={handleClose}
              >
                ยกเลิก
              </Button>
              <Button variant="danger" onClick={handleDeleteSubmit}>
                ยืนยันการลบ
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </StaffLayout>
  );
};

export default PrivateTransport;
