import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, message, Spin, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import { useAuth } from '../../Context/useAuth'; // Update the path as per your file structure
import axios from 'axios';

const RenterList = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [renters, setRenters] = useState([]);

    useEffect(() => {
        fetchRenters();
    }, []);

    const fetchRenters = async () => {
        try {
            const response = await axios.get(`https://localhost:7228/api/Owner/get-all-renters/${user.userId}`);
            console.log(response.data);
            setRenters(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching renters:', error);
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Vehicle Name',
            dataIndex: 'vehicleName',
            key: 'vehicleName',
        },
        {
            title: 'Renter Name',
            dataIndex: 'renterName',
            key: 'renterName',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Received Date',
            dataIndex: 'receivedDate',
            key: 'receivedDate',
        },
        {
            title: 'Payment Date',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* Add your action buttons here */}
                </Space>
            ),
        },
    ];

    return (
        <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
            <CustomNavLinks />
            <hr className="mt-0 mb-4" />
            <Link to="/owner/vehicle-post" className="btn btn-info h3 mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Renter List</h6>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <Spin spinning={loading} size="large">
                            <div className="table-responsive">
                                <Table columns={columns} dataSource={renters} />
                            </div>
                        </Spin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenterList;
