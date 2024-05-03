import { useState, useEffect } from "react";
import { Col } from "reactstrap";
import { message as antMessage } from "antd";
import { Link } from "react-router-dom";
import { TeamOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from "../../Context/useAuth";

import "./CarItem.css";

const CarItem = ({ item }) => {
  const { id, image, vehicleYear, vehicleName, vehicleType, vehicleSeat, price, isRented, userId } = item;
  const { user } = useAuth();
  const loggedInUserId = user?.userId;
  const [isFollowing, setIsFollowing] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState(null);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/User/${userId}`);
        setOwnerInfo(response.data);
      } catch (error) {
        console.error('Error fetching owner information:', error);
      }
    };

    if (userId) {
      fetchOwnerInfo();
    }
  }, [userId]);

  useEffect(() => {
    const followedVehicles = JSON.parse(localStorage.getItem('followedVehicles')) || [];
    setIsFollowing(followedVehicles.some(entry => entry.userId === loggedInUserId && entry.vehicleId === id));
  }, [id, loggedInUserId]);

  const handleFollow = async () => {
    try {
      let followedVehicles = JSON.parse(localStorage.getItem('followedVehicles')) || [];
      const isCurrentlyFollowing = followedVehicles.some(entry => entry.userId === loggedInUserId && entry.vehicleId === id);
      if (isCurrentlyFollowing) {
        // Unfollow the vehicle if already following
        await axios.post("https://localhost:7228/api/Home/unfollow-vehicle", {
          postVehicleId: id,
          userId: loggedInUserId,
        });
        followedVehicles = followedVehicles.filter(entry => !(entry.userId === loggedInUserId && entry.vehicleId === id));
        setIsFollowing(false);
        antMessage.success('Unfollow successful!');
      } else {
        // Follow the vehicle if not already following
        await axios.post("https://localhost:7228/api/Home/follow-vehicle", {
          postVehicleId: id,
          userId: loggedInUserId,
        });
        followedVehicles.push({ userId: loggedInUserId, vehicleId: id });
        setIsFollowing(true);
        antMessage.success('Follow successful!');
      }
      localStorage.setItem('followedVehicles', JSON.stringify(followedVehicles));
    } catch (error) {
      console.error('Error following/unfollowing vehicle:', error);
    }
  };

  return (
    <Col lg="4" md="4" sm="6" className="">
      <div className="car__item relative">
        <div className={`car__img ${isRented ? 'filter blur-sm' : ''}`}>
          <img src={image} alt={vehicleName} className="w-100" />
        </div>

        {isRented && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rented-label bg-red-500 text-white font-bold py-1 px-2 rounded">
              Is Rented
            </div>
          </div>
        )}

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
          <div className="section__description text-lg mt-3 flex items-center mb-3">
            {ownerInfo && (
              <>
                <img src={ownerInfo.avatar} alt={ownerInfo.name} className="w-10 h-10 rounded-full mr-2" />
                <span>{ownerInfo.name}</span>
              </>
            )}
          </div>


          <button
            className="w-50 car__item-btn car__btn-rent text-white"
            onClick={handleFollow}
          >
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
