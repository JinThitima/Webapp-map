import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import { BsFillPersonPlusFill, BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { useParams, NavLink } from "react-router-dom";

import VehiclesService from "../../server/Vehicle"; // Update to Vehicle service

const Detail_car = () => {
  let params = useParams();
  let id = params.id;
  let [vehicle, setVehicle] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

    const fetchVehicle = (id) => {
      VehiclesService.get(id)
        .then((res) => {
          setVehicle(res.data.data);
        })
        .catch((e) => console.log(e));
    };

    useEffect(() => {
      fetchVehicle(id);
    }, [id]);

  return (
    <StaffLayout>
      <Container className="mt-4">
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
                <FaCar
                  size={40}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />
                รายละเอียดรถบริษัท
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
        {/* Header */}
        <Card
          className="mb-4 shadow-sm"
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <Card.Body className="py-3 px-4">
            <Row className="align-items-center">
              {/* Image Section */}
              <Col md={4} className="d-flex justify-content-center">
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid #4A90E2",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="../images/car.png"
                    alt="Car"
                    style={{
                      width: "90%",
                      height: "90%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Col>

              {/* Text Section */}
              <Col md={8} className="text-center text-md-start">
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#2A2A2A",
                    marginBottom: "8px",
                  }}
                >
                  {vehicle.register_number}
                </h3>
                <p
                  style={{
                    color: "#757575",
                    fontSize: "1rem",
                    marginBottom: "0",
                  }}
                >
                  {vehicle.brand_modal}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Vehicle Information */}
        <Card className="shadow-sm">
          <Card.Header
            as="h4"
            style={{ backgroundColor: "#2a33a1", color: "#ffffff" }}
          >
            ข้อมูลเบื้องต้น
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>ยี่ห้อและรุ่นรถ : </strong> {vehicle.brand_modal}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ประเภทรถ : </strong> {vehicle.vehicle_type}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>สีรถ : </strong> {vehicle.vehicle_color}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>วันที่จะทะเบียน : </strong> {vehicle.register_date}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        {/* Delivery Details Table */}
        <Card className="shadow-sm mt-4">
          <Card.Header
            as="h4"
            style={{ backgroundColor: "#2a33a1", color: "#ffffff" }}
          >
            รายละเอียดการจัดส่ง
          </Card.Header>
          <Card.Body>
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th style={{ width: "10%" }} className="text-center">
                    วันที่
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    เส้นที่จัดส่ง
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    เลขไมค์รถเริ่มงาน
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    เลขไมค์รถที่จบงาน
                  </th>
                  <th style={{ width: "15%" }} className="text-center">
                    รวมระยะทาง
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    จัดส่งเสร็จเวลา
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    จบจัดส่งเวลา
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">2024-12-21</td>
                  <td className="text-center">ลาดกระบัง</td>
                  <td className="text-center">12345</td>
                  <td className="text-center">12567</td>
                  <td className="text-center">222 กิโลเมตร</td>
                  <td className="text-center">08:00</td>
                  <td className="text-center">17:00</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary btn-sm"
                      style={{
                        backgroundColor: "#4A90E2",
                        borderColor: "#4A90E2",
                      }}
                    >
                      เพิ่มเติม
                    </button>
                  </td>
                </tr>
                {/* เพิ่มแถวข้อมูลได้ตามต้องการ */}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Container>
      <br />
    </StaffLayout>
  );
};

export default Detail_car;
