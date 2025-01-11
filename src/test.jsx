import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import StaffLayout from "../../layouts/StaffLayout";
import RoutetemplatesService from "../../server/Route_template";
import Ship_worksService from "../../server/Ship_work";
import { useNavigate, useParams } from "react-router-dom";

function AddCustomer() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [routetemplate, setRoutetemplates] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [shipwork, setShipworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");

  const fetchShipwork = async () => {
    try {
      const res = await Ship_worksService.get(id);
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

  useEffect(() => {
    fetchRouteTemplate();
    fetchShipwork();
  }, []);

  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customerId)
        ? prevSelected.filter((id) => id !== customerId)
        : [...prevSelected, customerId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      for (const customerId of selectedCustomers) {
        await Ship_worksService.addCustomer(id, { customer_id: customerId });
      }
      alert("Added selected customers to the shipwork successfully!");
      navigate(`/shipwork/${id}`);
    } catch (e) {
      console.log(e);
      alert("An error occurred while adding customers");
    }
  };

  const filteredCustomers = routetemplate
    .filter((route) => (selectedRoute ? route.id === selectedRoute : true))
    .flatMap((route) =>
      route.customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  return (
    <StaffLayout>
      <Container className="my-4">
        <h2 className="text-center mb-4">เพิ่มร้านค้าที่ต้องการจัดส่ง</h2>
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <FormControl
                placeholder="ค้นหาร้านค้า..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={6} className="text-end">
            <Dropdown onSelect={(e) => setSelectedRoute(e)}>
              <Dropdown.Toggle variant="outline-primary">
                {selectedRoute ? `เส้นทาง: ${selectedRoute}` : "กรองตามเส้นทาง"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="">ทั้งหมด</Dropdown.Item>
                {routetemplate.map((route) => (
                  <Dropdown.Item key={route.id} eventKey={route.id}>
                    {route.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Table striped bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>ชื่อเส้นทาง</th>
                <th>ชื่อร้านค้า</th>
                <th>ที่อยู่</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      value={customer.customer_id}
                      onChange={() =>
                        handleCheckboxChange(customer.customer_id)
                      }
                    />
                  </td>
                  <td>{customer.routeName}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-center mt-4">
            <Button variant="primary" type="submit">
              บันทึกการเลือก
            </Button>
          </div>
        </Form>
      </Container>
    </StaffLayout>
  );
}

export default AddCustomer;
