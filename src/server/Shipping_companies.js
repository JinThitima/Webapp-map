import http from "../http-common.js";

const getAll = () => {
  return http.get("/shipping_companies");
};

const get = (id) => {
  return http.get("/shipping_companies/" + id);
};

const create = (user) => {
  return http.post("/shipping_companies", user);
};

const deleteShipping_companies = (id) => {
  return http.delete("/shipping_companies/" + id);
};

const updateShipping_companies = (id, user) => {
  return http.put("/shipping_companies/" + id, user);
};

const Shipping_companiesService = {
  getAll,
  get,
  create,
  deleteShipping_companies,
  updateShipping_companies,
};

export default Shipping_companiesService;
