import React, { useState, useEffect } from "react";
import { Table, Spin, message, Button } from "antd";
import axios from "axios";
import { useAuth } from "../../Context/useAuth";
import CustomNavLinks from "../../Components/CustomNavlink/CustomNavlink";

const FavoriteList = () => {
  const [followedVehicles, setFollowedVehicles] = useState([]);
  const { user } = useAuth();
  const userId = user?.userId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowedVehicles = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Home/get-all-follow-vehicles/${userId}`);
        setFollowedVehicles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching followed vehicles:', error);
        setLoading(false);
        message.error("Failed to fetch followed vehicles. Please try again.");
      }
    };
    fetchFollowedVehicles();
  }, [userId]);

  const handleFollow = async (postId) => {
    try {
      const response = await axios.post(`https://localhost:7228/api/Home/${followedVehicles.some(vehicle => vehicle.postId === postId) ? 'unfollow-vehicle' : 'follow-vehicle'}`, {
        postVehicleId: postId,
        userId: userId,
      });
      
      if (response.status === 200) {
        // Update the followed vehicles state immediately after the follow/unfollow action
        const updatedFollowedVehicles = await axios.get(`https://localhost:7228/api/Home/get-all-follow-vehicles/${userId}`);
        setFollowedVehicles(updatedFollowedVehicles.data);
      }
    } catch (error) {
      console.error('Error following/unfollowing vehicle:', error);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Car" style={{ width: '100px', height: '100px' }} />,
    },
    {
      title: "Vehicle Name",
      dataIndex: "vehicleName",
      key: "vehicleName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}.00`,
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button 
          type="primary" 
          danger 
          onClick={() => handleFollow(record.postId)}
        >
          {followedVehicles.some(vehicle => vehicle.postId === record.postId) ? 'Unfollow' : 'Follow'}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // Subscribe to status changes and update the status tag
    const updateStatusTag = () => {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`https://localhost:7228/api/Home/get-all-follow-vehicles/${userId}`);
          if (response.status === 200) {
            setFollowedVehicles(response.data);
          }
        } catch (error) {
          console.error('Error updating status tag:', error);
        }
      }, 2500); // Fetch updated data every 5 seconds
      return () => clearInterval(interval);
    };

    if (userId) {
      updateStatusTag();
    }
  }, [userId]);

  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
      <CustomNavLinks />
      <hr className="mt-0 mb-4"/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Favorite List</h6>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : (
            <Table 
              columns={columns} 
              dataSource={followedVehicles.map(vehicle => ({
                key: vehicle.postId,
                image: vehicle.postVehicle.image,
                vehicleName: vehicle.postVehicle.vehicleName,
                address: vehicle.postVehicle.address,
                price: vehicle.postVehicle.price,
                vehicleType: vehicle.postVehicle.vehicleType,
                postId: vehicle.postId
              }))} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
