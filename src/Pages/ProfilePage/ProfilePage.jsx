import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Typography, message, Modal, Progress, Spin } from 'antd';
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
    trustPoint: null,
    avatar: null,
  });
  const [uploading, setUploading] = useState(false); // State variable to track image upload status
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
          trustPoint: userData.trustPoint,
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
    Modal.confirm({
      title: 'Confirm Update',
      content: 'Are you sure you want to update your profile?',
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: {
        className: 'bg-blue-500 hover:bg-blue-700' // Add your button styles here
      },
      onOk: async () => {
        try {
          const requestData = {
            ...formData,
            userId: currentUser.userId
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
      }
    });
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
      // Set uploading state to true when starting the upload
      setUploading(true);
      const imageUrl = await uploadImageToCloudinary(file);
      setFormData({
        ...formData,
        avatar: imageUrl,
      });
      // Set uploading state to false after the upload is complete
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Set uploading state to false in case of error
      setUploading(false);
    }
  };
  
  return (
    <div className="container-xl px-4 mt-5 mb-5">
      <CustomNavLinks />
      <hr className="mt-0 mb-4" />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Avatar</div>
            <div className="card-body text-center">
              <img className="img-account-profile rounded-circle mb-2" src={formData.avatar} alt="" />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={16} lg={16} xl={16}>
          <div className="card mb-4">
            <div className="card-header">Personal Information</div>
            <div className="card-body">
              <Form layout="vertical" onFinish={handleSubmit}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Name">
                      <Input name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <Form.Item label="Role">
                        <div style={{ border: '1px solid #d9d9d9', padding: '4px 4px', borderRadius: '4px', width: 'fit-content' }}>
                          <p>{getUserRole(currentUser.role)}</p>
                        </div>
                      </Form.Item>
                  </Col>

                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Phone Number">
                      <Input name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Address">
                      <Input name="address" placeholder="Enter your address" value={formData.address} onChange={handleInputChange} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Email">
                      <Input value={currentUser.email} readOnly />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Trust score">
                      <div style={{ border: '1px solid #d9d9d9', padding: '8px', borderRadius: '4px', width: 'fit-content' }}>
                        <span>{formData.trustPoint !== null ? formData.trustPoint.toFixed(1) : 'N/A'}</span>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label="Avatar">
                      <Spin spinning={uploading}>
                        <Input type="file" onChange={handleImageUpload} />
                      </Spin>
                      {uploading && <Progress percent={100} />}
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
