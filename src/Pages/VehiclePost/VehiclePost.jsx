import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import { useAuth } from '../../Context/useAuth'; // Update the path as per your file structure
import axios from 'axios';

const VehiclePost = () => {
  const [postVehicles, setPostVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); 
  const userId = user?.userId; 

  useEffect(() => {
    const fetchPostVehicles = async () => {
      try {
        // Simulated delay for demonstration
        setTimeout(async () => {
          const response = await axios.get(`https://localhost:7228/api/Owner/get-post-vehicles-by-user/${userId}`);
          setPostVehicles(response.data);
          setLoading(false);
        }, 1500); // Simulated delay
      } catch (error) {
        console.error('Error fetching post vehicles:', error);
        setLoading(false); // Make sure to set loading to false in case of an error
      }
    };

    if (userId) {
      fetchPostVehicles();
    }
  }, [userId]);


  const columns = [
    {
      title: 'No. of Renters',
      dataIndex: 'renters',
      key: 'renters',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="Post" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
    },
    {
      title: 'Vehicle Name', 
      dataIndex: 'vehicleName', 
      key: 'vehicleName',
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
    },
    {
      title: 'Vehicle Fuel', // Added Vehicle Fuel column
      dataIndex: 'vehicleFuel', // Assuming this is the correct field name in your data
      key: 'vehicleFuel',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" className="bg-blue-500 hover:bg-blue-700 ">
              <Link to={`/edit-post/${record.id}`} className="text-white no-underline">Edit</Link>
            </Button>
            {/* Other actions... */}
          </Space>
        ),
    },
  ];

  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
      <CustomNavLinks />
      <hr className="mt-0 mb-4" />

      <Link to="/create-post" className="btn btn-info h3 mb-2">Create New Post</Link>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Vehicle List</h6>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table columns={columns} dataSource={postVehicles} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehiclePost;
