import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Spin } from 'antd';
import { Link } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';

const RentedCarView = () => {
  // Sample data for demonstration, replace with actual data fetched from API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for demonstration purpose
    setTimeout(() => {
      setData([
        {
          id: 1,
          vehicleName: 'Vehicle 1',
          customerName: 'John Doe',
          phone: '123-456-7890',
          email: 'john@example.com',
          price: 100,
          pickUpDate: '2024-04-10',
          returnDate: '2024-04-15',
          bookingDate: '2024-04-05',
        },
        {
          id: 2,
          vehicleName: 'Vehicle 2',
          customerName: 'Jane Doe',
          phone: '987-654-3210',
          email: 'jane@example.com',
          price: 200,
          pickUpDate: '2024-04-12',
          returnDate: '2024-04-17',
          bookingDate: '2024-04-07',
        },
      ]);
      setLoading(false);
    }, 1500); // Simulated delay
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Vehicle Name',
      dataIndex: 'vehicleName',
      key: 'vehicleName',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
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
      dataIndex: 'pickUpDate',
      key: 'pickUpDate',
    },
    {
      title: 'Return Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
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
    // Show vehicle details modal or navigate to details page
    Modal.info({
      title: `${record.vehicleName} Details`,
      content: (
        <div>
          <p>Vehicle Name: {record.vehicleName}</p>
          <p>Customer Name: {record.customerName}</p>
          <p>Phone: {record.phone}</p>
          <p>Email: {record.email}</p>
          <p>Price: {record.price}</p>
          <p>Pick-up Date: {record.pickUpDate}</p>
          <p>Return Date: {record.returnDate}</p>
          <p>Booking Date: {record.bookingDate}</p>
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
