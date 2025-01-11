import React, { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col, Table } from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import RoutetemplatesService from "../../server/Route_template";
import { useNavigate, useParams } from "react-router-dom";
import Ship_worksService from "../../server/Ship_work";

function AddCustomer() {
  const params = useParams();
  const { id } = params; // ใช้ id ของ Shipwork
  const navigate = useNavigate();

  const [routetemplate, setRoutetemplates] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]); // เก็บ customer_id ที่เลือก
  const [shipwork, setShipworks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const fetchShipwork = async () => {
    try {
      const res = await Ship_worksService.get(id);
      console.log(res.data.data);
      setShipworks(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRouteTemplate = async () => {
    try {
      const res = await RoutetemplatesService.getAll();
      setRoutetemplates(res.data.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  // ใช้ useEffect เพื่อดึงข้อมูลเส้นทางและ shipwork เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    fetchRouteTemplate();
    fetchShipwork();
  }, []);

  // ฟังก์ชันในการจัดการเมื่อเลือก checkbox
  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers((prevSelected) => {
      // ถ้าลูกค้าได้รับการเลือกแล้ว เราจะลบออกจากอาเรย์
      if (prevSelected.includes(customerId)) {
        return prevSelected.filter((id) => id !== customerId);
      }
      // ถ้ายังไม่ได้เลือกเพิ่ม customerId ลงในอาเรย์
      return [...prevSelected, customerId];
    });
  };

  // ฟังก์ชันในการจัดการเมื่อส่งฟอร์ม
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // ส่ง customer_id ที่เลือกไปยัง Ship_worksService
      for (const customerId of selectedCustomers) {
        await Ship_worksService.addCustomer(id, { customer_id: customerId });
      }
      // แสดงข้อความหรือเปลี่ยนเส้นทางหลังจากเพิ่มสำเร็จ
      alert("Added selected customers to the shipwork successfully!");
      navigate(`/DetailJobOrder/${id}`); // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ
    } catch (e) {
      console.log(e);
      alert("An error occurred while adding customers");
    }
  };

  return (
    <StaffLayout>
      <Container className="my-4">
        <div>
          <h2>เพิ่มร้านค้าที่ต้องการจัดส่ง</h2>
          <Form onSubmit={handleSubmit}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ชื่อเส้นทาง</th>
                  <th>ชื่อร้านค้า</th>
                  <th>ที่อยู่</th>
                </tr>
              </thead>
              <tbody>
                {routetemplate.map((route, index) =>
                  route.customers.map((customer, customerIndex) => (
                    <tr key={`${route.id}-${customerIndex}`}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          name="customer_id"
                          value={customer.customer_id}
                          onChange={() =>
                            handleCheckboxChange(customer.customer_id)
                          } // เมื่อเลือก checkbox
                        />
                      </td>
                      <td>{route.name}</td> {/* ชื่อเส้นทาง */}
                      <td>{customer.name}</td> {/* ชื่อร้านค้า */}
                      <td>{customer.address}</td> {/* ที่อยู่ของร้านค้า */}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </StaffLayout>
  );
}

export default AddCustomer;
