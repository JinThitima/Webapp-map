import http from "../http-common.js";

const baseUrl = "/route_templates"
const getAll = () => {
  return http.get(`${baseUrl}`);
};

const get = (id) => {
  return http.get(`${baseUrl}/${id}`);
};

const create = (user) => {
  return http.post(`${baseUrl}`, user);
};

const deleteRoute_templates = (id) => {
  return http.delete(`${baseUrl}/${id}`);
};

const updateRoute_templates = (id, user) => {
  return http.put(`${baseUrl}/${id}`, user);
};

const addCustomer = (id, customer) => {
  return http.patch(`${baseUrl}/${id}`, customer)
}

const deleteCustomer = (id, customerId) => {
  return http.delete(`${baseUrl}/${id}/customer/${customerId}`);
};


const Route_templatesService = {
  getAll,
  get,
  create,
  deleteRoute_templates,
  updateRoute_templates,
  addCustomer,
  deleteCustomer,
};

export default Route_templatesService;
