import React, { useState } from "react";
import { Button, Table, Container } from "react-bootstrap";

// ฟังก์ชันคำนวณระยะทาง Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // รัศมีโลก (กิโลเมตร)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// ฟังก์ชันคำนวณเวลา (จากระยะทาง / ความเร็ว)
function calculateTime(distance, speed = 60) {
  const timeInHours = distance / speed; // เวลาเป็นชั่วโมง
  const timeInMinutes = timeInHours * 60; // เวลาเป็นนาที
  return timeInMinutes;
}

const ShopSorter = () => {
  // ข้อมูลร้านค้าพร้อมพิกัด (ละติจูด, ลองจิจูด)
  const shops = [
    {
      id: 1,
      name: "บจก. เกียรติทวีค้าไม้ ศูนย์รวมวัสดุก่อสร้างรามอินทรา",
      lat: 13.853355837890275,
      lon: 100.63472478220304,
    },
    {
      id: 2,
      name: "บ.เกียรติไพบูลย์ 48 จํากัด",
      lat: 13.88236092098081,
      lon: 100.61694225378544,
    },
    {
      id: 3,
      name: "บริษัท พารวยเคหะภัณฑ์ จำกัด",
      lat: 13.939262760810735,
      lon: 100.72597767896207,
    },
  ];

  const companyLocation = { lat: 13.797976482846144, lon: 100.06736450020425 }; // พิกัดบริษัท
  const [sortedShops, setSortedShops] = useState([]);

  // ฟังก์ชันเรียงร้านค้าแบบต่อเนื่อง (ใกล้ร้านก่อนหน้า)
  const sortShopsSequentially = () => {
    let remainingShops = [...shops];
    const sorted = [];
    let currentLocation = companyLocation;

    let totalDistance = 0; // ระยะทางรวม
    while (remainingShops.length > 0) {
      const closestShop = remainingShops.reduce((prev, curr) => {
        const prevDistance = calculateDistance(
          currentLocation.lat,
          currentLocation.lon,
          prev.lat,
          prev.lon
        );
        const currDistance = calculateDistance(
          currentLocation.lat,
          currentLocation.lon,
          curr.lat,
          curr.lon
        );
        return currDistance < prevDistance ? curr : prev;
      });

      const distanceToShop = calculateDistance(
        currentLocation.lat,
        currentLocation.lon,
        closestShop.lat,
        closestShop.lon
      );
      const timeToShop = calculateTime(distanceToShop);

      sorted.push({
        ...closestShop,
        distance: distanceToShop,
        time: timeToShop,
      });
      totalDistance += distanceToShop;
      currentLocation = { lat: closestShop.lat, lon: closestShop.lon };
      remainingShops = remainingShops.filter(
        (shop) => shop.id !== closestShop.id
      );
    }

    setSortedShops([...sorted, { name: "รวม", distance: totalDistance }]);
  };

  return (
    <Container>
      <h2>ตารางเรียงลำดับร้านค้า</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ชื่อร้านค้า</th>
            <th>ระยะทาง (กม.)</th>
            <th>เวลาเดินทาง (นาที)</th>
          </tr>
        </thead>
        <tbody>
          {sortedShops.map((shop, index) => (
            <tr key={shop.id || "total"}>
              <td>{index + 1}</td>
              <td>{shop.name}</td>
              <td>{shop.distance ? shop.distance.toFixed(2) : "-"}</td>
              <td>{shop.time ? shop.time.toFixed(2) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={sortShopsSequentially}>
        เรียงร้านค้าใหม่ตามระยะทาง
      </Button>
    </Container>
  );
};

export default ShopSorter;
