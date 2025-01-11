import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import Ship_worksService from "../../server/Ship_work";
import EmployeesService from "../../server/Employee";
import "./DriverHome.css";
import VehiclesService from "../../server/Vehicle"; // show to Vehicle service

function DriverHome() {
  const [userInfo, setUserInfo] = useState(null);
  const [filteredShipworks, setFilteredShipworks] = useState([]);
  const [message, setMessage] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({});
    const [selectedShipworks, setSelectedShipworks] = useState(null);


  const [editFormData, setEditFormData] = useState({
    start_mileage: "",
  });

  // Fetch user and shipworks data
  const fetchData = async () => {
    try {
      // Fetch user info
      const userInfoRes = await EmployeesService.userInfo();
      const userId = userInfoRes.data.data._id;
      setUserInfo(userInfoRes.data.data);

      // Fetch shipworks
      const shipworksRes = await Ship_worksService.getAll();
      const allShipworks = shipworksRes.data.data || [];

      // Filter shipworks based on conditions
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

    const [startMileage, setStartMileage] = useState(""); // กำหนด state สำหรับเลขไมล์
    const [statusUpdateError, setStatusUpdateError] = useState(""); // สำหรับแสดง error

    const handleStartMileageChange = (e) => {
      setStartMileage(e.target.value); // อัพเดทค่า startMileage ตามที่กรอก
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();

  // สร้าง formData
  const formData = {
    start_mileage: startMileage, // ค่าที่กรอกในฟอร์ม
    _id: selectedShipworks._id, // ส่ง _id ผ่าน body ของคำขอ
  };

  try {
    // เรียกฟังก์ชัน updateStartMileage โดยส่ง formData
    const result = await Ship_worksService.updateStartMileage(
      selectedShipworks._id,
      formData
    );
    console.log("Start mileage updated successfully", result);
  } catch (error) {
    console.error("Error updating start mileage:", error);
  }
};

  
const updateStartMileage = async (req, res) => {
  try {
    const { _id, start_mileage } = req.body; // รับ _id และ start_mileage จาก body ของคำขอ

    // ตรวจสอบข้อมูล
    if (!start_mileage || !_id) {
      return res
        .status(400)
        .json({ message: "ID and start_mileage are required" });
    }

    const actual_start_time = new Date();

    // อัปเดตข้อมูลในฐานข้อมูล
    const updateResult = await Shipwork.findByIdAndUpdate(_id, {
      start_mileage,
      actual_start_time,
    });

    if (!updateResult) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Start mileage updated successfully" });
  } catch (error) {
    console.error("Error updating start mileage:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


  

  return (
    <div className="full-screen-bg">
      <Container className="d-flex flex-column align-items-center justify-content-center">
        {/* Logo Banner */}
        <img src="/images/Logo.png" alt="PTN Logo" className="logo-image" />

        {/* Main Card Content */}
        <Card className="main-card text-center p-3">
          <Card.Body>
            {/* Profile Image */}
            <div className="d-flex justify-content-center align-items-center mb-4">
              <img
                src="/images/admin.png"
                alt="Profile"
                className="profile-image"
              />
            </div>

            {/* Conditional Rendering */}
            {filteredShipworks.length > 0 ? (
              filteredShipworks.map((work) => (
                <div key={work._id}>
                  <h5>ใบงาน: {work.workID}</h5>
                  <p className="text-muted">
                    เส้นทาง: {work.spots} {work._id}
                    <br />
                  </p>
                  <form onSubmit={(e) => updateStartMileage(e, work._id)}>
                    <Form.Group controlId="formLicensePlate" className="mb-3">
                      <Form.Label className="text-muted">
                        กรุณากรอกเลขไมล์รถยนต์
                      </Form.Label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-white">
                            <FaCar />
                          </span>
                        </div>
                        <Form.Control
                          type="text"
                          name="start_mileage"
                          placeholder="เลขไมล์รถยนต์"
                          value={startMileage} // ใช้ state นี้แทน
                          onChange={handleStartMileageChange}
                        />
                      </div>
                    </Form.Group>

                    {/* Hidden Input for _id */}
                    <input type="hidden" name="work_id" value={work._id} />

                    {/* Error Message */}
                    {statusUpdateError && (
                      <div className="alert alert-danger" role="alert">
                        {statusUpdateError}
                      </div>
                    )}

                    {/* Start Delivery Button */}
                    <Button
                      variant="primary"
                      size="lg"
                      className="start-button w-100"
                      type="submit"
                    >
                      เริ่มต้นส่งสินค้า
                    </Button>
                  </form>
                </div>
              ))
            ) : (
              <Alert variant="warning">{message}</Alert>
            )}
            {/* Contact Information */}
            <p className="contact-info mt-3">ติดต่อผู้ดูแลระบบ 063-464-6665</p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DriverHome;
