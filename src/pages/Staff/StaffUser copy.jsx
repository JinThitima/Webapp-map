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

const StaffUser = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]); // เปลี่ยนจาก customer เป็น employees
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // ใช้สำหรับจัดการ modalType
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // คำค้นหา

  //เพิ่มข้อมูล
  const [createFormData, setCreateFormData] = useState({});
  const handleChangeCreate = (event) => {
    setCreateFormData({
      ...createFormData,
      [event.target.name]: event.target.value,
    });
  }
  const handleCreateSubmit = (event) => {
    event.preventDefault();
    console.log(createFormData);
    EmployeesService.create(createFormData)
      .then((res) => {
        alert("Insert complete")
        navigate("/StaffUser");
      })
      .catch((e) => console.log(e));

  };

  //แก้ไขข้อมูล
  const [editFormData, setEditFormData] = useState({});

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
    setModalType("delete");
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(
    (emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()) // ค้นหาพนักงาน
  );

  const handleSubmit = (event) => {
    event.preventDefault();
  }

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
                          {emp.type === "1"
                            ? "เจ้าหน้าที่ประสานงานขนส่ง"
                            : emp.type === "2"
                            ? "พนักงานขับรถส่งสินค้า"
                            : "ตำแหน่งไม่ระบุ"}
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
                            onClick={() => handleShowDelete(emp)}
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
            <Modal.Title>เพิ่มข้อมูลพนักงาน</Modal.Title>
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
                      <option value="1">เจ้าหน้าที่ประวานงานขนส่ง</option>
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
                    variant="outline-secondary"
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
            <Modal.Title>แก้ไขข้อมูลพนักงาน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* ฟอร์มสำหรับแก้ไขข้อมูลพนักงาน */}
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName" className="mt-3">
                    <Form.Label>ชื่อ-นามสกุล</Form.Label>
                    <Form.Control type="name" placeholder="ชื่อ-นามสกุล" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPhone" className="mt-3">
                    <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                    <Form.Control
                      type="username"
                      placeholder="กรอกชื่อผู้ใช้งาน"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>เบอร์โทร</Form.Label>
                    <Form.Control type="tel" placeholder="กรอกเบอร์โทร" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control type="email" placeholder="กรอกอีเมล" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="กรอกรหัสผ่าน" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formStatus" className="mt-3">
                    <Form.Label>ประเภทผู้ใช้งาน</Form.Label>
                    <Form.Control as="select">
                      <option>--เลือกประเภท--</option>
                      <option value="เจ้าหน้าที่ประวานงานขนส่ง">
                        เจ้าหน้าที่ประวานงานขนส่ง
                      </option>
                      <option value="พนักงานขับรถส่งสินค้า">
                        พนักงานขับรถส่งสินค้า
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formImage" className="mt-3">
                    <Form.Label>อัพโหลดรูปภาพพนักงาน</Form.Label>
                    <Form.Control type="file" accept="image/*" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formStatus" className="mt-3">
                    <Form.Label>สถานะพนักงาน</Form.Label>
                    <Form.Control as="select">
                      <option>--เลือกสถานะ--</option>
                      <option value="พร้อมใช้งาน">พร้อมใช้งาน</option>
                      <option value="ไม่พร้อมใช้งาน">ไม่พร้อมใช้งาน</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button variant="outline-warning" onClick={handleSubmit}>
              บันทึกข้อมูล
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal สำหรับลบพนักงาน */}
        <Modal
          show={modalType === "delete" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-delete">
            <Modal.Title>ลบพนักงาน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>คุณต้องการลบพนักงาน {selectedEmployee?.name} หรือไม่?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button variant="outline-danger" onClick={handleSubmit}>
              ลบ
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default StaffUser;
