import http from "../http-common.js";

const getAll = () => {
  return http.get("/route_templates");
};

const get = (id) => {
  return http.get("/route_templates/" + id);
};

const create = (user) => {
  return http.post("/route_templates", user);
};

const deleteRoute_templates = (id) => {
  return http.delete("/route_templates/" + id);
};

const updateRoute_templates = (id, user) => {
  return http.put("/route_templates/" + id, user);
};

const Route_templatesService = {
  getAll,
  get,
  create,
  deleteRoute_templates,
  updateRoute_templates,
};

export default Route_templatesService;
