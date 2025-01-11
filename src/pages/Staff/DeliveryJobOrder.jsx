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
import { FaFileAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import StaffLayout from "../../layouts/StaffLayout";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Ship_worksService from "../../server/Ship_work";
import ShippingstopsService from "../../server/shipping_stop";
import VehiclesService from "../../server/Vehicle";
import EmployeesService from "../../server/Employee";
import RoutetemplatesService from "../../server/Route_template";
import CustomersService from "../../server/Customer";

const DeliveryJobOrder = () => {
  const navigate = useNavigate();
  const [shipworks, setShipworks] = useState([]);
  const [selectedShipworks, setSelectedShipworks] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusUpdateError, setStatusUpdateError] = useState("");
  const [routeTemplates, setRouteTemplates] = useState([]);
  const [shippingStops, setShippingStops] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [editFormData, setEditFormData] = useState({
    status: "",
  });
  const [formData, setFormData] = useState({});

  // Fetch initial data
  const fetchShipworks = async () => {
    try {
      const response = await Ship_worksService.getAll();
      setShipworks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching shipworks:", error);
    }
  };

  useEffect(() => {
    fetchShipworks();
  }, []);

  //ค้นหาข้อมูล
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredShipworks = shipworks.filter((work) =>
    (work.spots || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    try {
      // ใช้ Promise.all เพื่อดึงข้อมูลพร้อมกันจากหลายๆ API
      const [
        vehiclesRes,
        customersRes,
        shippingstopsRes,
        routetemplatesRes,
        employeesRes,
        userInfoRes,
      ] = await Promise.all([
        VehiclesService.getAll(),
        CustomersService.getAll(),
        ShippingstopsService.getAll(),
        RoutetemplatesService.getAll(),
        EmployeesService.getAll(),
        EmployeesService.userInfo(), // สำหรับข้อมูลผู้ใช้งาน
      ]);

      // แสดงข้อมูลในสถานะต่างๆ
      setVehicles(vehiclesRes.data.data);
      setCustomers(customersRes.data.data);
      setShippingStops(shippingstopsRes.data.data);
      setRouteTemplates(routetemplatesRes.data.data);
      setUserInfo(userInfoRes.data.data); // ใช้ข้อมูล userInfoRes ที่ได้รับ
      setEmployees(employeesRes.data.data); // ใช้ข้อมูล userInfoRes ที่ได้รับ

      // ตั้งค่า formData
      setFormData((prevData) => ({
        ...prevData,
        organizer_id: userInfoRes.data.data._id, // เก็บแค่ _id
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Status update handlers
  const handleShowEditStatus = (shipwork) => {
    setSelectedShipworks(shipwork);
    setEditFormData({ status: shipwork.status || "" });
    setModalType("editstatus");
    setShowModal(true);
    setStatusUpdateError("");
  };

  const handleStatusChange = (e) => {
    setEditFormData({
      ...editFormData,
      status: e.target.value,
    });
  };

  const handleStatusUpdate = async (event) => {
    event.preventDefault();
    setStatusUpdateError("");

    if (!editFormData.status) {
      setStatusUpdateError("กรุณาเลือกสถานะ");
      return;
    }

    try {
      await Ship_worksService.updateStatus(selectedShipworks._id, {
        status: editFormData.status,
      });

      // Update local state
      const updatedShipworks = shipworks.map((work) =>
        work._id === selectedShipworks._id
          ? { ...work, status: editFormData.status }
          : work
      );

      setShipworks(updatedShipworks);
      setShowModal(false);
      alert("อัพเดทสถานะเรียบร้อยแล้ว");
    } catch (error) {
      console.error("Error updating status:", error);
      setStatusUpdateError("ไม่สามารถอัพเดทสถานะได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "อนุมัติการจัดส่ง":
        return "#28a745";
      case "กำลังจัดส่ง":
        return "#ffc107";
      case "จัดส่งสำเร็จ":
        return "#17a2b8";
      case "ยกเลิกใบงาน":
        return "#dc3545";
      case "รอการอนุมัติ":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  return (
    <StaffLayout>
      <Container>
        {/* Header section remains the same */}
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
                <FaFileAlt
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                จัดการข้อมูลใบงาน
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

        {/* Search and Add button section */}
        <Row className="mb-4">
          <Col md={4}>
            <Form>
              <FormControl
                type="text"
                placeholder="ค้นหาเส้นทางการจัดส่งสินค้า"
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
              />
            </Form>
          </Col>
          <Col md={8} className="text-end">
            <NavLink to="/AddJobOrder" className="btn btn-primary">
              <FaFileAlt size={20} />
            </NavLink>
          </Col>
        </Row>

        {/* Table section */}
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
            ข้อมูลใบงาน
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: "15%" }} className="text-center">
                    วันที่สร้าง
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    เลขที่ใบงาน
                  </th>
                  <th className="text-center">ชื่อเส้นทาง</th>
                  <th className="text-center">ผู้สร้างใบงาน</th>
                  <th className="text-center">ผู้ส่งสินค้า</th>
                  <th className="text-center">รถที่ใช้ในการส่ง</th>
                  <th className="text-center">สถานะการจัดส่ง</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipworks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      <strong>ไม่พบข้อมูล</strong>
                    </td>
                  </tr>
                ) : (
                  filteredShipworks.map((work) => (
                    <tr key={work._id}>
                      <td className="text-center">
                        {formatDate(work.date_worksheet)}
                      </td>
                      <td className="text-center font-weight-bold">
                        <Link
                          to={`/DetailJobOrder/${work._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {work.workID}
                        </Link>
                      </td>
                      <td className="text-center">{work.spots}</td>
                      <td className="text-center">
                        {employees
                          .filter(
                            (employee) => employee._id === work.organizer_id
                          )
                          .map((employee) => employee.name)
                          .join(", ") || "ไม่พบชื่อพนักงาน"}
                      </td>
                      <td className="text-center">
                        {employees
                          .filter((employee) => employee._id === work.driver_id)
                          .map((employee) => employee.name)
                          .join(", ") || "ไม่พบชื่อพนักงาน"}
                      </td>
                      <td className="text-center">
                        {vehicles
                          .filter((vehicle) => vehicle._id === work.vechicle_id)
                          .map((vehicle) => vehicle.register_number)
                          .join(", ") || "ไม่พบข้อมูลรถ"}
                      </td>
                      <td className="text-center">
                        <Button
                          onClick={() => handleShowEditStatus(work)}
                          style={{
                            backgroundColor: getStatusColor(work.status),
                            border: "none",
                            width: "100%",
                          }}
                        >
                          {work.status || "รอการอนุมัติ"}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Status Update Modal */}
        <Modal
          show={modalType === "editstatus" && showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              แก้ไขสถานะของใบงาน เลขที่ {selectedShipworks?.workID}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleStatusUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>
                  สถานะการจัดส่งปัจจุบัน: {selectedShipworks?.status}
                </Form.Label>
                <Form.Select
                  name="status"
                  value={editFormData.status}
                  onChange={handleStatusChange}
                  isInvalid={!!statusUpdateError}
                >
                  <option value="">เลือกสถานะ</option>
                  <option value="รอการอนุมัติ">รอการอนุมัติ</option>
                  <option value="อนุมัติการจัดส่ง">อนุมัติการจัดส่ง</option>
                  <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                  <option value="จัดส่งสำเร็จ">จัดส่งสำเร็จ</option>
                  <option value="ยกเลิกใบงาน">ยกเลิกใบงาน</option>
                </Form.Select>
                {statusUpdateError && (
                  <Form.Control.Feedback type="invalid">
                    {statusUpdateError}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  ยกเลิก
                </Button>
                <Button variant="primary" type="submit">
                  บันทึกการเปลี่ยนแปลง
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </StaffLayout>
  );
};

export default DeliveryJobOrder;
