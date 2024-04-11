import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams(); // Get the postId parameter from the URL
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Home/get-post-vehicle/${id}`); // Replace '/api' with your API base URL
        setCarDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data);
        setLoading(false);
      }
    };

    fetchCarDetails();

    // Cleanup function
    return () => {
      // Cancel any ongoing requests or clean up if needed
    };
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!carDetails) {
    return <p>Car details not found.</p>;
  }

  // Render car details here using the fetched data
  return (
    <div>
      <h1>Car Details Page</h1>
      <p>Vehicle Name: {carDetails.vehicleName}</p>
      <p>Vehicle Year: {carDetails.vehicleYear}</p>
      <p>Vehicle Type: {carDetails.vehicleType}</p>
      {/* Display other car details */}
    </div>
  );
};

export default CarDetails;
