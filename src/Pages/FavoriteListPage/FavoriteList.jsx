import React from 'react';
import { Table, Button, Tag, Space, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import axios from 'axios'; // Import axios if needed

const FavoriteVehicleList = () => {
  // Sample data for demonstration, replace with actual data fetched from API
  const data = [
    {

      image: 'https://via.placeholder.com/100',
      vehicleName: 'Vehicle 1',
      address: 'Address 1',
      price: 1000,
      vehicleType: 'Car',
    },
    {

      image: 'https://via.placeholder.com/100',
      vehicleName: 'Vehicle 2',
      address: 'Address 2',
      price: 2000,
      vehicleType: 'Motorbike',
    },
  ];

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
          <div className="table-responsive">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteVehicleList;
