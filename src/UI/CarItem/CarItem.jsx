import { useState, useEffect } from "react";
import { Col } from "reactstrap";
import { message as antMessage } from "antd";
import { Link } from "react-router-dom";
import { TeamOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from "../../Context/useAuth";

import "./CarItem.css";

const CarItem = ({ item }) => {
  const { id, image, vehicleYear, vehicleName, vehicleType, vehicleSeat, price } = item;
  const { user } = useAuth();
  const userId = user?.userId;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followedVehicles = JSON.parse(localStorage.getItem('followedVehicles')) || [];
    setIsFollowing(followedVehicles.some(entry => entry.userId === userId && entry.vehicleId === id));
  }, [id, userId]);

  const handleFollow = async () => {
    try {
      let followedVehicles = JSON.parse(localStorage.getItem('followedVehicles')) || [];
      const isCurrentlyFollowing = followedVehicles.some(entry => entry.userId === userId && entry.vehicleId === id);
      if (isCurrentlyFollowing) {
        // Unfollow the vehicle if already following
        await axios.post("https://localhost:7228/api/Home/unfollow-vehicle", {
          postVehicleId: id,
          userId: userId,
        });
        followedVehicles = followedVehicles.filter(entry => !(entry.userId === userId && entry.vehicleId === id));
        setIsFollowing(false);
        antMessage.success('Unfollow successful!');
      } else {
        // Follow the vehicle if not already following
        await axios.post("https://localhost:7228/api/Home/follow-vehicle", {
          postVehicleId: id,
          userId: userId,
        });
        followedVehicles.push({ userId: userId, vehicleId: id });
        setIsFollowing(true);
        antMessage.success('Follow successful!');
      }
      localStorage.setItem('followedVehicles', JSON.stringify(followedVehicles));
    } catch (error) {
      console.error('Error following/unfollowing vehicle:', error);
    }
  };

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={image} alt={vehicleName} className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{vehicleName}</h4>
          <h6 className="rent__price text-center mt-">
            ${price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className="d-flex align-items-center gap-2">
              <i className="ri-car-line" style={{ fontSize: '30px' }}></i> <span style={{ fontSize: '17px' }}>Model - {vehicleYear}</span>
            </span>
            <span className="d-flex align-items-center gap-2">
              <i className="ri-settings-2-line" style={{ fontSize: '30px' }}></i> <span style={{ fontSize: '17px' }}>{vehicleType}</span>
            </span>
            <span className="flex items-center gap-2 text-yellow-400">
              <TeamOutlined style={{ fontSize: '30px' }} /> <span style={{ fontSize: '17px' }}>{vehicleSeat}</span>
            </span>
          </div>



          <button className="w-50 car__item-btn car__btn-rent text-white" onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
          <button className="w-50 car__item-btn car__btn-details">
            <Link to={`/car-details/${id}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
