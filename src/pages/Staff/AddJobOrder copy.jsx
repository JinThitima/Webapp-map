import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import VehiclesService from "../../server/Vehicle";
import EmployeesService from "../../server/Employee";
import RoutetemplatesService from "../../server/Route_template";
import Ship_worksService from "../../server/Ship_work";
import { FaClipboard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddJobOrder() {
  const navigate = useNavigate();

  const [vechicles, setVehicles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [routetemplate, setRoutetemplates] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [formData, setFormData] = useState({
    workID: "",
    status: "รอการอนุมัติ",
    date_worksheet: "",
    delivery_date: "",
    expected_start_time: "",
    expected_finish_time: "",
    spots: "",
    driver_id: "",
    vechicle_id: "",
    organizer_id: "",
  });
  const [workIdData, setWorkIdData] = useState({
    workCount: 0,
  });

  useEffect(() => {
    // เมื่อโหลดข้อมูลจาก localStorage
    const storedWorkCount = localStorage.getItem("workCount");

    if (storedWorkCount) {
      setWorkIdData((prev) => ({
        ...prev,
        workCount: parseInt(storedWorkCount, 10),
      }));
    }
  }, []);

  // สร้าง workID ใหม่เมื่อ workCount เปลี่ยน
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getFullYear()).slice(
      -2
    )}${String(currentDate.getMonth() + 1).padStart(2, "0")}${String(
      currentDate.getDate()
    ).padStart(2, "0")}`;

    const newWorkID = `PTN.${formattedDate}-${String(
      workIdData.workCount
    ).padStart(2, "0")}`;

    setFormData((prev) => ({
      ...prev,
      workID: newWorkID,
      date_worksheet: currentDate.toISOString().split("T")[0],
    }));
  }, [workIdData.workCount]);

  // เพิ่ม count เมื่อมีการรีเฟรช
  const handleIncreaseWorkCount = () => {
    setWorkIdData((prev) => {
      const newCount = prev.workCount + 1;
      localStorage.setItem("workCount", newCount); // เก็บข้อมูลใหม่ใน localStorage
      return {
        ...prev,
        workCount: newCount, // อัพเดทค่าของ workCount
      };
    });
  };

  // ค่าของฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // เมื่อ component ถูกโหลดครั้งแรกจะเพิ่ม workCount
  useEffect(() => {
    handleIncreaseWorkCount(); // เพิ่ม workCount เมื่อมีการรีเฟรช
  }, []);

  const fetchData = async () => {
    try {
      const [vechiclesRes, routesRes, employeesRes, userInfoRes] =
        await Promise.all([
          VehiclesService.getAll(),
          RoutetemplatesService.getAll(),
          EmployeesService.getAll(),
          EmployeesService.userInfo(), // แก้ไขเพื่อให้เป็นการเรียก API ที่ถูกต้อง
        ]);

      // แสดงข้อมูลในสถานะต่างๆ
      setVehicles(vechiclesRes.data.data);
      setRoutetemplates(routesRes.data.data);
      setUserInfo(userInfoRes.data.data); // ใช้ userInfoRes ที่ได้รับ
      setEmployees(
        employeesRes.data.data.filter(
          (emp) => emp.type === "พนักงานขับรถส่งสินค้า"
        )
      );

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

  const validateForm = () => {
    const required = [
      "delivery_date",
      "spots",
      "expected_start_time",
      "expected_finish_time",
      "vechicle_id",
      "driver_id",
      "organizer_id",
    ];

    return required.every((field) => formData[field]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      console.log(validateForm);
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await Ship_worksService.create({
        ...formData,
        date_worksheet: new Date(formData.date_worksheet).toISOString(),
        delivery_date: new Date(formData.delivery_date).toISOString(),
      });

      if (response.status === 201) {
        alert("บันทึกข้อมูลสำเร็จ");
        navigate("/AddCustomer");
        setFormData({
          workID: "",
          status: "รอการอนุมัติ",
          date_worksheet: "",
          delivery_date: "",
          expected_start_time: "",
          expected_finish_time: "",
          spots: "",
          driver_id: "",
          vechicle_id: "",
          organizer_id: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <StaffLayout>
      <Container className="my-4">
        {/* Header Section */}
        <Row className="my-4 align-items-center">
          <Col md={12} className="text-center">
            <h2
              className="main-title fw-bold"
              style={{ fontSize: "2rem", color: "#000000" }}
            >
              <span className="d-inline-flex align-items-center">
                <FaClipboard size={35} className="me-2" />
                เพิ่มใบงานใหม่
              </span>
            </h2>
            <hr className="border-3 bg-black my-3" />
          </Col>
        </Row>

        {/* Form Section */}
        <Form onSubmit={handleSubmit}>
          <div
            className="border p-4 shadow-lg rounded mb-4"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="workID">
                  <Form.Label className="fw-bold text-secondary">
                    รหัสใบงาน
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="workID"
                    value={formData.workID}
                    onChange={handleChange}
                    readOnly
                    className="border rounded p-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="workID">
                  <Form.Label className="fw-bold text-secondary">
                    userInfo
                  </Form.Label>
                  <input
                    type="hidden"
                    name="inspector"
                    value={formData.organizer_id?._id}
                  />
                  <Form.Control
                    type="text"
                    name="workID"
                    value={userInfo.name}
                    disabled
                    onChange={handleChange}
                    readOnly
                    className="border rounded p-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="fw-semibold text-secondary">รายละเอียดใบงาน</h5>
            <div className="border p-3 mt-4">
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="delivery_date">
                    <Form.Label className="fw-medium">วันที่จัดส่ง</Form.Label>
                    <Form.Control
                      type="date"
                      name="delivery_date"
                      value={formData.delivery_date}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="spots">
                    <Form.Label className="fw-medium">
                      เส้นทางการจัดส่ง
                    </Form.Label>
                    <Form.Select
                      name="spots"
                      onChange={handleChange}
                      value={formData.spots}
                      required
                    >
                      <option value="">เลือกเส้นทางการจัดส่ง</option>
                      {routetemplate.map((rtp) => (
                        <option key={rtp.id} value={rtp.name}>
                          {rtp.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="expected_start_time">
                    <Form.Label className="fw-medium">
                      เวลาคาดว่าจะเริ่มจัดส่ง
                    </Form.Label>
                    <Form.Control
                      type="time"
                      name="expected_start_time"
                      value={formData.expected_start_time}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="vechicle_id">
                    <Form.Label className="fw-medium">ยานพาหนะ</Form.Label>
                    <Form.Select
                      name="vechicle_id"
                      onChange={handleChange}
                      value={formData.vechicle_id}
                      required
                    >
                      <option value="">เลือกยานพาหนะ</option>
                      {vechicles.map((vechicle) => (
                        <option key={vechicle._id} value={vechicle._id}>
                          {vechicle.register_number}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="expected_finish_time">
                    <Form.Label className="fw-medium">
                      เวลาคาดว่าจะจัดส่งเสร็จสิ้น
                    </Form.Label>
                    <Form.Control
                      type="time"
                      name="expected_finish_time"
                      value={formData.expected_finish_time}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="driver_id">
                    <Form.Label className="fw-medium">พนักงานขับรถ</Form.Label>
                    <Form.Select
                      name="driver_id"
                      onChange={handleChange}
                      value={formData.driver_id}
                      required
                    >
                      <option value="">เลือกพนักงานขับรถ</option>
                      {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className="d-flex justify-content-center mt-3">
                  <Button
                    type="submit"
                    variant="success"
                    className="px-5 py-2 fw-bold"
                    style={{ fontSize: "1.1rem" }}
                  >
                    บันทึกข้อมูล
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </Container>
    </StaffLayout>
  );
}

export default AddJobOrder;
