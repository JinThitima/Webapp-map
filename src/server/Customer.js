import http from "../http-common.js";

const getAll = () => {
  const token = localStorage.getItem('token')
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }  
  return http.get("/customers");
};

const get = (id) => {
  const token = localStorage.getItem('token')
  console.log(token)
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return http.get("/customers/" + id);
};

const create = (user) => {
  const token = localStorage.getItem('token')
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return http.post("/customers", user);
};

const deleteCustomers = (id) => {
  const token = localStorage.getItem('token')
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return http.delete("/customers/" + id);
};

const updateCustomers = (id, user) => {
  const token = localStorage.getItem('token')
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
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
