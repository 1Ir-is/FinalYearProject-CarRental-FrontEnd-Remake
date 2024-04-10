import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { useAuth } from '../../Context/useAuth';
import axios from 'axios';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';
import './ProfilePage.css';
import { uploadImageToCloudinary } from '../../Components/Cloudinary/CloudinaryConfiguration';

const { Title } = Typography;

const ProfilePage = () => {
  const { user: currentUser, setUser: setCurrentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    avatar: null,
  });
  console.log(currentUser);

  useEffect(() => {
    // Fetch user data from the server when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/User/${currentUser.userId}`);
        const userData = response.data;
        setFormData({
          name: userData.name,
          address: userData.address,
          phone: userData.phone,
          avatar: userData.avatar,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currentUser]);

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
        userId: currentUser.userId  // Change currentUser.id to currentUser.userId
      };
      const response = await axios.post(
        'https://localhost:7228/api/User/edit-info',
        requestData
      );
  
      const editedUserData = {
        ...currentUser,
        ...formData
      };
      setCurrentUser(editedUserData);
  
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const imageUrl = await uploadImageToCloudinary(file); // Upload image to Cloudinary
      setFormData({
        ...formData,
        avatar: imageUrl, // Set the image URL in formData
      });
    } catch (error) {
      console.error('Error uploading image:', error);
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
              <img className="img-account-profile rounded-circle mb-2" src={formData.avatar} alt="" />
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
                      <p>{getUserRole(currentUser.role)}</p>
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
                      <Input value={currentUser.email} readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Trust score">
                      <span>{currentUser.trustPoint}</span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Avatar">
                      <Input type="file" onChange={handleImageUpload} />
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
