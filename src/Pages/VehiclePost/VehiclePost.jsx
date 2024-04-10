import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import { useAuth } from '../../Context/useAuth'; // Update the path as per your file structure
import axios from 'axios';

const VehiclePost = () => {
  const [postVehicles, setPostVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?.userId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostVehicles = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Owner/get-post-vehicles-by-user/${userId}`);
        if (response.status === 200) {
          // Add loading state property to each item in the data array
          const dataWithLoading = response.data.map(item => ({ ...item, editLoading: false }));
          setPostVehicles(dataWithLoading);
          setLoading(false);
        } else if (response.status === 404) {
          setPostVehicles([]);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching post vehicles:', error);
        setLoading(false);
      }
    };

    if (userId) {
      setLoading(true);
      fetchPostVehicles();
    }
  }, [userId]);

  const handleEdit = async (record) => {
    try {
      // Find the index of the edited record in the postVehicles array
      const index = postVehicles.findIndex(item => item.id === record.id);
      if (index !== -1) {
        // Update the loading state for the edited record
        const updatedPostVehicles = [...postVehicles];
        updatedPostVehicles[index].editLoading = true;
        setPostVehicles(updatedPostVehicles);
      }

      // Simulate some asynchronous operation (API call, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

      // Navigate to the edit post page
      navigate(`/edit-post/${record.id}`);
    } catch (error) {
      console.error('Error editing post:', error);
    } finally {
      // Reset the loading state for the edited record
      const index = postVehicles.findIndex(item => item.id === record.id);
      if (index !== -1) {
        const updatedPostVehicles = [...postVehicles];
        updatedPostVehicles[index].editLoading = false;
        setPostVehicles(updatedPostVehicles);
      }
    }
  };

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
      title: 'Vehicle Fuel',
      dataIndex: 'vehicleFuel',
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
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            className={`w-full ${record.editLoading ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}`}
          >
            {record.editLoading ? <Spin /> : 'Edit'}
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
          <div className="text-center">
            <Spin spinning={loading} size="large">
              <div className="table-responsive">
                <Table columns={columns} dataSource={postVehicles} />
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePost;
