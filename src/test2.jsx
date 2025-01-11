import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import VehiclesService from "../../server/Vehicle"; // ดึงข้อมูล Vehicle
import EmployeesService from "../../server/Employee"; // ดึงข้อมูล Employee
import Ship_worksService from "../../server/Ship_work"; // จัดการข้อมูล Ship Work

const AddJobOrder = () => {
  const [vehicles, setVehicles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    workID: "", // หมายเลขใบงาน
    status: "", // สถานะใบงาน
    date_worksheet: "", // วันที่สร้างใบงาน
    delivery_date: "", // วันที่ส่งสินค้า
    expected_start_time: "", // เวลาที่คาดว่าจะเริ่มต้น
    expected_finish_time: "", // เวลาที่คาดว่าจะเสร็จสิ้น
    spots: "", // สถานที่จัดส่ง
    driver_id: "", // รหัสพนักงานขับรถ
    organizer_id: "", // รหัสเจ้าหน้าที่ประสานงาน
    vechicle_id: "", // รหัสยานพาหนะ
  });


  // ดึงข้อมูลยานพาหนะและพนักงานเมื่อ Component ถูก mount
  useEffect(() => {
    // ดึงข้อมูลจาก VehiclesService
    VehiclesService.getAll()
      .then((response) => {
        setVehicles(response.data); // ตั้งค่าข้อมูลยานพาหนะ
      })
      .catch((error) => console.error("Error fetching vehicles:", error));

    // ดึงข้อมูลจาก EmployeesService (กรองเฉพาะ status = เจ้าหน้าที่ประสานงานขนส่ง)
    EmployeesService.getAll({ status: "เจ้าหน้าที่ประสานงานขนส่ง" })
      .then((response) => {
        setEmployees(response.data); // ตั้งค่าข้อมูลพนักงาน
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // ฟังก์ชันจัดการการเปลี่ยนค่าในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ฟังก์ชันบันทึกข้อมูลใบงานใหม่
  const handleSubmit = (e) => {
    e.preventDefault();
    Ship_worksService.create(formData)
      .then(() => {
        alert("เพิ่มใบงานสำเร็จ!");
        setFormData({
          vehicle: "",
          driver: "",
          jobName: "",
          deliveryDate: "",
        });
      })
      .catch((error) => {
        console.error("Error adding job order:", error);
        alert("เกิดข้อผิดพลาดในการเพิ่มใบงาน");
      });
  };

  return (
    <Container>
      <h2 className="mb-4">เพิ่มใบงาน</h2>
      <Form onSubmit={handleSubmit}>
        {/* ชื่อใบงาน */}
        <Form.Group controlId="jobName" className="mb-3">
          <Form.Label className="fw-medium text-dark">ชื่อใบงาน</Form.Label>
          <Form.Control
            type="text"
            name="jobName"
            value={formData.jobName}
            onChange={handleChange}
            placeholder="กรอกชื่อใบงาน"
          />
        </Form.Group>

        {/* วันที่ส่ง */}
        <Form.Group controlId="deliveryDate" className="mb-3">
          <Form.Label className="fw-medium text-dark">วันที่ส่ง</Form.Label>
          <Form.Control
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
          />
        </Form.Group>

        {/* เลือกยานพาหนะ */}
        <Form.Group controlId="vehicle" className="mb-3">
          <Form.Label className="fw-medium text-dark">ยานพาหนะ</Form.Label>
          <Form.Select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
          >
            <option value="">เลือกยานพาหนะ</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.register_number}>
                {vehicle.register_number}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* เลือกพนักงานขับรถ */}
        <Form.Group controlId="driver" className="mb-3">
          <Form.Label className="fw-medium text-dark">พนักงานขับรถ</Form.Label>
          <Form.Select
            name="driver"
            value={formData.driver}
            onChange={handleChange}
          >
            <option value="">เลือกพนักงานขับรถ</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* ปุ่มบันทึก */}
        <Button type="submit" variant="primary">
          บันทึกใบงาน
        </Button>
      </Form>
    </Container>
  );
};

export default AddJobOrder;
