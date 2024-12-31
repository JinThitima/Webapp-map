import http from "../http-common.js";

const getAll = () => {
  return http.get("/vehicles");
};

const get = (register_number) => {
  return http.get("/vehicles/" + register_number);
};

const create = (user) => {
  return http.post("/vehicles", user);
};

const deleteVehicles = (id) => {
  return http.delete("/vehicles/" + id);
};

const updateVehicles = (id, user) => {
  return http.put("/vehicles/" + id, user);
};

const VehiclesService = {
  getAll,
  get,
  create,
  deleteVehicles,
  updateVehicles,
};

export default VehiclesService;
