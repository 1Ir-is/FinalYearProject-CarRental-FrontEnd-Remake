// FollowedCarsPage.js

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from "../../Context/useAuth";

const FavoriteList = () => {
  const [followedVehicles, setFollowedVehicles] = useState([]);
  const { user } = useAuth();
  const userId = user?.userId;

  useEffect(() => {
    const fetchFollowedVehicles = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Home/get-all-follow-vehicles/${userId}`);
        setFollowedVehicles(response.data);
      } catch (error) {
        console.error('Error fetching followed vehicles:', error);
      }
    };
    fetchFollowedVehicles();
  }, [userId]);

  return (
    <div>
      <h1>Followed Vehicles</h1>
      <div>
      {followedVehicles.map(vehicle => (
        <div key={vehicle.id}>
          <img src={vehicle.postVehicle.image} alt={vehicle.postVehicle.vehicleName} /> {/* Access vehicleName from nested object */}
          <h2>{vehicle.postVehicle.vehicleName}</h2> {/* Access vehicleName from nested object */}
          <p>Address: {vehicle.postVehicle.address}</p>
          <p>Price: ${vehicle.postVehicle.price}</p>
          <p>Vehicle Type: {vehicle.postVehicle.vehicleType}</p> {/* Access vehicleType from nested object */}
          {/* Add more details as needed */}
        </div>
))}

      </div>
    </div>
  );
};

export default FavoriteList;
