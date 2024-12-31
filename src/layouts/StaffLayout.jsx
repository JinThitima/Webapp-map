import React from 'react'
import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter';
import './StaffLayout.css';  // นำเข้าไฟล์ CSS ที่เราตั้งค่าไว้

const StaffLayout = ({  children }) => {
  return (
    <>
      <StaffNavbar />
      {children}
      <StaffFooter/>
    </>
  );
}

export default StaffLayout