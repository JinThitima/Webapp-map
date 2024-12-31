import http from "../http-common.js";

const getAll = () => {
  return http.get("/employees");
};

const get = (id) => {
  return http.get("/employees/" + id);
};

const create = (user) => {
  return http.post("/employees", user);
};

const deleteEmployees = (id) => {
  return http.delete("/employees/" + id);
};

const updateEmployees = (id, user) => {
  return http.put("/employees/" + id, user);
};

const getEmployees = async () => {
  try {
    const response = await fetch("http://localhost:5000"); // เปลี่ยน URL ให้เป็น API ที่จริง
    if (!response.ok) {
      throw new Error("ไม่สามารถดึงข้อมูลพนักงานได้");
    }
    return await response.json();
  } catch (error) {
    throw new Error("เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ");
  }
};

export { getEmployees };

const EmployeesService = {
  getAll,
  get,
  create,
  deleteEmployees,
  updateEmployees,
  getEmployees,
};

export default EmployeesService;
