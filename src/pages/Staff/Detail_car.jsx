import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import { FaCar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import VehiclesService from "../../server/Vehicle";
import Ship_worksService from "../../server/Ship_work";

const Detail_car = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [shipworks, setShipworks] = useState([]);

  const fetchVehicle = async () => {
    try {
      const res = await VehiclesService.get(id);
      console.log(VehiclesService);
      setVehicle(res.data.data);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  };

  const fetchShipworks = async () => {
    try {
      const res = await Ship_worksService.getAll();
      console.log(Ship_worksService);
      const filteredShipworks = res.data.data.filter(
        (work) => work.vehicle_id === id
      );
      setShipworks(filteredShipworks);
    } catch (error) {
      console.error("Error fetching shipworks data:", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
    fetchShipworks();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
          </Col>
        </Row>

        {vehicle && (
          <Card className="mb-4 shadow-sm">
            <Card.Body className="py-3 px-4">
              <Row className="align-items-center">
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
                      src={`../images/${vehicle.image_car}`}
                      alt="Car"
                      style={{
                        width: "90%",
                        height: "90%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Col>

                <Col md={8} className="text-center text-md-start">
                  <h3 style={{ fontWeight: "600", color: "#2A2A2A" }}>
                    {vehicle.register_number}
                  </h3>
                  <p style={{ color: "#757575" }}>{vehicle.brand_modal}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {vehicle && (
          <Card className="shadow-sm">
            <Card.Header
              as="h4"
              style={{ backgroundColor: "#2a33a1", color: "#ffffff" }}
            >
              ข้อมูลเบื้องต้น
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>ยี่ห้อและรุ่นรถ: </strong> {vehicle.brand_modal}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>ประเภทรถ: </strong> {vehicle.vehicle_type}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>สีรถ: </strong> {vehicle.vehicle_color}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>วันที่จะทะเบียน: </strong>{" "}
                {formatDate(vehicle.register_date)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        )}
        <br />
        {/* <Card className="shadow-sm mt-4">
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
                  <th>วันที่</th>
                  <th>เส้นที่จัดส่ง</th>
                  <th>เลขไมล์เริ่ม</th>
                  <th>เลขไมล์จบ</th>
                  <th>ระยะทาง</th>
                  <th>เวลาเริ่ม</th>
                  <th>เวลาจบ</th>
                </tr>
              </thead>
              <tbody>
                {shipworks.map((work, index) => (
                  <tr key={index}>
                    <td>{formatDate(work.delivery_date)}</td>
                    <td>{work.route_name || "-"}</td>
                    <td>{work.start_mileage || "-"}</td>
                    <td>{work.finish_mileage || "-"}</td>
                    <td>{work.distance || "-"}</td>
                    <td>{work.actual_start_time || "-"}</td>
                    <td>{work.actual_finish_time || "-"}</td>
                  </tr>
                ))}
                {shipworks.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center">
                      ไม่พบข้อมูลใบงาน
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card.Body>
        </Card> */}
      </Container>
    </StaffLayout>
  );
};

export default Detail_car;
