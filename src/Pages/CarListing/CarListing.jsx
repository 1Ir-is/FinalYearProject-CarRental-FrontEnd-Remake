import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../Components/Helmet/Helmet";
import CommonSection from "../../UI/CommonSection/CommonSection";
import CarItem from "../../UI/CarItem/CarItem";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CarListing = () => {
  const [carList, setCarList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (location.state && location.state.searchResults) {
          // If search results are present in the location state, set carList to search results
          setCarList(location.state.searchResults);
        } else {
          // Otherwise, fetch all cars
          const response = await axios.get('https://localhost:7228/api/Home/get-all-post-vehicles');
          if (response.status === 200) {
            // Filter out cars based on their status (visibility)
            const visibleCars = response.data.filter(car => car.status === true);
            setCarList(visibleCars);
          }
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [location]);

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            {carList.length === 0 ? null : (
              <Col lg="12">
                <div className="d-flex align-items-center gap-3 mb-5">
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Sort By
                  </span>
                  <select className="box-border h-10 w-32 border-2">
                    <option>Select</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                </div>
              </Col>
            )}

            {carList.length === 0 ? (
                 <Col lg="12" className="text-center text-gray-500 mt-4 text-2xl">No cars available yet</Col>
            ) : (
              carList.map((item) => (
                <CarItem item={item} key={item.id} />
              ))
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
