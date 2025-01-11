import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import StaffLayout from "../../layouts/StaffLayout";
import { useNavigate, useParams } from "react-router-dom";
import VehiclesService from "../../server/Vehicle";
import EmployeesService from "../../server/Employee";
import RoutetemplatesService from "../../server/Route_template";
import ShipworksService from "../../server/Ship_work";
import CustomersService from "../../server/Customer";
import ShippingstopsService from "../../server/shipping_stop"; // Update to Vehicle service
import ShippingStopCard from "./ShippingStopCard";

import {
  FaCheckCircle,
  FaShippingFast,
  FaClock,
  FaRegCheckCircle,
  FaTrash,
  FaTimesCircle,
} from "react-icons/fa";

const DetailJobOrder = () => {
  let params = useParams();
  let id = params.id;
  const navigate = useNavigate();
  let [shipwork, setShipwork] = useState({});
  const [selectedShip_work, setSelectedShip_work] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // ใช้สำหรับจัดการ modalType
  const [editFormData, setEditFormData] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [routeTemplates, setRouteTemplates] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [shippingStops, setShippingStops] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // ฟังก์ชันเพื่อดึงข้อมูล Ship_worksService
  const fetchData = async () => {
    try {
      const res = await ShipworksService.getShipWorkById(id);
      console.log(res.data.data);
      setSelectedShip_work(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await EmployeesService.getAll();
      console.log(res.data.data);
      setSelectedEmployees(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await VehiclesService.getAll();
      console.log(res.data.data);
      setSelectedVehicles(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchEmployees();
    fetchVehicles();
  }, []);

  const handleChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Bangkok", // Ensures the time is in Thai timezone
    });
  };

  const handleClose = () => setShow(false);

  const StatusCard = ({ status }) => {
    const renderStatus = () => {
      switch (status) {
        case "รอการอนุมัติ":
          return (
            <div
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "8px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaClock size={20} style={{ marginRight: "8px" }} />
              <span>รอการอนุมัติ</span>
            </div>
          );
        case "อนุมัติการจัดส่ง":
          return (
            <div
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "8px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaCheckCircle size={20} style={{ marginRight: "8px" }} />
              <span>อนุมัติการจัดส่ง</span>
            </div>
          );
        case "กำลังจัดส่ง":
          return (
            <div
              style={{
                backgroundColor: "#ffc107",
                color: "#000",
                padding: "8px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaShippingFast size={20} style={{ marginRight: "8px" }} />
              <span>กำลังจัดส่ง</span>
            </div>
          );
        case "จัดส่งสำเร็จ":
          return (
            <div
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "8px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaRegCheckCircle size={20} style={{ marginRight: "8px" }} />
              <span>จัดส่งสำเร็จ</span>
            </div>
          );
        case "ยกเลิกใบงาน":
          return (
            <div
              style={{
                backgroundColor: "#FF0000",
                color: "#fff",
                padding: "8px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaTimesCircle size={20} style={{ marginRight: "8px" }} />
              <span>ยกเลิกใบงาน</span>
            </div>
          );
        default:
          return (
            <div
              style={{
                backgroundColor: "#6c757d",
                color: "#fff",
                padding: "8px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaClock size={20} style={{ marginRight: "8px" }} />
              <span>สถานะไม่ระบุ</span>
            </div>
          );
      }
    };

    return renderStatus();
  };

  return (
    <StaffLayout>
      <Container className="mt-4">
        {/* Header */}
        <div>
          {selectedShip_work ? (
            <div key={selectedShip_work._id}>
              <Row className="my-2 align-items-center">
                <Col md={9}>
                  <h2
                    className="main-title"
                    style={{ fontWeight: "bold", color: "#2a33a1" }}
                  >
                    ใบงานการวิ่งงาน
                  </h2>
                </Col>
                <Col md={3} className="text-end">
                  <h2
                    className="main-title"
                    style={{
                      fontWeight: "bold",
                      color: "#2a33a1",
                      backgroundColor: "yellow",
                      padding: "2px",
                    }}
                  >
                    No : {selectedShip_work.workID}
                  </h2>
                </Col>
                <hr className="main-line" />
              </Row>

              <Card className="mb-4 shadow-sm rounded-lg border-0">
                <Card.Body className="p-4">
                  <Row className="text-md-start">
                    {/* Row 1: สายวิ่งงาน */}
                    <Col xs={6} className="mb-3">
                      <h4 className="font-weight-normal text-dark">
                        สายวิ่งงาน: {selectedShip_work.spots}{" "}
                      </h4>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end mb-3">
                      <strong className="text-dark d-flex ">
                        <span className="ms-3">
                          <StatusCard status={selectedShip_work.status} />
                        </span>
                      </strong>
                    </Col>
                    {/* Row 2: วันที่-เวลาเปิดใบงาน และ วันที่-เวลาส่งสินค้า */}
                    <Col xs={6} className="text-md-start mb-3">
                      <strong className="text-muted">
                        วันที่สร้างใบงาน :{" "}
                        {formatDate(selectedShip_work.date_worksheet)}
                      </strong>
                    </Col>
                    <Col xs={6} className="text-md-end mb-3">
                      <strong className="text-muted">
                        วันที่-เวลาส่งสินค้า :{" "}
                        {formatDate(selectedShip_work.delivery_date)}
                      </strong>
                    </Col>
                    {/* Row 3: พนักงานขับรถ และ ประเภทรถ */}

                    <Col xs={6} className="d-flex justify-content-start mb-3">
                      <strong className="text-dark d-flex ">
                        พนักงานขับรถส่งสินค้า :
                        {selectedEmployees
                          .filter(
                            (employee) =>
                              employee._id === selectedShip_work.driver_id
                          )
                          .map((employee) => employee.name)
                          .join(", ") || "ไม่พบชื่อพนักงาน"}
                      </strong>
                    </Col>
                    <Col xs={6} className="text-md-end mb-3">
                      <strong className="text-dark">
                        รถจัดส่งสินค้า :
                        {selectedVehicles
                          .filter(
                            (vehicle) =>
                              vehicle._id === selectedShip_work.vechicle_id
                          )
                          .map((vehicle) => vehicle.register_number)
                          .join(", ") || "ไม่พบรถจัดส่งสินค้า"}
                      </strong>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-start mb-3">
                      <strong className="text-dark">
                        เจ้าหน้าที่ประสานงานขนส่ง :
                        {selectedEmployees
                          .filter(
                            (employee) =>
                              employee._id === selectedShip_work.organizer_id
                          )
                          .map((employee) => employee.name)
                          .join(", ") || "ไม่พบชื่อพนักงาน"}
                      </strong>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end mb-3">
                      <strong className="text-dark">
                        ระยะทางการวิ่งงาน :{" "}
                        {selectedShip_work && selectedShip_work.start_mileage
                          ? selectedShip_work.start_mileage
                          : "รอการจัดส่งเสร็จสิ้น"}
                      </strong>
                    </Col>

                    {/* Row 4: วันที่-เวลาเปิดใบงาน และ วันที่-เวลาส่งสินค้า */}
                    <Col xs={6} className="d-flex justify-content-start mb-3">
                      <strong className="text-dark">
                        เวลาคาดว่าจะจัดส่ง :{" "}
                        {formatTime(selectedShip_work.expected_start_time)}
                      </strong>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end mb-3">
                      <strong className="text-dark">
                        เวลาคาดว่าจะจัดส่งสำเร็จ :{" "}
                        {formatTime(selectedShip_work.expected_finish_time)}
                      </strong>
                    </Col>

                    {/* Row 5: วันที่-เวลาเปิดใบงาน และ วันที่-เวลาส่งสินค้า */}
                    <Col xs={6} className="d-flex justify-content-start mb-3">
                      <strong className="text-dark">
                        เวลาจัดเริ่มต้นการจัดส่ง :{" "}
                        {selectedShip_work.actual_start_time
                          ? formatTime(selectedShip_work.actual_start_time)
                          : "-"}
                      </strong>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end mb-3">
                      <strong className="text-dark">
                        เวลาจัดส่งสำเร็จ :{" "}
                        {selectedShip_work.actual_finish_time
                          ? formatTime(selectedShip_work.actual_finish_time)
                          : "-"}
                      </strong>
                    </Col>

                    {/* Row 5: วันที่-เวลาเปิดใบงาน และ วันที่-เวลาส่งสินค้า */}
                    <Col xs={6} className="d-flex justify-content-start mb-3">
                      <strong className="text-dark">
                        เลขไมล์รถขนส่งสินค้าเริ่มต้นการจัดส่ง :{" "}
                        {selectedShip_work.start_mileage !== undefined
                          ? selectedShip_work.start_mileage
                          : "-"}
                      </strong>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end mb-3">
                      <strong className="text-dark">
                        เลขไมล์รถขนส่งสินค้าเสร็จสิ้นการจัดส่ง :{" "}
                        {selectedShip_work.finish_mileage !== undefined
                          ? selectedShip_work.finish_mileage
                          : "-"}
                      </strong>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Container className="mt-4">
                <Row>
                  <Col
                    md={6}
                    className="d-flex justify-content-start align-items-center"
                  >
                    {" "}
                    {/* ชิดขวา */}
                    <h2
                      className="main-title mb-4"
                      style={{ fontWeight: "bold", color: "#2a33a1" }}
                    >
                      รายละเอียดร้านค้า
                    </h2>
                  </Col>
                  <Col
                    md={6}
                    className="d-flex justify-content-end align-items-center gap-3" // เพิ่ม gap เพื่อเว้นระยะ
                  >
                    {/* ลิงก์เพิ่มร้านค้าจัดส่ง */}
                    <Link
                      to={`/AddCustomer/${selectedShip_work._id}`}
                      className="text-decoration-none fw-bold btn btn-primary" // ใช้ Bootstrap class
                    >
                      เพิ่มร้านค้าจัดส่ง
                    </Link>

                    {/* ปุ่มแก้ไขข้อมูลใบงาน */}
                    <Link
                      to={`/EditJobOrder/${selectedShip_work._id}`}
                      className="text-decoration-none fw-bold btn btn-warning" // ใช้ Bootstrap class
                    >
                      {/* <BsPencilSquare size={18} className="me-2" />{" "} */}
                      แก้ไขข้อมูลใบงาน
                    </Link>
                  </Col>
                </Row>

                <Row>
                  <ListGroup variant="flush">
                    {selectedShip_work.shipping_stops.length > 0 ? (
                      selectedShip_work.shipping_stops.map(
                        (shippingStop, index) => (
                          <ShippingStopCard
                            key={index}
                            data={shippingStop}
                            shipWorkId={selectedShip_work._id}
                          />
                        )
                      )
                    ) : (
                      <ListGroup.Item>ไม่พบข้อมูลใบงานที่ตรงกัน</ListGroup.Item>
                    )}
                  </ListGroup>
                </Row>

                {/* Modal แก้ไข */}
                <Modal
                  show={modalType === "edit" && showModal}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        color: "#333",
                      }}
                    >
                      แก้ไขข้อมูลใบงาน เลขที่ {selectedShip_work?.workID}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "20px",
                        marginBottom: "30px",
                        color: "#555",
                      }}
                    >
                      <p>กรณีต้องการแก้ไขข้อมูลใบงาน</p> กรุณาเลือกคำว่า "ตกลง"
                    </p>
                  </Modal.Body>
                  <Modal.Footer
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "50px",
                      }}
                    >
                      {/* ปุ่มสำหรับข้อมูลทั่วไป */}
                      <NavLink
                        to={`/EditJobOrder/${selectedShip_work?._id}`} // ใช้ template literal เพื่อแทรกค่า _id
                        style={{
                          padding: "15px 15px",
                          fontSize: "18px",
                          color: "#ffffff",
                          backgroundColor: "#007bff",
                          borderColor: "#007bff",
                          borderRadius: "8px",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      >
                        ตกลง
                      </NavLink>
                    </div>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={modalType === "delete" && showModal}
                  onHide={handleClose}
                  size="lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FaTrash style={{ marginRight: "8px" }} />
                      คุณต้องการลบลูกค้า ร้าน ไทยรุ่ง 3 หรือไม่ ?
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>ยืนยันการลบข้อมูลลูกค้า ร้าน ไทยรุ่ง 3 ?</p>
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
                      // onClick={handleDeleteSubmit}
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
              </Container>
            </div>
          ) : (
            <Row className="my-4 d-flex justify-content-center">
              <Col md={12} className="text-center">
                <h4>ไม่มีข้อมูลใบงานการวิ่งงาน</h4>
              </Col>
            </Row>
          )}
        </div>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default DetailJobOrder;
