import http from "../http-common.js";

const getAll = async() => {
  const token = localStorage.getItem('token')
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return await http.get("/employees");
};

const userInfo = () => {
  const token = localStorage.getItem("token");
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return http.get("/employees/info");
};

const get = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  return http.get("/employees/" + id);
};

const create = (user) => {
    const token = localStorage.getItem("token");
    if (token) {
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  return http.post("/employees", user);
};

const deleteEmployees = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  return http.delete("/employees/" + id);
};

const updateEmployees = (id, user) => {
    const token = localStorage.getItem("token");
    if (token) {
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
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
  
const login = async (loginData) => {
    return await http.post("/employees/login", loginData);g
};


const EmployeesService = {
  userInfo,
  getAll,
  get,
  create,
  deleteEmployees,
  updateEmployees,
  getEmployees,
  login,
};

export default EmployeesService;
