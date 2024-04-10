import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../../Context/useAuth'; // Import the useAuth hook

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Get the user object from the context
  const userId = user ? user.userId : null; // Extract the userId from the user object

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = { ...values, Id: userId }; // Include userId in the request payload
      const response = await axios.post('https://localhost:7228/api/Auth/change-password', data);
      if (response.status === 200) {
        message.success('Password changed successfully!');
      } else {
        message.error('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      message.error('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="change-password"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Old Password"
        name="OldPassword"
        rules={[
          {
            required: true,
            message: 'Please enter your old password',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="NewPassword"
        rules={[
          {
            required: true,
            message: 'Please enter your new password',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
