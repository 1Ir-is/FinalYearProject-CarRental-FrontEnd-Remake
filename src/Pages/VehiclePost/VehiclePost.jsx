import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import { useAuth } from '../../Context/useAuth'; // Update the path as per your file structure
import axios from 'axios';

const PostListPage = () => {
  const [postVehicles, setPostVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); 
  const userId = user?.userId; 

useEffect(() => {
    const fetchPostVehicles = async () => {
        try {
            const response = await axios.get(`https://localhost:7228/api/Owner/get-post-vehicles-by-user/${userId}`);
            setPostVehicles(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching post vehicles:', error);
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
      {/* Account page navigation */}
      <CustomNavLinks />
      <hr className="mt-0 mb-4" />

      <Link to="/create-post" className="btn btn-info h3 mb-2">Create New Post</Link>

      {/* Ant Design Table */}
      <div className="table-responsive">
        <Table columns={columns} dataSource={postVehicles} loading={loading} scroll={{ x: 768 }} />
      </div>
    </div>
  );
};

export default PostListPage;
