import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import carChangeImage from '../../assets/all-images/forgot-password.webp'; // Replace with your image path
import axios from 'axios';
import { message } from 'antd';

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email } = values;
    try {
      setLoading(true);
      const response = await axios.post(
        'https://localhost:7228/api/Auth/forgot-password',
        `"${email}"`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      setLoading(false);
      message.success('Password reset link sent successfully!');
      form.resetFields(); 
    } catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
      message.error('Failed to send password reset link. Please try again later.');
    }
  };
  

  return (
    <div
      className="flex items-center justify-center"
      style={{
        backgroundImage: `url(${carChangeImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '50vh',
      }}
    >
      <div className={`bg-white shadow-md rounded px-8 py-6 mb-4 w-full max-w-md ${loading ? 'opacity-50' : ''}`}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white opacity-75 z-50">
            <Spin tip="Sending reset link..." />
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
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
