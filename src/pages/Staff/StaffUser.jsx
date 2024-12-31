import React, { useState, useEffect, useRef } from "react";
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
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import StaffLayout from "../../layouts/StaffLayout";
import EmployeesService from "../../server/Employee"; // เพิ่มการใช้งาน EmployeesService
import { BsPerson, BsFillPersonPlusFill } from "react-icons/bs";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // ไอคอนจาก react-icons

const StaffUser = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]); // เปลี่ยนจาก customer เป็น employees
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // ใช้สำหรับจัดการ modalType
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // คำค้นหา

  const [selectedFile, setSelectedFile] = useState(null); // State เก็บไฟล์ที่เลือก
  const [preview, setPreview] = useState(""); // แสดงรูปตัวอย่าง

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
    EmployeesService.create(createFormData)
      .then((res) => {
        alert("ข้อมูลพนักงานถูกบันทึกเรียบร้อยแล้ว");
        setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
        fetchEmployees(); // รีเฟรชข้อมูลพนักงาน

        // ใช้ setTimeout เพื่อรอให้ Modal ปิดก่อนจะเปลี่ยนเส้นทาง
        setTimeout(() => {
          navigate("/StaffUser"); // เปลี่ยนเส้นทางหลังจากปิด Modal
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

    // ตรวจสอบว่า selectedEmployee มีค่า
    if (!selectedEmployee || !selectedEmployee._id) {
      alert("ไม่พบข้อมูลพนักงานที่ต้องการแก้ไข");
      return;
    }

    console.log("ข้อมูลที่จะส่งไป:", editFormData);

    EmployeesService.updateEmployees(selectedEmployee._id, editFormData)
      .then((res) => {
        alert("ข้อมูลพนักงานถูกแก้ไขเรียบร้อยแล้ว");
        setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
        fetchEmployees(); // รีเฟรชข้อมูลพนักงาน
      })
      .catch((e) => {
        console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล", e);
        alert("ไม่สามารถแก้ไขข้อมูลได้");
      });
  };

  //ลบข้อมูล
  const handleDeleteSubmit = () => {
    if (selectedEmployee) {
      EmployeesService.deleteEmployees(selectedEmployee._id) // ลบข้อมูลพนักงาน
        .then((res) => {
          alert("ข้อมูลพนักงานถูกลบเรียบร้อยแล้ว");
          setShowModal(false); // ปิด Modal หลังจากลบเสร็จ
          fetchEmployees(); // รีเฟรชข้อมูลพนักงาน
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการลบข้อมูล", error);
          alert("ไม่สามารถลบข้อมูลได้");
        });
    }
  };

  const fetchEmployees = () => {
    EmployeesService.getAll() // ใช้ EmployeesService
      .then((res) => {
        console.log(res.data.data);
        setEmployees(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchEmployees(); // เรียกใช้ฟังก์ชันที่แก้ไขใหม่
  }, []);

  const handleShowAdd = () => {
    setSelectedEmployee(null);
    setModalType("add");
    setShowModal(true);
  };

  const handleShowEdit = (employee) => {
    setSelectedEmployee(employee); // ตั้งค่าพนักงานที่ถูกเลือก
    setModalType("edit");
    setShowModal(true);
    setEditFormData({ ...employee }); // ส่งค่า employee (รวมทั้ง _id) ไปใน editFormData
  };

  const handleShowDelete = (employee) => {
    setSelectedEmployee(employee);
    setModalType("delete"); // ตั้งค่าประเภทของ Modal เป็น "delete"
    setShowModal(true); // แสดง Modal
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(
    (emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()) // ค้นหาพนักงาน
  );

  const handleSubmit = (event) => {
    event.preventDefault();
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
                <BsPerson
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                จัดการข้อมูลผู้ใช้งาน
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
            {/* Form สำหรับค้นหา */}
            <Form className="me-3" style={{ flex: 1 }}>
              <FormControl
                type="text"
                placeholder="ค้นหาผู้ใช้งาน"
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
              <BsFillPersonPlusFill size={20} />
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
            ข้อมูลผู้ใช้งาน
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
                    ชื่อพนักงาน
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    ชื่อผู้ใช้งาน
                  </th>
                  <th style={{ width: "25%" }} className="text-center">
                    ประเภทผู้ใช้งาน
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    สถานะ
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <strong>ไม่มีข้อมูลที่ตรงกับการค้นหา</strong>
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="text-center">
                        <img
                          src={emp.image || "./images/admin.png"} // หากมีรูปภาพจะแสดงรูปที่อัพโหลด
                          alt="พนักงาน"
                          style={{
                            width: "80px",
                            height: "auto",
                            borderRadius: "50%", // ให้รูปภาพมีมุมโค้งมน
                            border: "2px solid #007BFF", // ขอบสีฟ้า
                          }}
                          className="mx-auto"
                        />
                      </td>
                      <td className="text-start">
                        <NavLink
                          to={`/employees/${emp._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {emp.name}
                        </NavLink>
                      </td>
                      <td className="text-center">{emp.username}</td>
                      <td className="text-center">
                        <span>
                          {emp.type}
                        </span>
                      </td>
                      <td className="text-center">
                        <span
                          style={{
                            color: emp.status === "active" ? "green" : "red",
                          }}
                        >
                          {emp.status === "active"
                            ? "พร้อมใช้งาน"
                            : "ไม่พร้อมใช้งาน"}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="warning"
                            className="me-2 d-flex align-items-center"
                            onClick={() => handleShowEdit(emp)}
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
                            onClick={() => handleShowDelete(emp)} // เรียก handleShowDelete เมื่อคลิกปุ่ม
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

        {/* Modal สำหรับเพิ่มพนักงาน */}
        <Modal
          show={modalType === "add" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-add">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaPlus style={{ marginRight: "8px" }} />
              ข้อมูลพนักงานที่ต้องการเพิ่ม
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName" className="mt-3">
                    <Form.Label>ชื่อ-นามสกุล</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="ชื่อ-นามสกุล"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPhone" className="mt-3">
                    <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="กรอกชื่อผู้ใช้งาน"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>เบอร์โทร</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="กรอกเบอร์โทร"
                      name="phone"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="กรอกอีเมล"
                      name="email"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="กรอกรหัสผ่าน"
                      name="password"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formStatus" className="mt-3">
                    <Form.Label>ประเภทผู้ใช้งาน</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      onChange={handleChangeCreate}
                    >
                      <option>--เลือกประเภท--</option>
                      <option value="1">เจ้าหน้าที่ประสานงานขนส่ง</option>
                      <option value="2">พนักงานขับรถส่งสินค้า</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formImage" className="mt-3">
                    <Form.Label>อัพโหลดรูปภาพพนักงาน</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      name="image_employee"
                      onChange={handleChangeCreate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formStatus" className="mt-3">
                    <Form.Label>สถานะพนักงาน</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      onChange={handleChangeCreate}
                    >
                      <option>--เลือกสถานะ--</option>
                      <option value="active">พร้อมใช้งาน</option>
                      <option value="inactive">ไม่พร้อมใช้งาน</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <br />
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

        {/* Modal สำหรับแก้ไขพนักงาน */}
        <Modal
          show={modalType === "edit" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-edit">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaEdit style={{ marginRight: "8px" }} />
              ข้อมูลพนักงานที่ต้องการแก้ไข
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName" className="mt-3">
                    <Form.Label>ชื่อ-นามสกุล</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editFormData.name || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formUsername" className="mt-3">
                    <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={editFormData.username || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPhone" className="mt-3">
                    <Form.Label>เบอร์โทร</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={editFormData.phone || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editFormData.email || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={editFormData.password || ""}
                      onChange={handleChangeEdit}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formType" className="mt-3">
                    <Form.Label>ประเภทผู้ใช้งาน</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      value={editFormData.type || ""}
                      onChange={handleChangeEdit}
                    >
                      <option value="1">เจ้าหน้าที่ประสานงานขนส่ง</option>
                      <option value="2">พนักงานขับรถส่งสินค้า</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formImage" className="mt-3">
                    <Form.Label>อัพโหลดรูปภาพพนักงาน</Form.Label>
                    <Form.Control
                      type="file"
                      name="image_employee"
                      onChange={(e) => handleChangeEdit(e)} // ใช้ handleChangeEdit สำหรับไฟล์
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formStatus" className="mt-3">
                    <Form.Label>สถานะพนักงาน</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      value={editFormData.status || ""}
                      onChange={handleChangeEdit}
                    >
                      <option value="active">พร้อมใช้งาน</option>
                      <option value="inactive">ไม่พร้อมใช้งาน</option>
                    </Form.Control>
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

        {/* Modal สำหรับการลบข้อมูลพนักงาน */}
        <Modal
          show={modalType === "delete" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-delete">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaTrash style={{ marginRight: "8px" }} />
              คุณต้องการลบพนักงาน {selectedEmployee?.name} หรือไม่ ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>ยืนยันการลบข้อมูลพนักงาน {selectedEmployee?.name} ?</p>
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
      </Container>
      <br />
    </StaffLayout>
  );
};

export default StaffUser;
