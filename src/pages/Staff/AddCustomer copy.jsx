import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Table,
  Alert,
} from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import CustomersService from "../../server/Customer";
import EmployeesService from "../../server/Employee";
import RoutetemplatesService from "../../server/Route_template";
import Ship_worksService from "../../server/Ship_work";

import ShippingstopsService from "../../server/shipping_stop"; // Update to Vehicle service
import { FaClipboard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddCustomer() {
  const navigate = useNavigate();
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customer, setCustomers] = useState([]);
  const [ship_works, setShip_works] = useState([]);
  const [routetemplate, setRoutetemplates] = useState([]);
  const [formData, setFormData] = useState({
    workID: "",
    customer_id: [],
    // sequence: "",
    // status: "รอการอนุมัติ",
  });

  const fetchData = async () => {
    try {
      const CustomersResponse = await CustomersService.getAll();
      // console.log(CustomersResponse.data); // ตรวจสอบข้อมูลที่ได้
      setCustomers(CustomersResponse.data.data);

      const RoutetemplatesResponse = await RoutetemplatesService.getAll();
      // console.log(RoutetemplatesResponse.data); // ตรวจสอบข้อมูลที่ได้
      setRoutetemplates(RoutetemplatesResponse.data.data);

      const Ship_worksResponse = await Ship_worksService.getAll();
      // console.log('ship work',Ship_worksResponse.data); // ตรวจสอบข้อมูลที่ได้
      setShip_works(Ship_worksResponse.data.data);

      const employeesResponse = await EmployeesService.getAll();
      // console.log(employeesResponse.data.data);
      setEmployees(employeesResponse.data.data);
      setEmployees(
        employeesResponse.data.data.filter(
          (emp) => emp.type === "พนักงานขับรถส่งสินค้า"
        )
      );
    } catch (e) {
      console.error("API Error: ", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCustomers = routetemplate
    .flatMap((route) =>
      route.customers.map((cust) => ({ ...cust, routeName: route.name }))
    )
    .filter((cust) =>
      cust.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // เลือกข้อมูลใน Checkbox ไปแสดงในกรอบการ์ด
  const handleCheckboxChange = (cust) => {
    setSelectedCustomers((prevState) => {
      const isAlreadySelected = prevState.some((item) => item._id === cust._id);
      let updatedSelectedCustomers;
      if (isAlreadySelected) {
        updatedSelectedCustomers = prevState.filter(
          (item) => item._id !== cust._id
        );
      } else {
        updatedSelectedCustomers = [...prevState, cust];
      }

      // Update formData.customer_id
      setFormData((prev) => ({
        ...prev,
        customer_id: updatedSelectedCustomers.map((item) => item._id),
      }));

      return updatedSelectedCustomers;
    });
  };

  const validateForm = () => {
    // const required = ["workID", "status"];
    const required = ["workID"];
    const isValid =
      required.every((field) => formData[field]) &&
      selectedCustomers.length > 0;
    console.log("Validation:", isValid, formData, selectedCustomers);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await ShippingstopsService.create(formData);

      if (response.status === 201) {
        alert("บันทึกข้อมูลสำเร็จ");
        navigate("/DeliveryJobOrder");
        setFormData({
          workID: "",
          customer_id: [],
          status: "รอการอนุมัติ",
        });
        setSelectedCustomers([]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <StaffLayout>
      <Container className="my-4">
        <Row className="my-4 align-items-center">
          <Col md={12} className="text-center">
            <h2
              className="main-title"
              style={{
                fontWeight: "bold",
                fontSize: "2rem",
                color: "#000000",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <FaClipboard
                  size={35}
                  style={{ marginRight: "10px", color: "#000000" }}
                />
                เพิ่มร้านค้าที่ต้องการจัดส่ง
              </span>
            </h2>
            <hr
              style={{
                border: "none",
                height: "3px",
                background: "linear-gradient(90deg, #000000, #000000)",
                margin: "15px 0",
              }}
            />
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <div
            className="border p-4 shadow-lg rounded mb-4"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Row>
              <Col md={12}>
                <Form.Group controlId="workID">
                  <Form.Label className="fw-medium">รหัสใบงาน</Form.Label>
                  <Form.Select
                    name="workID"
                    onChange={handleChange}
                    value={formData.workID}
                    required
                  >
                    <option value="">เลือกเส้นทางการจัดส่ง</option>
                    {ship_works.map((rtp) => (
                      <option key={rtp._id} value={rtp.workID}>
                        {rtp.workID}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {/* กรอบกราดที่ 2 */}
          <div className="border p-4 shadow-sm rounded mb-4">
            <Row className="mb-3">
              <Col md={4}>
                <h5 className="fw-semibold text-secondary">
                  กรุณาเลือกร้านค้า
                </h5>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <div className="d-flex mb-3 ms-auto">
                  <Form.Control
                    type="text"
                    placeholder="ค้นหาชื่อร้าน"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="primary" className="ms-3">
                    ค้นหา
                  </Button>
                </div>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="fw-bold">เลือก</th>
                      <th className="fw-bold">กลุ่มเส้นทาง</th>
                      <th className="fw-bold">ชื่อร้านค้า</th>
                      <th className="fw-bold">ที่อยู่</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          ไม่พบข้อมูลร้านค้า
                        </td>
                      </tr>
                    ) : (
                      filteredCustomers.map((cust) => (
                        <tr key={cust._id}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              name="customer_id"
                              checked={selectedCustomers.some(
                                (item) => item._id === cust._id
                              )}
                              onChange={() => handleCheckboxChange(cust)}
                            />
                          </td>
                          <td>{cust.routeName}</td>
                          <td>{cust.name}</td>
                          <td>{cust.address}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Col>
              <Col md={4}>
                <div className="border p-4 shadow-sm rounded mb-4">
                  <Row className="mb-3">
                    <Col
                      md={12}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <h5 className="fw-semibold text-secondary">
                        รายการที่เลือก
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      {selectedCustomers.length === 0 ? (
                        <Alert variant="warning" className="mb-1 text-center">
                          กรุณาเลือกร้านค้าที่ต้องการจัดส่ง
                        </Alert>
                      ) : (
                        selectedCustomers.map((cuts) => (
                          <Alert
                            variant="primary"
                            className="mb-1"
                            dismissible
                            key={cuts._id} // Change `cuts.id` to `cuts._id`
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <strong className="me-2">{cuts.name}</strong>
                            </div>
                          </Alert>
                        ))
                      )}
                    </Col>
                  </Row>
                </div>
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
          {/* ปุ่มบันทึกข้อมูล */}
        </Form>
      </Container>
    </StaffLayout>
  );
}

export default AddCustomer;
