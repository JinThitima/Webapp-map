import React, { useEffect, useState } from "react";
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
import {
  BsPencilSquare,
  BsTrash,
  BsUiChecksGrid,
} from "react-icons/bs";
import StaffLayout from "../../layouts/StaffLayout";
import { Link, useNavigate } from "react-router-dom";
import { TfiArrowCircleDown } from "react-icons/tfi";
import Route_templatesService from "../../server/Route_template"; // เพิ่มการใช้งาน EmployeesService
import { FaTrash, FaRoad } from "react-icons/fa"; // ไอคอนจาก react-icons

const GroupTransport = () => {
  // State สำหรับควบคุมการแสดงผลของ Modal แต่ละแบบ
  const navigate = useNavigate();
  const [route_templates, setRoute_templates] = useState([]); // เปลี่ยนจาก customer เป็น employees
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // ใช้สำหรับจัดการ modalType
  const [selectedRoute_template, setSelectedRoute_template] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // คำค้นหา

  // เพิ่มข้อมูล
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
    Route_templatesService.create(createFormData)
      .then((res) => {
        alert("ข้อมูลกลุ่มเส้นทางถูกบันทึกเรียบร้อยแล้ว");
        setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
        setCreateFormData({}); // ล้างค่าของ createFormData หลังจากบันทึกข้อมูล

        fetchRoute_templates(); // รีเฟรชข้อมูลพนักงาน

        // ใช้ setTimeout เพื่อรอให้ Modal ปิดก่อนจะเปลี่ยนเส้นทาง
        setTimeout(() => {
          navigate("/GroupTransport"); // เปลี่ยนเส้นทางหลังจากปิด Modal
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
    if (!selectedRoute_template || !selectedRoute_template._id) {
      alert("ไม่พบข้อมูลกลุ่มเส้นทางที่ต้องการแก้ไข");
      return;
    }

    console.log("ข้อมูลที่จะส่งไป:", editFormData);

    Route_templatesService.updateRoute_templates(
      selectedRoute_template._id,
      editFormData
    )
      .then((res) => {
        alert("ข้อมูลกลุ่มเส้นทางถูกแก้ไขเรียบร้อยแล้ว");
        setShowModal(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
        fetchRoute_templates(); // รีเฟรชข้อมูลพนักงาน
      })
      .catch((e) => {
        console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล", e);
        alert("ไม่สามารถแก้ไขข้อมูลได้");
      });
  };

  //ลบข้อมูล
  const handleDeleteSubmit = () => {
    if (selectedRoute_template) {
      Route_templatesService.deleteRoute_templates(selectedRoute_template._id) // ลบข้อมูลพนักงาน
        .then((res) => {
          alert("ข้อมูลกลุ่มเส้นทางถูกลบเรียบร้อยแล้ว");
          setShowModal(false); // ปิด Modal หลังจากลบเสร็จ
          fetchRoute_templates(); // รีเฟรชข้อมูลพนักงาน
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการลบข้อมูล", error);
          alert("ไม่สามารถลบข้อมูลได้");
        });
    }
  };

  const fetchRoute_templates = () => {
    Route_templatesService.getAll() // ใช้ EmployeesService
      .then((res) => {
        console.log(res.data.data);
        setRoute_templates(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchRoute_templates(); // เรียกใช้ฟังก์ชันที่แก้ไขใหม่
  }, []);

  const handleShowAdd = () => {
    setSelectedRoute_template(null);
    setModalType("add");
    setShowModal(true);
  };

  const handleShowEdit = (Route) => {
    setSelectedRoute_template(Route); // ตั้งค่าพนักงานที่ถูกเลือก
    setModalType("edit");
    setShowModal(true);
    setEditFormData({ ...Route }); // ส่งค่า employee (รวมทั้ง _id) ไปใน editFormData
  };

  const handleShowDelete = (Route) => {
    setSelectedRoute_template(Route);
    setModalType("delete"); // ตั้งค่าประเภทของ Modal เป็น "delete"
    setShowModal(true); // แสดง Modal
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoute_templates = route_templates.filter(
    (Route) => Route.name.toLowerCase().includes(searchTerm.toLowerCase()) // ค้นหา
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
                <FaRoad
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                จัดการข้อมูลกลุ่มเส้นทางการขนส่ง
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
          <Col md={4}>
            <Form inline>
              <FormControl
                type="text"
                placeholder="ค้นหาเส้นทาง"
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
          </Col>
          <Col md={8} className="text-right">
            <div className="d-flex justify-content-end">
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
                <FaRoad size={20} />
              </Button>
            </div>
          </Col>
        </Row>
        <br />
        <Card>
          <Card.Body>
            <Table
              striped
              bordered
              hover
              responsive
              className="table-responsive"
            >
              <thead>
                <tr>
                  <th style={{ width: "5%" }} className="text-center">
                    ลำดับ
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    ชื่อเส้นทาง
                  </th>
                  <th style={{ width: "40%" }} className="text-center">
                    รายชื่อร้านค้า
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRoute_templates.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <strong>ไม่มีข้อมูลที่ตรงกับการค้นหา</strong>
                    </td>
                  </tr>
                ) : (
                  filteredRoute_templates.map((Route, index) => (
                    <tr key={Route.id}>
                      {" "}
                      {/* เพิ่ม key prop ที่มีค่าที่ไม่ซ้ำกัน */}
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{Route.name}</td>
                      <td className="text-start">
                        {/* แสดง customrs 5 รายการแรก */}
                        {Route.customers.slice(0, 5).map((c) => (
                          <>
                            <p> {c.name}</p>
                            <hr />
                          </>
                        ))}
                        <Button
                          variant="link"
                          className="p-0 d-flex align-items-center"
                        >
                          <Link
                            to={`/DetailGroupTransport/${Route._id}`}
                            style={{
                              textDecoration: "underline",
                              color: "green", // เปลี่ยนเป็นสีเขียว
                            }}
                          >
                            เพิ่มเติม
                          </Link>
                          <TfiArrowCircleDown
                            style={{ fontSize: "20px", marginLeft: "5px" }}
                          />
                        </Button>
                      </td>
                      <td>
                        <div
                          className="d-flex justify-content-between flex-wrap"
                          style={{ gap: "8px" }}
                        >
                          <Button
                            variant="success"
                            className="d-flex align-items-center"
                            to="/DetailGroupTransport"
                            style={{
                              backgroundColor: "#28a745", // สีเขียว
                              borderColor: "#28a745",
                              padding: "8px 16px",
                              fontSize: "14px",
                            }}
                          >
                            <Link
                              to={`/DetailGroupTransport/${Route._id}`}
                              style={{
                                textDecoration: "underline",
                                color: "#ffffff", // สีขาว
                              }}
                            >
                              <BsUiChecksGrid />
                            </Link>
                          </Button>

                          <Button
                            variant="warning"
                            className="d-flex align-items-center"
                            onClick={() => handleShowEdit(Route)}
                            style={{
                              backgroundColor: "#ffc107", // สีเหลือง
                              borderColor: "#ffc107",
                              padding: "8px 16px",
                              fontSize: "14px",
                            }}
                          >
                            <BsPencilSquare />
                          </Button>

                          <Button
                            variant="danger"
                            className="d-flex align-items-center"
                            onClick={() => handleShowDelete(Route)}
                            style={{
                              backgroundColor: "#dc3545", // สีแดง
                              borderColor: "#dc3545",
                              padding: "8px 16px",
                              fontSize: "14px",
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
            <Modal.Title>เพิ่มเส้นทางการขนส่ง</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* ฟอร์มสำหรับเพิ่มเส้นทาง */}
            <Form onSubmit={handleCreateSubmit}>
              <Form.Group>
                <Form.Label>ชื่อเส้นทาง</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="กรอกชื่อกลุ่มเส้นทาง"
                  name="name"
                  onChange={handleChangeCreate}
                />
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

        {/* Edit Modal */}
        <Modal
          show={modalType === "edit" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-edit">
            <Modal.Title>แก้ไขเส้นทางการขนส่ง</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* ฟอร์มสำหรับแก้ไขข้อมูลเส้นทาง */}
            <Form onSubmit={handleEditSubmit}>
              <Form.Group>
                <Form.Label>ชื่อเส้นทาง</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="แก้ไขชื่อกลุ่มเส้นทาง"
                  value={editFormData.name || ""}
                  onChange={handleChangeEdit}
                />
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

        {/* Delete Modal */}
        <Modal
          show={modalType === "delete" && showModal}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-delete">
            <Modal.Title style={{ display: "flex", alignItems: "center" }}>
              <FaTrash style={{ marginRight: "8px" }} />
              คุณต้องการลบกลุ่มเส้นทาง {selectedRoute_template?.name} หรือไม่ ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ยืนยันการลบข้อมูลกลุ่มเส้นทาง {selectedRoute_template?.name} ?
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
      </Container>
    </StaffLayout>
  );
};

export default GroupTransport;
