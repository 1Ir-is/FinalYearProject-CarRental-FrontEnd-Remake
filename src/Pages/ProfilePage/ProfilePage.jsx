import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { useAuth } from '../../Context/useAuth';
import axios from 'axios';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import './ProfilePage.css';

const { Title } = Typography;

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      address: user.address,
      phone: user.phone
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        ...formData,
        userId: user.userId
      };
      const response = await axios.post(
        'https://localhost:7228/api/User/edit-info',
        requestData
      );

      const editedUserData = {
        ...user,
        ...formData
      };
      setUser(editedUserData);

      console.log('Edit user response:', response.data);

      message.success('Profile updated successfully');
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const getUserRole = (role) => {
    switch (role) {
      case 0:
        return 'Admin';
      case 1:
        return 'User';
      case 2:
        return 'Owner';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="container-xl px-4 mt-5 mb-5">
      <CustomNavLinks />
      <hr className="mt-0 mb-4" />
      <Row gutter={24}>
        <Col span={8}>
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Avatar</div>
            <div className="card-body text-center">
              <img className="img-account-profile rounded-circle mb-2" src={user?.avatar} alt="" />
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className="card mb-4">
            <div className="card-header">Personal Information</div>
            <div className="card-body">
              <Form layout="vertical" onFinish={handleSubmit}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Name">
                      <Input name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Role">
                      <p>{getUserRole(user.role)}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Phone Number">
                      <Input name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Address">
                      <Input name="address" placeholder="Enter your address" value={formData.address} onChange={handleInputChange} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Email">
                      <Input value={user.email} readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Trust score">
                      <span>{user.trustPoint}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-700">
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
