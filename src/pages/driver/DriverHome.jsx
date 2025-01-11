import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Alert,
  Button,
  Modal,
  Form,
  Row,
} from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import Ship_worksService from "../../server/Ship_work";
import EmployeesService from "../../server/Employee";
import "./DriverHome.css";
import { useNavigate } from "react-router-dom";
import VehiclesService from "../../server/Vehicle";

function DriverHome() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [filteredShipworks, setFilteredShipworks] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [startMileage, setStartMileage] = useState("");
  const [ship_works, setShip_works] = useState([]);
  const [vehicles, setVehicles] = useState({});
  const [employees, setEmployees] = useState({});
  const [selectedShip_work, setSelectedShip_work] = useState(null);
  const [modalType, setModalType] = useState("");
  const [editFormData, setEditFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all necessary data
  const fetchData = async () => {
    try {
      const userInfoRes = await EmployeesService.userInfo();
      const userId = userInfoRes.data.data._id;
      setUserInfo(userInfoRes.data.data);

      const [shipworksRes, vehiclesRes, employeesRes] = await Promise.all([
        Ship_worksService.getAll(),
        VehiclesService.getAll(),
        EmployeesService.getAll(),
      ]);

      const allShipworks = shipworksRes.data.data || [];
      const vehicleMap = (vehiclesRes.data.data || []).reduce(
        (acc, vehicle) => {
          acc[vehicle._id] = vehicle.register_number;
          return acc;
        },
        {}
      );
      const employeeMap = (employeesRes.data.data || []).reduce(
        (acc, employee) => {
          acc[employee._id] = employee.name;
          return acc;
        },
        {}
      );

      setVehicles(vehicleMap);
      setEmployees(employeeMap);

      const matchingShipworks = allShipworks.filter(
        (work) =>
          work.driver_id === userId && work.status === "อนุมัติการจัดส่ง"
      );

      if (matchingShipworks.length > 0) {
        setFilteredShipworks(matchingShipworks);
      } else {
        setMessage("กรุณารอเจ้าหน้าที่ประสานงานขนส่งอนุมัติการจัดส่ง");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (!selectedShip_work || !selectedShip_work._id) {
      alert("ไม่พบข้อมูลรถจัดส่งสินค้าที่ต้องการแก้ไข");
      return;
    }

    setIsLoading(true);

    Ship_worksService.updateStartMileage(selectedShip_work._id, editFormData)
      .then(() => {
        alert("เพิ่มเลขไมล์รถจัดส่งสินค้าสำเร็จ");
        setShowModal(false);
        fetchData();

        setTimeout(() => {
          const workId = selectedShip_work._id;
          navigate(`/AcceptingWork/${workId}`);
        }, 300);
      })
      .catch((e) => {
        console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล", e);
        alert(
          "ไม่สามารถแก้ไขข้อมูลได้: " +
            (e.response?.data?.message || "ข้อผิดพลาดจากเซิร์ฟเวอร์")
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => setShowModal(false);

  const handleShowEdit = (work) => {
    setSelectedShip_work(work);
    setModalType("edit");
    setShowModal(true);
    setEditFormData({
      start_mileage: work.start_mileage || "",
    });
  };

  return (
    <div className="full-screen-bg">
      <Container className="d-flex flex-column align-items-center justify-content-center">
        <img src="/images/Logo.png" alt="PTN Logo" className="logo-image" />

        <Card className="main-card text-center p-3">
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center mb-4">
              <img
                src="/images/admin.png"
                alt="Profile"
                className="profile-image"
              />
            </div>

            {filteredShipworks.length > 0 ? (
              filteredShipworks.map((work) => (
                <div key={work._id}>
                  <h5>ใบงาน: {work.workID}</h5>
                  <p className="text-muted">
                    เส้นทาง : {work.spots}
                    {/* <br />
                    รถจัดส่งสินค้า :{" "}
                    {vehicles[work.vehicle_id] || "ไม่ทราบข้อมูล"} */}
                    <br />
                    พนักงานจัดส่งสินค้า :{" "}
                    {employees[work.driver_id] || "ไม่ทราบข้อมูล"}
                  </p>
                  <Button
                    variant="primary"
                    className="start-button w-100"
                    onClick={() => handleShowEdit(work)}
                    style={{
                      borderColor: "#ffc107",
                      padding: "8px 16px",
                      fontSize: "14px",
                    }}
                  >
                    เริ่มต้นการจัดส่ง
                  </Button>
                </div>
              ))
            ) : (
              <Alert variant="warning">{message}</Alert>
            )}

            <p className="contact-info mt-3">ติดต่อผู้ดูแลระบบ 063-464-6665</p>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={modalType === "edit" && showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>กรุณากรอกเลขไมล์รถยนต์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formStartMileage">
              <Form.Label>เลขไมล์รถยนต์</Form.Label>
              <Form.Control
                type="text"
                name="start_mileage"
                value={editFormData.start_mileage || ""}
                onChange={handleChangeEdit}
                placeholder="กรุณากรอกเลขไมล์"
              />
            </Form.Group>
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
    </div>
  );
}

export default DriverHome;
