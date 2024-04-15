// Import necessary dependencies

import { Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RentalDetail = () => { // Change to a regular function
  const { rentalId } = useParams(); // Access rentalId from route parameters
  const [rentalDetails, setRentalDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Home/get-rental-details/${rentalId}`);
        if (response.status === 200) {
          setRentalDetails(response.data);
          setLoading(false);
        } else if (response.status === 404) {
          setRentalDetails(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching rental details:', error);
        setLoading(false);
      }
    };

    setLoading(true);
    fetchRentalDetails();
  }, [rentalId]);


  return (
    <div>
      {loading && <Spin />}
      {!loading && rentalDetails && (
        <div>
          {/* Display rental details here */}
          {/* For example, you can map over rentalDetails and display each rental user's information */}
          {rentalDetails.map(rental => (
            <div key={rental.id}>
              <p>Name: {rental.name}</p>
              <p>Email: {rental.email}</p>
              {/* Display other rental details */}
            </div>
          ))}
        </div>
      )}
      {!loading && !rentalDetails && <p>Rental details not found.</p>}
    </div>
  );
};

export default RentalDetail;
