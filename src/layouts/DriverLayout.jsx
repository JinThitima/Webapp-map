import React from 'react'
import DriverNavbar from "./DriverNavbar";
import DriverFooter from "./DriverFooter";

const DriverLayout = ({ children }) => {
  return (
    <>
      <DriverNavbar />
      {children}
      <DriverFooter />
    </>
  );
};

export default DriverLayout