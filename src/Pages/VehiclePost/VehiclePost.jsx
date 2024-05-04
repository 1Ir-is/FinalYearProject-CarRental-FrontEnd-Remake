import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, message, Spin, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import { useAuth } from '../../Context/useAuth'; // Update the path as per your file structure
import axios from 'axios';

const VehiclePost = () => {
  const [postVehicles, setPostVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
      navigate(`/owner/edit-post/${record.id}`);
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

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`https://localhost:7228/api/Owner/delete-post/${record.id}`);
      if (response.status === 200) {
        message.success(response.data);
        // Remove the deleted post vehicle from the list
        setPostVehicles(prevState => prevState.filter(item => item.id !== record.id));
      } else {
        message.error('Failed to delete post vehicle');
      }
    } catch (error) {
      console.error('Error deleting post vehicle:', error);
      message.error('Failed to delete post vehicle');
    }
  };

  const handleDeleteConfirm = async (record) => {
    try {
      setDeleteLoading(true);
      // Simulate some asynchronous operation (API call, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

      // Call the actual delete handler
      await handleDelete(record);
    } finally {
      // Reset the loading state after a timeout
      setTimeout(() => {
        setDeleteLoading(false);
      }, 2000); // Set the timeout duration (in milliseconds)
    }
  };


  const handleMarkAvailable = async (record) => {
    try {
      const response = await axios.post(`https://localhost:7228/api/Owner/mark-vehicle-available/${record.id}`);
      if (response.status === 200) {
        message.success(response.data);
        // Update the status of the post vehicle locally
        setPostVehicles(prevState => prevState.map(item => (item.id === record.id ? { ...item, status: false } : item)));
      } else {
        message.error('Failed to mark vehicle available');
      }
    } catch (error) {
      console.error('Error marking vehicle available:', error);
      message.error('Failed to mark vehicle available');
    }
  };


  const handleViewList = (record) => {
    // Navigate to the RentalDetail component with the postId as a URL parameter
    navigate(`/owner/rental-detail/${record.id}`);
  };
  

  const columns = [
    {
      title: 'No. of Renters',
      dataIndex: 'userRentCars',
      key: 'renters',
      render: (userRentCars) => (
        <span>{userRentCars.length}</span>
      ),
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
      title: 'Price/Day',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}` 
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <span>{rating.toFixed(1)}</span>
      ),
    },
    
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Tag color={status ? 'red' : 'green'}>{status ? 'Active' : 'Hidden'}</Tag>
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
            className={`w-full ${record.editLoading ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded'}`}
          >
            {record.editLoading ? <Spin /> : 'Edit'}
          </Button>
          <Popconfirm
            title="Are you sure to delete this post?"
            onConfirm={() => handleDeleteConfirm(record)}
            okText="Yes"
            okButtonProps={{ loading: deleteLoading, className: 'bg-sky-500 hover:bg-sky-700 font-bold px-4 rounded' }}
            cancelText="No"
            cancelButtonProps={{ className: 'bg-red-400 hover:bg-red-700 font-bold px-4 rounded' }}
          >
            <Button 
              type="danger"
              className={`w-full ${record.editLoading ? 'opacity-50 cursor-not-allowed' : 'bg-red-500 text-white font-bold px-4 rounded'}`}
              disabled={deleteLoading}
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() => handleViewList(record)}
            className={`w-full bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded`}
          >
            View List
          </Button>
        {record.status && record.isRented && (
  <button
    type="button"
    onClick={() => handleMarkAvailable(record)}
    className="bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold py-2 px-4 rounded"
  >
    Mark Available
  </button>
)}


        </Space>
      ),
    },
  ];

  useEffect(() => {
    // Subscribe to status changes and update the status tag
    const updateStatusTag = () => {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`https://localhost:7228/api/Owner/get-post-vehicles-by-user/${userId}`);
          if (response.status === 200) {
            setPostVehicles(response.data);
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
      <hr className="mt-0 mb-4" />
      <Link to="/owner/create-post" className="btn btn-info h3 mb-2">Create New Post</Link>
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
