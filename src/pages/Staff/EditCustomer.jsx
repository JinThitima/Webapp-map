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
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import StaffLayout from "../../layouts/StaffLayout";
import CustomersService from "../../server/Customer";
import EmployeesService from "../../server/Employee";
import RoutetemplatesService from "../../server/Route_template";
import Ship_worksService from "../../server/Ship_work";

import ShippingstopsService from "../../server/shipping_stop"; // Update to Vehicle service
import { FaClipboard } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomer() {
  let params = useParams();
  let id = params.id;  
  
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
    status: "รอการอนุมัติ",
  });

  const fetchShip_work = (id) => {
    Ship_worksService.get(id)
      .then((res) => {
        const data = res.data.data;
        setFormData({
          workID: data.workID || "",
          customer_id: data.workID || "",
          status: data.status || "รอการอนุมัติ",
        });
      })
      .catch((error) => console.error("Error fetching job order:", error));
  };
    useEffect(() => {
      fetchShip_work(id);
    }, [id]);  

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
        <div
          className="border p-4 shadow-lg rounded mb-4"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Row>
            <Col md={12}>
              <h5 style={{ fontWeight: "bold", color: "#007bff" }}>
                รหัสใบงาน : {formData.workID}
              </h5>
              <p style={{ fontStyle: "italic", color: "#6c757d" }}>
                ข้อมูลลูกค้าที่ต้องการจัดส่ง
              </p>
              <table className="table table-striped table-bordered mt-3">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }} className="text-center">
                      #
                    </th>
                    <th style={{ width: "25%" }} className="text-center">
                      ชื่อร้านค้า
                    </th>
                    <th style={{ width: "30%" }} className="text-center">
                      ที่อยู่
                    </th>
                    <th style={{ width: "15%" }} className="text-center">
                      เบอร์โทรศัพท์
                    </th>
                    <th style={{ width: "15%" }} className="text-center">
                      status
                    </th>
                    <th style={{ width: "10%" }} className="text-center">
                      การดำเนินการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1</td>
                    <td>ร้าน XXX</td>
                    <td>XX ม.X ต.XXXXX จ.XXXXX XXXXX</td>
                    <td className="text-center">0XX-XXX-XXXX</td>
                    <td className="text-center">
                      <span
                        className="badge bg-warning text-dark"
                        style={{ padding: "5px 10px", fontSize: "12px" }}
                      >
                        รอการอนุมัติ
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-3 justify-content-between">
                        <center>
                          <Button
                            variant="danger"
                            className="d-flex align-items-center"
                            style={{
                              backgroundColor: "#dc3545", // สีแดง
                              borderColor: "#dc3545",
                              padding: "8px 16px", // ปรับขนาดปุ่ม
                              fontSize: "14px", // ขนาดฟอนต์
                            }}
                          >
                            <BsTrash size={20} />
                          </Button>
                        </center>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </div>

        <Form>
          <div
            className="border p-4 shadow-lg rounded mb-4"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Row>
              <Col md={12}>
                <Form.Group controlId="spots">
                  <Form.Label className="fw-medium">รหัสใบงาน</Form.Label>
                  <Form.Select
                    name="spots"
                    // onChange={handleChange}
                    // value={formData.spots}
                    required
                  >
                    <option value="">เลือกเส้นทางการจัดส่ง</option>
                    {ship_works.map((rtp) => (
                      <option key={rtp.id} value={rtp.workID}>
                        {rtp.workID}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {/* กรอบกราดที่ 2 */}
          <div
            className="border p-4 shadow-lg rounded mb-4"
            style={{ backgroundColor: "#f8f9fa" }}
          >
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
                    {filteredCustomers.map((cust) => (
                      <tr key={cust._id}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            name="name"
                            value={cust.name}
                            onChange={() => handleCheckboxChange(cust)}
                            checked={selectedCustomers.some(
                              (item) => item._id === cust._id
                            )}
                          />
                        </td>
                        <td>{cust.routeName}</td> {/* ชื่อเส้นทาง */}
                        <td>{cust.name}</td> {/* ชื่อร้านค้า */}
                        <td>{cust.address}</td> {/* ที่อยู่ร้านค้า */}
                      </tr>
                    ))}
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
                            key={cuts.id}
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
          </div>
          {/* ปุ่มบันทึกข้อมูล */}
        </Form>
      </Container>
    </StaffLayout>
  );
}

export default EditCustomer;
