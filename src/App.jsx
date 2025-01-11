import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

{/* ระบบหลังบ้าน */ }
import Login from "./pages/Login";
import StaffHome from "./pages/Staff/StaffHome";
import Car from "./pages/Staff/Car";
import PrivateTransport from "./pages/Staff/PrivateTransport";
import StaffDriver from "./pages/Staff/StaffDriver";
import StaffUser from "./pages/Staff/StaffUser";
import Customer from "./pages/Staff/Customer";
import DeliveryJobOrder from "./pages/Staff/DeliveryJobOrder";
import GroupTransport from "./pages/Staff/GroupTransport";
import DeliveryReport from "./pages/Staff/DeliveryReport";
import DistanceReport from "./pages/Staff/DistanceReport";
import FuelReport from "./pages/Staff/FuelReport";
import AddJobOrder from "./pages/Staff/AddJobOrder";
import EditJobOrder from "./pages/Staff/EditJobOrder";
import EditCustomer from "./pages/Staff/EditCustomer";
import Detail_car from "./pages/Staff/Detail_car";
import DetailPrivateTransport from "./pages/Staff/DetailPrivateTransport";
import DetailDriver from "./pages/Staff/DetailDriver";
import DetailUser from "./pages/Staff/DetailUser";
import DetailCustomer from "./pages/Staff/DetailCustomer";
import DetailJobOrder from "./pages/Staff/DetailJobOrder";
import Confirm_Delivery from "./pages/Staff/Confirm_Delivery";
import DetailGroupTransport from "./pages/Staff/DetailGroupTransport";
import AddCustomer from "./pages/Staff/AddCustomer";
import Sortshops from "./pages/Staff/Sortshops";

// ระบบหน้าบ้าน
import DriverHome from "./pages/driver/DriverHome";
import AcceptingWork from "./pages/driver/AcceptingWork";
import Detail_Work from "./pages/driver/Detail_Work";
import Profile from "./pages/driver/Profile";
import Deletecus_JobOrder from './pages/Staff/Deletecus_JobOrder';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Other Route */}
        <Route path="/" exact={true} element={<Login />} />
        Upstatus
        {/* ระบบหลังบ้าน */}
        <Route path="/StaffHome" exact={true} element={<StaffHome />} />
        <Route path="/Car" element={<Car />} />
        <Route path="/PrivateTransport" element={<PrivateTransport />} />
        <Route path="/StaffDriver" element={<StaffDriver />} />
        <Route path="/StaffUser" element={<StaffUser />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/DeliveryJobOrder" element={<DeliveryJobOrder />} />
        <Route path="/GroupTransport" element={<GroupTransport />} />
        <Route path="/DeliveryReport" element={<DeliveryReport />} />
        <Route path="/DistanceReport" element={<DistanceReport />} />
        <Route path="/FuelReport" element={<FuelReport />} />
        <Route path="/AddJobOrder" element={<AddJobOrder />} />
        <Route path="/EditJobOrder/:id" element={<EditJobOrder />} />
        <Route path="/EditCustomer/:id" element={<EditCustomer />} />
        <Route path="/vehicles/:id" element={<Detail_car />} />
        <Route
          path="/Shipping_companies/:id"
          element={<DetailPrivateTransport />}
        />
        <Route path="/DetailDriver" element={<DetailDriver />} />
        <Route path="/employees/:id" element={<DetailUser />} />
        <Route path="/customers/:id" element={<DetailCustomer />} />
        <Route path="/DetailJobOrder/:id" element={<DetailJobOrder />} />
        <Route path="/Confirm_Delivery" element={<Confirm_Delivery />} />
        <Route
          path="/DetailGroupTransport/:id"
          element={<DetailGroupTransport />}
        />
        <Route path="/AddCustomer/:id" element={<AddCustomer />} />
        <Route path="/Sortshops/:id" element={<Sortshops />} />
        <Route path="/Deletecus_JobOrder/:id" element={<Deletecus_JobOrder />} />
        
        {/* ระบบหน้าบ้าน */}
        <Route path="/DriverHome" element={<DriverHome />} />
        <Route path="/AcceptingWork/:id" element={<AcceptingWork />} />
        <Route path="/Detail_Work/:id" element={<Detail_Work />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App