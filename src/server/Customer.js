import http from "../http-common.js";

const getAll = () => {
  return http.get("/customers");
};

const get = (id) => {
  return http.get("/customers/" + id);
};

const create = (user) => {
  return http.post("/customers", user);
};

const deleteCustomers = (id) => {
  return http.delete("/customers/" + id);
};

const updateCustomers = (id, user) => {
  return http.put("/customers/" + id, user);
};

const CustomersService = {
  getAll,
  get,
  create,
  deleteCustomers,
  updateCustomers,
};

export default CustomersService;
