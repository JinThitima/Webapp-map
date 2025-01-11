import http from "../http-common.js";

const getAll = () => {
  return http.get("/ship_works");
};

const get = (id) => {
  return http.get("/ship_works/" + id);
};

const getByDriverId = (driver_id) => {
  return http.get("/ship_works/" + driver_id);
};

const create = (user) => {
  return http.post("/ship_works", user);
};

const getShipWorkById = (id) => {
  return http.get(`/ship_works/${id}`);
};

const updateStatus = async (id, formData) => {
  return await http.put(`/ship_works/status/${id}`,formData);
}

const addCustomer = (id, customer) => {
  return http.patch(`/ship_works/${id}`, customer);
}

const updateStartMileage = async (id, formData) => {
  return await http.put(`/ship_works/start_mileage/${id}`, formData); // เพิ่มคอมม่า
};

const updateFinishMileage = async (id, formData) => {
  return await http.put(`/ship_works/finish_mileage/${id}`, formData); // เพิ่มคอมม่า
};

const deleteShipworks = (id) => {
  return http.delete("/ship_works/" + id);
};

const updateShipworks = (id, formData) => {
  return http.put("/ship_works/" + id, formData)
    ;
};

const deleteCustomer = (id, customerId) => {
  return http.delete(`/ship_works/${id}/customer/${customerId}`);
};

const Ship_worksService = {
  getAll,
  get,
  create,
  deleteShipworks,
  updateShipworks,
  getShipWorkById,
  updateStatus,
  getByDriverId,
  updateStartMileage,
  addCustomer,
  deleteCustomer,
  updateFinishMileage,
};

export default Ship_worksService;
