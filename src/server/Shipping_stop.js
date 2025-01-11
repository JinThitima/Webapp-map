import http from "../http-common.js";

const getAll = () => {
  return http.get("/shipping_stops");
};

const getShippingStopById = (id) => {
  return http.get("/shipping_stops/" + id);
};

const create = (formData) => {
  return http.post("/shipping_stops", formData);
};

const deleteShippingstops = (id) => {
  return http.delete("/shipping_stops/" + id);
};

const updateShippingstops = (id, user) => {
  return http.put("/shipping_stops/" + id, user);
};

const addCustomer = (id, customer) => {
  return http.patch(`/shipping_stops/${id}`, customer);
}

const deleteCustomer = (id, customerId) => {
  return http.delete(`/shipping_stops/${id}/customer/${customerId}`);
};

const ShippingstopsService = {
  getAll,
  getShippingStopById,
  create,
  deleteShippingstops,
  addCustomer,
  deleteCustomer,
};

export default ShippingstopsService;
