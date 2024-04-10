import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, message, Spin } from 'antd';
import { Link } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import axios from 'axios'; // Import axios if needed

const FavoriteVehicleList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        // Replace this with actual API call using axios
        // const response = await axios.get('API_ENDPOINT');
        // setData(response.data);
        // setLoading(false);

        // Simulate API call for demonstration purpose
        setTimeout(() => {
          setData([
           
          ]);
          setLoading(false);
        }, 1500); // Simulated delay
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="Vehicle" style={{ width: '100px', height: '100px' }} />,
    },
    {
      title: 'Vehicle Name',
      dataIndex: 'vehicleName',
      key: 'vehicleName',
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
      render: (text) => `$${text}`,
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
      render: (text) => <Tag color={text === 'Car' ? 'blue' : 'green'}>{text}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      // You can perform delete operation here, for demonstration, let's show a success message
      // const response = await axios.delete(`API_ENDPOINT/${id}`);
      // console.log(response.data);
      message.success('Vehicle deleted successfully!');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
      <CustomNavLinks />
      <hr className="mt-0 mb-4" />

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
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteVehicleList;
