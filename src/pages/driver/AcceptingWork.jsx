import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Modal,
  Form,Button
} from "react-bootstrap";
import { FaStore, } from "react-icons/fa";
import DriverLayout from "../../layouts/DriverLayout";
import { useNavigate, useParams } from "react-router-dom";
import ShipworksService from "../../server/Ship_work";
import "./AcceptingWork.css";
import ShippingStopCard from "./ShippingStopCard";

const AcceptingWork = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState({});
  const [selectedShip_work, setSelectedShip_work] = useState(null);
  const [modalType, setModalType] = useState("");
  const [editFormData, setEditFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
     try {
       const res = await ShipworksService.getShipWorkById(id);
       console.log(res.data.data);
       setSelectedShip_work(res.data.data);
     } catch (e) {
       console.log(e);
     }
  }

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

    const handleEditSubmit = (event) => {
      event.preventDefault();

      if (!selectedShip_work || !selectedShip_work._id) {
        alert("ไม่พบข้อมูลรถจัดส่งสินค้าที่ต้องการแก้ไข");
        return;
      }

      ShipworksService.updateFinishMileage(selectedShip_work._id, editFormData)
        .then(() => {
          alert("เพิ่มเลขไมล์รถจัดส่งสินค้าสำเร็จ");
          setShowModal(false);
          fetchData();

          setTimeout(() => {
            const id = selectedShip_work._id;
            navigate(`/AcceptingWork/${id}`);
          }, 300);
        })
        .catch((e) => {
          console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล", e);
          alert(
            "ไม่สามารถแก้ไขข้อมูลได้: " +
              (e.response?.data?.message || "ข้อผิดพลาดจากเซิร์ฟเวอร์")
          );
        });
    };

    const handleShowEdit = (selectedShip_work) => {
      setSelectedShip_work(selectedShip_work);
      setModalType("edit");
      setShowModal(true);
      setEditFormData({
        finish_mileage: selectedShip_work.finish_mileage || "",
      });
    };
  const handleClose = () => setShowModal(false);

  return (
    <DriverLayout>
      <Container className="mt-4">
        <div>
          {selectedShip_work ? (
            <div key={selectedShip_work._id}>
              <Row className="my-4 d-flex justify-content-center">
                <Col md={12} className="text-center">
                  <h2
                    className="main-title"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaStore style={{ marginRight: "10px" }} />
                    รายละเอียดใบงานการวิ่งงาน
                  </h2>
                </Col>
              </Row>
              <Row>
                <Card className="locations-card">
                  <Card.Header className="locations-header">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start">
                      <strong>ชื่อเส้นทาง: {selectedShip_work.spots}</strong>
                      <strong className="mt-2 mt-sm-0">
                        เลขที่ใบงาน: {selectedShip_work.workID}
                      </strong>
                    </div>

                    <div className="header-details mt-3">
                      <Row>
                        <Col className="text-md-start mb-2">
                          <div>
                            <strong>วันที่สร้างใบงาน:</strong>{" "}
                            {formatDate(selectedShip_work.date_worksheet)}
                          </div>
                        </Col>
                        <Col className="text-md-end mb-2">
                          <div>
                            <strong>วันที่จัดส่ง:</strong>{" "}
                            {formatDate(selectedShip_work.delivery_date)}
                          </div>
                        </Col>
                      </Row>

                      <Row className="text-md-start mb-2">
                        <Col>
                          <div>
                            <strong>เวลาเริ่มจัดส่ง:</strong>{" "}
                            {formatTime(selectedShip_work.actual_start_time)} น.
                          </div>
                        </Col>
                        <Col className="text-md-end">
                          <div>
                            <strong>จำนวนร้าน: 1 ร้าน</strong>{" "}
                            {employees[selectedShip_work.driver_id]}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card.Header>

                  <ListGroup variant="flush">
                    {selectedShip_work.shipping_stops.length > 0 ? (
                      selectedShip_work.shipping_stops.map(
                        (shippingStop, index) => (
                          <ShippingStopCard
                            key={index}
                            data={shippingStop}
                            shipWorkId={selectedShip_work._id}
                          />
                        )
                      )
                    ) : (
                      <ListGroup.Item>ไม่พบข้อมูลใบงานที่ตรงกัน</ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              </Row>
            </div>
          ) : (
            <Row className="my-4 d-flex justify-content-center">
              <Col md={12} className="text-center">
                <h4>ไม่มีข้อมูลใบงานการวิ่งงาน</h4>
              </Col>
            </Row>
          )}
        </div>
        <br />
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-end">
          <Button
            variant="success"
            className="start-button w-40 ms-auto"
            onClick={() => handleShowEdit(selectedShip_work)}
            style={{
              borderColor: "#ffc107",
              padding: "8px 16px",
              fontSize: "14px",
            }}
          >
            จัดส่งสินค้าสำเร็จ
          </Button>
        </div>

        <div>
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
                    name="finish_mileage"
                    value={editFormData.finish_mileage || ""}
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
      </Container>
    </DriverLayout>
  );
};

export default AcceptingWork;
