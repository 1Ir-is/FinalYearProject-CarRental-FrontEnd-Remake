import React, { useState } from 'react';
import { Form, Input, Button, message, Spin, Modal } from 'antd';
import axios from 'axios';
import { useAuth } from '../../Context/useAuth';
import { useNavigate } from 'react-router-dom';
import carChangeImage from '../../assets/all-images/car_change.jpg';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const { user } = useAuth();
  const userId = user ? user.userId : null;
  const [form] = Form.useForm(); // Form instance

  const onFinish = () => {
    setIsModalVisible(true); // Show modal on form submission
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      setShowSuccessMessage(false); // Reset success message visibility
      setIsModalVisible(false); // Close modal
      const values = await form.validateFields(); // Get form values
      const data = { ...values, Id: userId };
      const response = await axios.post('https://localhost:7228/api/Auth/change-password', data);
      if (response.status === 200) {
        setTimeout(() => {
          message.success('Password changed successfully!');
          setShowSuccessMessage(true); // Show success message after spinner
          setLoading(false); // Reset loading after success message
          navigate(`/profile/${userId}`);
        }, 1000);
      } else {
        message.error('Failed to change password! Password you input may not match, Please try again!');
        setLoading(false); // Reset loading on failure
      }
    } catch (error) {
      console.error('Error changing password:', error);
      message.error('Failed to change password. Please try again.');
      setLoading(false); // Reset loading on error
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close modal without changing password
  };

  return (
    <div className="flex items-center justify-center" style={{ 
      backgroundImage: `url(${carChangeImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '50vh', // Ensure the container covers the full viewport height
    }}>
      <div className={`bg-white shadow-md rounded px-8 py-6 mb-4 w-full max-w-md ${loading ? 'opacity-50' : ''}`}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white opacity-75 z-50">
            <Spin tip="Changing password..." />
          </div>
        )}
        {showSuccessMessage && (
          <div className="text-center mb-4">
            <p className="text-green-500">Password changed successfully!</p>
          </div>
        )}
        <h2 className="text-2xl mb-4">Change Password</h2>
        <hr />
        <Form name="change-password" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            label="Old Password"
            name="OldPassword"
            rules={[{ required: true, message: 'Please enter your old password' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="NewPassword"
            rules={[{ required: true, message: 'Please enter your new password' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className={`w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}`}
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="Confirmation"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ // Style the OK button
            className: 'bg-sky-500 hover:bg-sky-700', // Add your button styles here
          }}
          cancelButtonProps={{ // Style the Cancel button
            className: 'bg-red-500 hover:bg-red-700', // Add your button styles here
          }}
        >
          <p>Are you sure you want to change this password?</p>
        </Modal>

      </div>
    </div>
  );
};

export default ChangePassword;
