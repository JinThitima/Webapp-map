import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShipworksService from "../../server/Ship_work";

const Deletecus_JobOrder = () => {
  const [shipwork, setShipwork] = useState({});
  let navigate = useNavigate();
  let params = useParams();
  let id = params.id;

  const confirmDelete = () => {
    const isConfirmed = window.confirm("ยืนยันการลบข้อมูลหรือไม่?");
    if (isConfirmed) {
      // call delete service
      ShipworksService.deleteCustomer(shipwork._id, id)
        .then((res) => navigate("/DeliveryJobOrder"))
        .catch((e) => console.log(e));
    } else {
      // กลับไปหน้า Product
    //   navigate("/DeliveryJobOrder");
    }
  };

  useEffect(() => {
    confirmDelete();
  }, []);

  return <div></div>;
};

export default Deletecus_JobOrder;
