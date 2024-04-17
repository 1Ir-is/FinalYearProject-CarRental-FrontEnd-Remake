import React, { useState } from 'react';
import { Form, Input, Button, Spin, Modal } from 'antd';
import carChangeImage from '../../assets/all-images/forgot-password.webp';// Replace with your image path
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email } = values;
    setIsModalVisible(true); // Show confirmation modal
    try {
      setLoading(true); // Start loading spinner
      const response = await axios.post(
        'https://localhost:7228/api/Auth/forgot-password',
        `"${email}"`, // Wrap email in double quotes to ensure it's sent as a string
        {
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
            },
        }
    );
      setLoading(false); // Stop loading spinner
      setShowSuccessMessage(true); // Show success message
    } catch (error) {
      setLoading(false); // Stop loading spinner
      setShowSuccessMessage(false); // Hide success message
      console.error('An error occurred:', error);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex items-center justify-center" style={{ 
      backgroundImage: `url(${carChangeImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '50vh',
    }}>
      <div className={`bg-white shadow-md rounded px-8 py-6 mb-4 w-full max-w-md ${loading ? 'opacity-50' : ''}`}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white opacity-75 z-50">
            <Spin tip="Sending reset link..." />
          </div>
        )}
        {showSuccessMessage && (
          <div className="text-center mb-4">
            <p className="text-green-500">Password reset link sent successfully!</p>
          </div>
        )}
        <h2 className="text-2xl mb-4">Forgot Password</h2>
        <hr />
        <Form name="forgot-password" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className={`w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded'}`}
            >
              Send To Email
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="Confirmation"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ className: 'bg-sky-500 hover:bg-sky-700' }}
          cancelButtonProps={{ className: 'bg-red-500 hover:bg-red-700' }}
        >
          <p>Are you sure you want to send a reset link to this email?</p>
        </Modal>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
