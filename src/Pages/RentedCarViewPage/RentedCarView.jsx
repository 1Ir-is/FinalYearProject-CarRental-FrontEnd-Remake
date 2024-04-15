import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Spin } from 'antd';
import { Link } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import axios from 'axios'; // Import axios for making HTTP requests
import { useAuth } from '../../Context/useAuth';

const RentedCarView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?.userId;

  console.log(data);
  useEffect(() => {
    // Fetch rented vehicles data from the API
    const fetchRentedVehicles = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Home/get-all-rented-vehicles/${userId}`); // Include userId in the URL
        setData(response.data); // Set the fetched data to the state
        setLoading(false); // Update loading state
      } catch (error) {
        console.error('Error fetching rented vehicles:', error);
        setLoading(false); // Update loading state even if an error occurs
      }
    };

    if (userId) {
      fetchRentedVehicles(); // Call the fetchRentedVehicles function when component mounts and userId is available
    }
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(); // Format date portion
    const time = date.toLocaleTimeString(); // Get time portion
    return `${formattedDate}  ~  ${time}`;
  };

  const columns = [
    {
      title: 'Vehicle Name',
      dataIndex: 'vehicleName',
      key: 'vehicleName',
    },
    {
      title: 'Renter Name',
      dataIndex: 'userName', 
      key: 'userName', 
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Pick-up Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate) => formatDate(startDate), // Format pick-up date
    },
    {
      title: 'Return Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate) => formatDate(endDate), // Format return date
    },
    {
      title: 'Booking Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => formatDate(createdAt), // Format booking date
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetails(record)} className="text-blue-500 hover:text-blue-700 focus:outline-none">
          View Details
        </Button>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    Modal.info({
      title: `Rental Details`,
      content: (
        <div>
          <p>Vehicle Name: {record.vehicleName}</p>
          <p>Renter Name: {record.userName}</p>
          <p>Phone: {record.phone}</p>
          <p>Email: {record.email}</p>
          <p>Price: {record.price}</p>
          <p>Pick-up Date: {formatDate(record.startDate)}</p>
          <p>Return Date: {formatDate(record.endDate)}</p>
          <p>Booking Date: {formatDate(record.createdAt)}</p>

        </div>
      ),
      onOk() {},
      okButtonProps: { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" },
    });
  };

  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
      <CustomNavLinks />
      <hr className="mt-0 mb-4" />

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Rental List</h6>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentedCarView;
