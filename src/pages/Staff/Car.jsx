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
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillPersonPlusFill, BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import VehiclesService from "../../server/Vehicle"; // Update to Vehicle service
import StaffLayout from "../../layouts/StaffLayout";
import { Link } from "react-router-dom"; // สำหรับสร้างลิงค์
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // ไอคอนจาก react-icons

const Car = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // ใช้สำหรับจัดการ modalType
  const [selectedVehicles, setSelectedVehicles] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // คำค้นหา

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
    VehiclesService.create(createFormData)
      .then((res) => {
        alert("ข้อมูลรถบริษัทถูกบันทึกเรียบร้อยแล้ว");
        setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
        fetchVehicles(); // รีเฟรชข้อมูลพนักงาน

        // ใช้ setTimeout เพื่อรอให้ Modal ปิดก่อนจะเปลี่ยนเส้นทาง
        setTimeout(() => {
          navigate("/Car"); // เปลี่ยนเส้นทางหลังจากปิด Modal
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

    // ตรวจสอบว่า selectedVehicles มีค่า
    if (!selectedVehicles || !selectedVehicles._id) {
      alert("ไม่พบข้อมูลรถบริษัทที่ต้องการแก้ไข");
      return;
    }

    console.log("ข้อมูลที่จะส่งไป:", editFormData);

    VehiclesService.updateVehicles(selectedVehicles._id, editFormData)
      .then((res) => {
        alert("ข้อมูลรถบริษัทถูกแก้ไขเรียบร้อยแล้ว");
        setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
        fetchVehicles(); // รีเฟรชข้อมูลพนักงาน
      })
      .catch((e) => {
        console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล", e);
        alert("ไม่สามารถแก้ไขข้อมูลได้");
      });
  };

  //ลบข้อมูล
  const handleDeleteSubmit = () => {
  if (!selectedVehicles || !selectedVehicles._id) {
    alert("กรุณาเลือกข้อมูลที่ต้องการลบ");
    return;
  }

  VehiclesService.deleteVehicles(selectedVehicles._id) // ลบข้อมูลพนักงาน
    .then((res) => {
      alert("ข้อมูลรถบริษัทถูกลบรียบร้อยแล้ว");
      setShowModal(false); // ปิด Modal หลังจากลบเสร็จ
      fetchVehicles(); // รีเฟรชข้อมูลพนักงาน
    })
    .catch((error) => {
      console.error(
        "เกิดข้อผิดพลาดในการลบข้อมูล",
        error.response || error.message
      );
      alert(error.response?.data?.message || "ไม่สามารถลบข้อมูลได้");
    });
};

  
  const fetchVehicles = () => {
    VehiclesService.getAll()
      .then((res) => {
        console.log(res.data); // ตรวจสอบข้อมูลที่ได้
        setVehicles(res.data.data);
      })
      .catch((e) => {
        console.error("API Error: ", e);
      });
  };

  useEffect(() => {
    fetchVehicles(); // ดึงข้อมูลเมื่อคอมโพเนนต์โหลด
  }, []); // รันแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลด

  const handleShowAdd = () => {
    setSelectedVehicles(null);
    setModalType("add");
    setShowModal(true);
  };

  const handleShowEdit = (vehicle) => {
    setSelectedVehicles(vehicle); // ตั้งค่าพนักงานที่ถูกเลือก
    setModalType("edit");
    setShowModal(true);
    setEditFormData({ ...vehicle }); // ส่งค่า vehicle (รวมทั้ง _id) ไปใน editFormData
  };

  const handleShowDelete = (vehicle) => {
    setSelectedVehicles(vehicle);
    setModalType("delete");
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    (vehicle.register_number || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    // Logic for handling add/edit/delete based on modalType
  };

  const handleClose = () => setShowModal(false);

   const formatDate = (dateString) => {
     if (!dateString) return "-";
     const date = new Date(dateString);
     return date.toLocaleDateString("th-TH", {
       year: "numeric",
       month: "long",
       day: "numeric",
     });
   };
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
                <FaCar
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                จัดการข้อมูลรถบริษัท
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
            <Form className="me-3" style={{ flex: 1 }}>
              <FormControl
                type="text"
                placeholder="ค้นหารถบริษัท (ป้ายทะเบียน)"
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
            <Button
              variant="primary"
              className="d-flex align-items-center"
              onClick={handleShowAdd}
              style={{
                backgroundColor: "#007BFF", // สีฟ้า
                borderColor: "#007BFF", // กำหนดขอบให้เป็นสีฟ้า
                padding: "10px 20px", // ปรับขนาดปุ่ม
                fontSize: "16px", // ปรับขนาดฟอนต์
              }}
            >
              <FaCar size={20} />
            </Button>
          </Col>
        </Row>
        <Card className="mt-4">
          <Card.Header
            style={{
              backgroundColor: "#007BFF", // สีฟ้า
              color: "#fff", // ข้อความสีขาว
              fontSize: "18px", // ขนาดฟอนต์หัวข้อ
              fontWeight: "bold", // หนักเพื่อเน้น
              borderRadius: "8px 8px 0 0", // มุมโค้งมนที่ด้านบน
            }}
          >
            ข้อมูลรถบริษัท
          </Card.Header>
          <Card.Body
            style={{
              padding: "20px", // ขยายพื้นที่ให้เนื้อหาภายใน
              backgroundColor: "#f9f9f9", // สีพื้นหลังเบาๆ
              borderRadius: "0 0 8px 8px", // มุมโค้งมนที่ด้านล่าง
              boxShadow: "0 4px 8px rgba(0, 123, 255, 0.1)", // เงาเบาๆ ให้ดูมีมิติ
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "10%" }} className="text-center">
                    ภาพ
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    ทะเบียนรถ
                  </th>
                  <th style={{ width: "30%" }} className="text-center">
                    ข้อมูลรถ
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    วันที่จดทะเบียน
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      ไม่มีข้อมูลรถ
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td>
                        <img
                          src={vehicle.image || `./images/${vehicle.image_car}`}
                          alt="รถขนส่ง"
                          style={{
                            width: "80px",
                            height: "auto",
                            borderRadius: "50%",
                            border: "2px solid #007BFF",
                          }}
                          className="mx-auto"
                        />
                      </td>
                      <td className="text-center">
                        <Link
                          to={`/vehicles/${vehicle._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {vehicle.register_number || "ไม่ระบุ"}
                        </Link>
                      </td>
                      <td>
                        <p>แบรนด์หรือยี่ห้อ : {vehicle.brand_modal}</p>
                        <p>ประเภทรถ : {vehicle.vehicle_type}</p>
                        <p>สีรถ : {vehicle.vehicle_color}</p>
                      </td>
                      <td className="text-center">
                        {formatDate(vehicle.register_date)}
                      </td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="warning"
                            className="me-2 d-flex align-items-center"
                            onClick={() => handleShowEdit(vehicle)}
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
                            onClick={() => handleShowDelete(vehicle)} // เรียก handleShowDelete เมื่อคลิกปุ่ม
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
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Add Modal */}
        <Modal
          show={modalType === "add" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-add">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaPlus style={{ marginRight: "8px" }} />
              ข้อมูลรถบริษัทที่ต้องการเพิ่ม
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateSubmit}>
              {/* ป้ายทะเบียน */}
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>ป้ายทะเบียน</Form.Label>
                    <Form.Control
                      type="text"
                      name="register_number"
                      placeholder="กรุณากรอกป้ายทะเบียน"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* ยี่ห้อหรือรุ่นรถ */}
                  <Form.Group className="mt-3">
                    <Form.Label>ยี่ห้อ/รุ่นรถ</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand_modal"
                      placeholder="กรุณากรอกยี่ห้อหรือรุ่นรถ"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {/* ประเภทรถ */}
                  <Form.Group className="mt-3">
                    <Form.Label>ประเภทรถ</Form.Label>
                    <Form.Control
                      as="select"
                      name="vehicle_type"
                      onChange={handleChangeCreate}
                    >
                      <option value="">เลือกประเภท</option>
                      <option value="รถเก๋ง">รถเก๋ง</option>
                      <option value="รถกระบะคอก">รถกระบะคอก</option>
                      <option value="รถกระบะตู้ทึบ">รถกระบะตู้ทึบ</option>
                      {/* เพิ่มประเภทอื่น ๆ ที่ต้องการ */}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* สีรถ */}
                  <Form.Group className="mt-3">
                    <Form.Label>สีรถ</Form.Label>
                    <Form.Control
                      type="text"
                      name="vehicle_color"
                      placeholder="กรุณากรอกสีรถ"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {/* วันที่ทะเบียน */}
                  <Form.Group className="mt-3">
                    <Form.Label>วันที่จดทะเบียน</Form.Label>
                    <Form.Control
                      type="date"
                      name="register_date"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* รูปภาพรถ */}
                  <Form.Group className="mt-3">
                    <Form.Label>รูปภาพรถ</Form.Label>
                    <Form.Control
                      type="file"
                      name="image_car"
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

        {/* แก้ไขข้อมูลรถบริษัท */}
        <Modal
          show={modalType === "edit" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-edit">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaEdit style={{ marginRight: "8px" }} />
              ข้อมูลรถบริษัทที่ต้องการแก้ไข
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Row>
                <Col md={6}>
                  {/* ป้ายทะเบียน */}
                  <Form.Group>
                    <Form.Label>ป้ายทะเบียน</Form.Label>
                    <Form.Control
                      type="text"
                      name="register_number"
                      value={editFormData.register_number || ""}
                      onChange={handleEditSubmit}
                      placeholder="กรุณากรอกป้ายทะเบียน"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* ยี่ห้อหรือรุ่นรถ */}
                  <Form.Group className="mt-3">
                    <Form.Label>ยี่ห้อ/รุ่นรถ</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand_modal"
                      value={editFormData.brand_modal || ""}
                      onChange={handleEditSubmit}
                      placeholder="กรุณากรอกยี่ห้อหรือรุ่นรถ"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {/* ประเภทรถ */}
                  <Form.Group className="mt-3">
                    <Form.Label>ประเภทรถ</Form.Label>
                    <Form.Control
                      as="select"
                      name="vehicle_type"
                      value={editFormData.vehicle_type || ""}
                      onChange={handleEditSubmit}
                    >
                      <option value="">เลือกประเภท</option>
                      <option value="รถบรรทุก">รถบรรทุก</option>
                      <option value="จักรยานยนต์">จักรยานยนต์</option>
                      <option value="รถเก๋ง">รถเก๋ง</option>
                      {/* เพิ่มประเภทอื่น ๆ ที่ต้องการ */}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* สีรถ */}
                  <Form.Group className="mt-3">
                    <Form.Label>สีรถ</Form.Label>
                    <Form.Control
                      type="text"
                      name="vehicle_color"
                      value={editFormData.vehicle_color || ""}
                      onChange={handleChangeEdit}
                      placeholder="กรุณากรอกสีรถ"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {/* วันที่ทะเบียน */}
                  <Form.Group className="mt-3">
                    <Form.Label>วันที่จดทะเบียน</Form.Label>
                    <Form.Control
                      type="date"
                      name="register_date"
                      value={editFormData.register_date || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* รูปภาพรถ */}
                  <Form.Group className="mt-3">
                    <Form.Label>รูปภาพรถ</Form.Label>
                    <Form.Control type="file" name="image_car" />
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

        {/* Modal สำหรับการลบข้อมูลรถบริษัท */}
        <Modal
          show={modalType === "delete" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-delete">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaTrash style={{ marginRight: "8px" }} />
              คุณต้องการลบรถบริษัททะเบียน {
                selectedVehicles?.register_number
              }{" "}
              หรือไม่ ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ยืนยันการลบข้อมูลรถบริษัททะเบียน{" "}
              {selectedVehicles?.register_number} ?
            </p>
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

export default Car;
