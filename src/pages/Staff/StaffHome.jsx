import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Table,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import {
  FaClipboardList,
  FaTruck,
  FaUsers,
  FaRoad,
  FaCar,
  FaFileInvoice,
  FaUserFriends,
  FaRoute,
  FaBuilding,
  FaUserTie,
} from "react-icons/fa"; // นำเข้าคอลเลคชันไอคอนจาก react-icons
import StaffLayout from "../../layouts/StaffLayout";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"; // นำเข้า Link จาก react-router-dom
import "./Car.css"; // นำเข้าไฟล์ CSS เพื่อปรับแต่งเพิ่มเติม
import Ship_worksService from "../../server/Ship_work"; // Update to Vehicle service
import VehiclesService from "../../server/Vehicle"; // show to Vehicle service
import EmployeesService from "../../server/Employee"; // เพิ่มการใช้งาน EmployeesService
import CustomersService from "../../server/Customer";
import RoutetemplatesService from "../../server/Route_template"; // เพิ่มการใช้งาน EmployeesService
import ShippingstopsService from "../../server/shipping_stop"; // Update to Vehicle service
import Shipping_companiesService from "../../server/Shipping_companies"; // Ensure this is correct

const StaffHome = () => {
  const navigate = useNavigate();
  const [selectedShipworks, setSelectedShipworks] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // คำค้นหา
  const [vehicles, setVehicles] = useState([]);
  const [routeTemplates, setRouteTemplates] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [shippingStops, setShippingStops] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});
  const [shippingCompanies, setShippingCompanies] = useState([]);

  const [shipworks, setShipworks] = useState([]);

  const [stats, setStats] = useState([]);

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
      shippingCompaniesRes,
    ] = await Promise.all([
      VehiclesService.getAll(),
      CustomersService.getAll(),
      ShippingstopsService.getAll(),
      RoutetemplatesService.getAll(),
      EmployeesService.getAll(),
      EmployeesService.userInfo(), // สำหรับข้อมูลผู้ใช้งาน
      Shipping_companiesService.getAll(), // สำหรับข้อมูลผู้ใช้งาน
    ]);

    // แสดงข้อมูลในสถานะต่างๆ
    setVehicles(vehiclesRes.data.data);
    setCustomers(customersRes.data.data);
    setShippingStops(shippingstopsRes.data.data);
    setRouteTemplates(routetemplatesRes.data.data);
    setUserInfo(userInfoRes.data.data); // ใช้ข้อมูล userInfoRes ที่ได้รับ
    setEmployees(employeesRes.data.data); // ใช้ข้อมูล userInfoRes ที่ได้รับ
    setShippingCompanies(shippingCompaniesRes.data.data); // ใช้ข้อมูล userInfoRes ที่ได้รับ

    // คำนวณค่าต่างๆ เช่น จำนวนของรายการในแต่ละประเภท
    const vehiclesCount = vehiclesRes.data.data.length;
    const customersCount = customersRes.data.data.length;
    const routesCount = routetemplatesRes.data.data.length;
    const employeesCount = employeesRes.data.data.length;
    const shippingStopsCount = shippingstopsRes.data.data.length;
    // const Ship_worksCount = shippingstopsRes.data.data.length;
    const shippingCompaniesCount = shippingCompaniesRes.data.data.length;

    // ตั้งค่า formData
    setFormData((prevData) => ({
      ...prevData,
      organizer_id: userInfoRes.data.data._id, // เก็บแค่ _id
    }));

    // ตั้งค่า Stats สำหรับแสดงผลใน UI
    setStats([
      {
        title: "ลูกค้าของเรา",
        value: customersCount,
        subtitle: "จำนวนลูกค้าในระบบ",
        color: "#FFC300", // สีเหลือง
        icon: <FaUserFriends size={32} />,
        link: "/Customer",
      },
      {
        title: "พนักงานของเรา",
        value: employeesCount,
        subtitle: "จำนวนพนักงานในระบบ",
        color: "#FF5733", // สีส้ม
        icon: <FaUserTie size={32} />,
        link: "/StaffUser",
      },
      {
        title: "รถส่งสินค้า",
        value: vehiclesCount,
        subtitle: "จำนวนรถที่ใช้งาน",
        color: "#2ECC71", // สีเขียว
        icon: <FaTruck size={32} />,
        link: "/Car",
      },
      {
        title: "ขนส่งเอกชน",
        value: shippingCompaniesCount,
        subtitle: "จำนวนขนส่งเอกชนในระบบ",
        color: "#1E90FF", // สีน้ำเงิน
        icon: <FaBuilding size={32} />,
        link: "/PrivateTransport",
      },
      {
        title: "เส้นทางการขนส่ง",
        value: routesCount,
        subtitle: "จำนวนเส้นทางในระบบ",
        color: "#8E44AD", // สีม่วง
        icon: <FaRoute size={32} />,
        link: "/GroupTransport",
      },
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
};

useEffect(() => {
  fetchData();
}, []);


  //แสดงข้อมูลของใบงาน
  const fetchShipworks = () => {
    Ship_worksService.getAll()
      .then((res) => {
        console.log(res.data); // ตรวจสอบข้อมูลที่ได้
        setShipworks(res.data.data);
      })
      .catch((e) => {
        console.error("API Error: ", e);
      });
  };

  useEffect(() => {
    fetchShipworks(); // ดึงข้อมูลเมื่อคอมโพเนนต์โหลด
  }, []); // รันแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลด

  //ค้นหาข้อมูล
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredShipworks = shipworks.filter((work) =>
    (work.spots || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClose = () => setShowModal(false);
  // Utility function for darkening a color
  function darkenColor(color, amount) {
    const colorValue = color.startsWith("#") ? color.slice(1) : color;
    const num = parseInt(colorValue, 16);
    let r = (num >> 16) - amount * 255;
    let g = ((num >> 8) & 0x00ff) - amount * 255;
    let b = (num & 0x0000ff) - amount * 255;
    r = r < 0 ? 0 : r > 255 ? 255 : Math.round(r);
    g = g < 0 ? 0 : g > 255 ? 255 : Math.round(g);
    b = b < 0 ? 0 : b > 255 ? 255 : Math.round(b);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }
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

  return (
    <StaffLayout>
      <Container className="mt-4">
        <Row>
          {stats.map((stat, index) => (
            <Col key={index} md={4} className="mb-4">
              <Link to={stat.link} style={{ textDecoration: "none" }}>
                <Card
                  className="stat-card"
                  style={{
                    background: `linear-gradient(135deg, ${
                      stat.color
                    } 0%, ${darkenColor(stat.color, 0.3)} 100%)`,
                    borderRadius: "15px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 30px rgba(0, 0, 0, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(0, 0, 0, 0.3)";
                  }}
                >
                  <Card.Body
                    className="d-flex align-items-center justify-content-between"
                    style={{
                      color: "white",
                      padding: "25px",
                    }}
                  >
                    <div
                      className="icon-container"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "50%",
                        padding: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "2rem",
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-right ml-auto">
                      <Card.Title
                        className="mt-2 card-title"
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1.6rem",
                          marginBottom: "0.8rem",
                        }}
                      >
                        {stat.title}
                      </Card.Title>
                      <Card.Text
                        className="stat-value"
                        style={{
                          fontSize: "3rem",
                          fontWeight: "bold",
                          lineHeight: "1.2",
                          color: "white",
                        }}
                      >
                        {stat.value}
                      </Card.Text>
                      <Card.Text
                        className="stat-subtitle"
                        style={{
                          color: "rgba(255, 255, 255, 0.8)",
                          fontSize: "1rem",
                        }}
                      >
                        {stat.subtitle}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <Card className="recent-orders-card">
          <Card.Body>
            <Row>
              <Col md={6}>
                <Card.Title>Recent WorkJob</Card.Title>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Form
                  className="me-3 d-flex justify-content-end"
                  style={{ flex: 1 }}
                >
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
                    className="mr-sm-2"
                  />
                </Form>
              </Col>
            </Row>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: "13%" }} className="text-center">
                    เลขที่ใบงาน
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    วันที่สร้าง
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    วันที่จัดส่ง
                  </th>
                  <th style={{ width: "20%" }} className="text-center">
                    ชื่อเส้นทาง
                  </th>
                  {/* <th style={{ width: "10%" }} className="text-center">
                    จำนวนร้านค้า
                  </th> */}
                  <th style={{ width: "10%" }} className="text-center">
                    ผู้ส่ง
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    รถที่ใช้ในการส่ง
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredShipworks.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      ไม่มีข้อมูลใบงาน
                    </td>
                  </tr>
                ) : (
                  filteredShipworks.map((work) => (
                    <tr key={work.id}>
                      <td
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        <Link
                          to={`/DetailJobOrder/${work._id}`}
                          style={{ textDecoration: "none", color: "blue" }}
                        >
                          {work.workID}
                        </Link>
                      </td>
                      <td className="text-center">
                        {formatDate(work.date_worksheet)}
                      </td>
                      <td className="text-center">
                        {formatDate(work.delivery_date)}
                      </td>

                      <td className="text-center">{work.spots}</td>
                      {/* <td className="text-center">5</td> */}
                      <td className="text-center">
                        {
                          employees
                            .filter(
                              (employee) => employee._id === work.driver_id
                            ) // คัดกรองพนักงานที่มี _id ตรงกับ driver_id
                            .map((employee) => employee.name) // เอาชื่อของพนักงาน
                            .join(", ") || "ไม่พบชื่อพนักงาน" // ถ้าไม่พบพนักงานให้แสดงข้อความนี้
                        }
                      </td>
                      <td className="text-center">
                        {
                          vehicles
                            .filter(
                              (vehicle) => vehicle._id === work.vechicle_id
                            ) // คัดกรองรถที่มี _id ตรงกับ vechicle_id
                            .map((vehicle) => vehicle.register_number) // เอาหมายเลขทะเบียนรถ
                            .join(", ") || "ไม่พบข้อมูลรถ" // ถ้าไม่พบข้อมูลให้แสดงข้อความนี้
                        }
                      </td>
                    </tr>
                  ))
                )}
                {/* ข้อมูลใบงานอื่น ๆ สามารถเพิ่มในนี้ */}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default StaffHome;
