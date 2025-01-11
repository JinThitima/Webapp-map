import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import StaffLayout from "../../layouts/StaffLayout";
import { useNavigate, useParams } from "react-router-dom";
import VehiclesService from "../../server/Vehicle";
import EmployeesService from "../../server/Employee";
import RoutetemplatesService from "../../server/Route_template";
import Ship_worksService from "../../server/Ship_work";
import CustomersService from "../../server/Customer";
import ShippingstopsService from "../../server/shipping_stop"; // Update to Vehicle service

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
  const [selectedShipworks, setSelectedShipworks] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // ใช้สำหรับจัดการ modalType
  const [editFormData, setEditFormData] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [routeTemplates, setRouteTemplates] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [shippingStops, setShippingStops] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState(null);

  // State for modal visibility and selected store to delete

  // ฟังก์ชันเพื่อดึงข้อมูล Ship_worksService
  const fetchShipwork = (id) => {
    Ship_worksService.getByDriverId(id)
      .then((res) => {
        setShipwork(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  // ฟังก์ชันเพื่อดึงข้อมูลจากหลายๆ API
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
      setEmployees(employeesRes.data.data);
      setUserInfo(userInfoRes.data.data);
      setRouteTemplates(routetemplatesRes.data.data);

      // ตั้งค่า formData
      setFormData((prevData) => ({
        ...prevData,
        organizer_id: userInfoRes.data.data._id, // เก็บแค่ _id
      }));

      // ดึงข้อมูล ShippingstopsService โดยใช้ workID จาก Ship_worksService
      if (shipwork && shipwork.workID) {
        const shippingStop = shippingstopsRes.data.data.find(
          (stop) => stop.workID === shipwork.workID
        );
        // console.log(shipwork.workID);
        if (shippingStop) {
          setShippingStops([shippingStop]);

          // ดึงข้อมูลลูกค้า (customers) โดยใช้ customer_id จาก Ship_worksService
          const customersData = await CustomersService.getManyByIds(
            shipwork.customer_id
          );
          setCustomers(customersData.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      const errorMessage = error.response
        ? `API Error: ${error.response.status} - ${error.response.data.message}`
        : "Network Error";
      alert(`เกิดข้อผิดพลาด: ${errorMessage}`);
    }
  };

  useEffect(() => {
    if (id) {
      fetchShipwork(id); // เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูล Ship_worksService
    }
  }, [id]);

  useEffect(() => {
    if (shipwork) {
      fetchData(); // เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูลทั้งหมดเมื่อได้ข้อมูล Ship_worksService
    }
  }, [shipwork]);

  const [show, setShow] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  // Handlers for modal
  const handleShow = (store) => {
    setSelectedStore(store);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleDelete = () => {
    // เพิ่มการลบข้อมูลตามต้องการ
    console.log("ลบข้อมูลร้านค้า:", selectedStore);
    setShow(false);
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

  const handleShowEdit = (shipwork) => {
    setSelectedShipworks(shipwork); // ตั้งค่าพนักงานที่ถูกเลือก
    setModalType("edit"); // ตั้งประเภทของ modal เป็น edit
    setShowModal(true); // แสดง modal
    setEditFormData({ ...shipwork }); // ส่งค่า shipwork (รวมทั้ง _id) ไปใน editFormData
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    // Logic for handling add/edit/delete based on modalType
  };

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

  const handleShowDelete = (customer) => {
    setSelectedCustomers(customer);
    setModalType("delete"); // ตั้งค่าประเภทของ Modal เป็น "delete"
    setShowModal(true); // แสดง Modal
  };

  const handleDeleteSubmit = () => {};

  return (
    <StaffLayout>
      <Container className="mt-4">
        {/* Header */}
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
              No : {shipwork.workID}
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
                  สายวิ่งงาน: {shipwork.spots} {shippingStops.workID}
                </h4>
              </Col>
              <Col xs={6} className="d-flex justify-content-end mb-3">
                <strong className="text-dark d-flex ">
                  <span className="ms-3">
                    <StatusCard status={shipwork.status} />
                  </span>
                </strong>
              </Col>
              {/* Row 2: วันที่-เวลาเปิดใบงาน และ วันที่-เวลาส่งสินค้า */}
              <Col xs={6} className="text-md-start mb-3">
                <strong className="text-muted">
                  วันที่สร้างใบงาน : {formatDate(shipwork.date_worksheet)}
                </strong>
              </Col>
              <Col xs={6} className="text-md-end mb-3">
                <strong className="text-muted">
                  วนที่-เวลาส่งสินค้า : {formatDate(shipwork.delivery_date)}
                </strong>
              </Col>
              {/* Row 3: พนักงานขับรถ และ ประเภทรถ */}

              <Col xs={6} className="d-flex justify-content-start mb-3">
                <strong className="text-dark d-flex ">
                  พนักงานขับรถส่งสินค้า :{" "}
                  {
                    employees
                      .filter((employee) => employee._id === shipwork.driver_id) // คัดกรองพนักงานที่มี _id ตรงกับ driver_id
                      .map((employee) => employee.name) // เอาชื่อของพนักงาน
                      .join(", ") || "ไม่พบชื่อพนักงาน" // ถ้าไม่พบพนักงานให้แสดงข้อความนี้
                  }
                </strong>
              </Col>
              <Col xs={6} className="text-md-end mb-3">
                <strong className="text-dark">
                  รถจัดส่งสินค้า :{" "}
                  {
                    vehicles
                      .filter((vehicle) => vehicle._id === shipwork.vechicle_id) // คัดกรองรถที่มี _id ตรงกับ vechicle_id
                      .map((vehicle) => vehicle.register_number) // เอาหมายเลขทะเบียนรถ
                      .join(", ") || "ไม่พบข้อมูลรถ" // ถ้าไม่พบข้อมูลให้แสดงข้อความนี้
                  }
                </strong>
              </Col>
              <Col xs={6} className="d-flex justify-content-start mb-3">
                <strong className="text-dark">
                  เจ้าหน้าที่ประสานงานขนส่ง :{" "}
                  {
                    employees
                      .filter(
                        (employee) => employee._id === shipwork.organizer_id
                      ) // คัดกรองพนักงานที่มี _id ตรงกับ driver_id
                      .map((employee) => employee.name) // เอาชื่อของพนักงาน
                      .join(", ") || "ไม่พบชื่อพนักงาน" // ถ้าไม่พบพนักงานให้แสดงข้อความนี้
                  }
                </strong>
              </Col>
              <Col xs={6} className="d-flex justify-content-end mb-3">
                <strong className="text-dark">
                  ระยะทางการวิ่งงาน :{" "}
                  {shipwork.finish_mileage !== undefined &&
                  shipwork.start_mileage !== undefined
                    ? shipwork.finish_mileage - shipwork.start_mileage
                    : "-"}
                </strong>
              </Col>

              {/* Row 4: วันที่-เวลาเปิดใบงาน และ วันที่-เวลาส่งสินค้า */}
              <Col xs={6} className="d-flex justify-content-start mb-3">
                <strong className="text-dark">
                  เวลาคาดว่าจะจัดส่ง :{" "}
                  {formatTime(shipwork.expected_start_time)}
                </strong>
              </Col>
              <Col xs={6} className="d-flex justify-content-end mb-3">
                <strong className="text-dark">
                  เวลาคาดว่าจะจัดส่งสำเร็จ :{" "}
                  {formatTime(shipwork.expected_finish_time)}
                </strong>
              </Col>

              {/* Row 5: วันที่-เวลาเปิดใบงาน และ วันที่-เวลาส่งสินค้า */}
              <Col xs={6} className="d-flex justify-content-start mb-3">
                <strong className="text-dark">
                  เวลาจัดเริ่มต้นการจัดส่ง :{" "}
                  {shipwork.actual_start_time
                    ? formatTime(shipwork.actual_start_time)
                    : "-"}
                </strong>
              </Col>
              <Col xs={6} className="d-flex justify-content-end mb-3">
                <strong className="text-dark">
                  เวลาจัดส่งสำเร็จ :{" "}
                  {shipwork.actual_finish_time
                    ? formatTime(shipwork.actual_finish_time)
                    : "-"}
                </strong>
              </Col>

              {/* Row 5: วันที่-เวลาเปิดใบงาน และ วันที่-เวลาส่งสินค้า */}
              <Col xs={6} className="d-flex justify-content-start mb-3">
                <strong className="text-dark">
                  เลขไมล์รถขนส่งสินค้าเริ่มต้นการจัดส่ง :{" "}
                  {shipwork.start_mileage !== undefined
                    ? shipwork.start_mileage
                    : "-"}
                </strong>
              </Col>
              <Col xs={6} className="d-flex justify-content-end mb-3">
                <strong className="text-dark">
                  เลขไมล์รถขนส่งสินค้าเสร็จสิ้นการจัดส่ง :{" "}
                  {shipwork.finish_mileage !== undefined
                    ? shipwork.finish_mileage
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
                to={`/AddCustomer/${shipwork._id}`}
                className="text-decoration-none text-primary fw-bold btn btn-primary" // ใช้ Bootstrap class
              >
                เพิ่มร้านค้าจัดส่ง
              </Link>

              {/* ปุ่มแก้ไขข้อมูลใบงาน */}
              <Button
                variant="warning"
                className="d-flex align-items-center fw-bold text-dark" // ใช้ Bootstrap class
                onClick={() => {
                  handleShowEdit(shipwork); // ส่งค่า shipwork ไปให้ handleShowEdit
                }}
                style={{ fontSize: "0.9rem", gap: "5px" }} // ปรับขนาดฟอนต์ และช่องว่างระหว่างไอคอนกับข้อความ
              >
                <BsPencilSquare size={18} className="me-2" />{" "}
                {/* เพิ่ม margin ทางขวา */}
                แก้ไขข้อมูลใบงาน
              </Button>
            </Col>
          </Row>

          {/* Table for store information */}
          <Table bordered hover responsive="md" className="shadow-sm">
            <thead style={{ backgroundColor: "#2a33a1", color: "#ffffff" }}>
              <tr>
                <th style={{ width: "5%" }} className="text-center">
                  ลำดับ
                </th>
                <th style={{ width: "15%" }} className="text-center">
                  ชื่อร้าน
                </th>
                <th style={{ width: "30%" }} className="text-center">
                  ที่อยู่ร้านค้า
                </th>
                <th style={{ width: "15%" }} className="text-center">
                  เบอร์โทรร้านค้า
                </th>
                <th style={{ width: "10%" }} className="text-center">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody>
              {customers
                .filter(
                  (customer) => customer.workID === Ship_worksService.workID
                ) // กรองร้านค้าที่มี workID ตรงกับ workID ของ Ship_worksService
                .map((customer, index) => (
                  <tr key={customer._id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td className="text-center">{customer.tel}</td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        className="d-flex align-items-center"
                        onClick={() => handleShowDelete(customer)}
                        style={{
                          backgroundColor: "#dc3545", // สีแดง
                          borderColor: "#dc3545",
                          padding: "8px 16px", // ปรับขนาดปุ่ม
                          fontSize: "14px", // ขนาดฟอนต์
                        }}
                      >
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          {/* Modal แก้ไข */}
          <Modal show={modalType === "edit" && showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title
                style={{ fontWeight: "bold", fontSize: "24px", color: "#333" }}
              >
                แก้ไขข้อมูลใบงาน เลขที่ {selectedShipworks?.workID}
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
                  to={`/EditJobOrder/${selectedShipworks?._id}`} // ใช้ template literal เพื่อแทรกค่า _id
                  style={{
                    padding: "15px 15px",
                    fontSize: "18px",
                    color: "#ffffff",
                    backgroundColor: "#007bff",
                    borderColor: "#007bff",
                    borderRadius: "8px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  ตกลง
                </NavLink>

                {/* ปุ่มสำหรับข้อมูลลูกค้า  ${selectedShipworks?.workID}*/}
                {/* <NavLink
                  // to={/EditCustomer/${selectedShipworks?._id}} // ส่งค่าผ่าน URL
                  style={{
                    padding: "15px 15px",
                    fontSize: "18px",
                    color: "#ffffff",
                    backgroundColor: "#28a745",
                    borderColor: "#28a745",
                    borderRadius: "8px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  ข้อมูลลูกค้า
                </NavLink> */}
              </div>
            </Modal.Footer>
          </Modal>

          <Modal
            show={modalType === "delete" && showModal}
            onHide={handleClose}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ display: "flex", alignItems: "center" }}>
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
      </Container>
      <br />
    </StaffLayout>
  );
};

export default DetailJobOrder;
