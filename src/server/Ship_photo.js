import http from "../http-common.js";

const baseUrl = "/ship_photos"
const getAll = () => {
  return http.get(`${baseUrl}`);
};

const get = (id) => {
  return http.get(`${baseUrl}/${id}`);
};

const create = (user) => {
  return http.post(`${baseUrl}`, user);
};

const deleteShip_photos = (id) => {
  return http.delete(`${baseUrl}/${id}`);
};

const updateShip_photos = (id, user) => {
  return http.put(`${baseUrl}/${id}`, user);
};

const addPhoto = (id, customer) => {
  return http.patch(`${baseUrl}/${id}`, customer);
};

const deletePhoto = (id, photoId) => {
  return http.delete(`${baseUrl}/${id}/photo/${photoId}`);
};


const Ship_photosService = {
  getAll,
  get,
  create,
  deleteShip_photos,
  updateShip_photos,
  addPhoto,
  deletePhoto,
};

export default Ship_photosService;
