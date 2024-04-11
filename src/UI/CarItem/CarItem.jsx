import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { TeamOutlined } from '@ant-design/icons';

import "./CarItem.css";

const CarItem = ({ item }) => {
  // Destructure item object to get car details
  const {id, image, vehicleYear, vehicleName, vehicleType, vehicleSeat, price, status } = item;

  console.log(item.id);

  // Check if status is true (visible)
  if (!status) {
    // If status is false (hidden), return null to prevent rendering the CarItem
    return null;
  }

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
            <span className="d-flex align-items-center gap-2">
              <TeamOutlined style={{ fontSize: '30px' }} /> <span style={{ fontSize: '17px' }}>{vehicleSeat}</span>
            </span>
          </div>

          <button className="w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${vehicleName}`}>Rent</Link>
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
