import { useState } from 'react';
import { Spin, Modal, message } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'; 
import { useParams } from 'react-router-dom';

import carChangeImage from '../../assets/all-images/muscle-car-retro-vintage-car-sunset-neon-5k-2560x1440-1229.jpg'; 

import axios from 'axios';

const ResetPasswordPage = () => {
  const { email, resetKey } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleResetPassword = async () => {
    if (!email || !resetKey || !newPassword || !confirmPassword) {
      message.error('Invalid reset link');
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true); 
      const response = await axios.post('https://localhost:7228/api/Auth/reset-password', {
        email,
        resetKey,
        newPassword
      });
      
      setLoading(false); 

      if (response.status === 200) {
        setShowSuccessMessage(true);
      } else {
        setError(response.data.message || 'An error occurred');
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('An error occurred while processing your request');
      }
      console.error('Error:', error);
    }
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    // No need to set loading here as it's handled in handleResetPassword
    try {
      const response = await axios.post('https://localhost:7228/api/Auth/reset-password', {
        email,
        resetKey,
        newPassword
      });
      if (response.status === 200) {
        setShowSuccessMessage(true);
      } else {
        setError(response.data.message || 'An error occurred');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('An error occurred while processing your request');
      }
      console.error('Error:', error);
    }
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
            <Spin tip="Resetting password..." />
          </div>
        )}
        {showSuccessMessage && (
          <div className="text-center mb-4">
            <p className="text-green-500">Password reset successfully!</p>
          </div>
        )}
        <h2 className="text-2xl mb-4">Reset Password</h2>
        <hr />
        <div>
          <label className="block mb-2">New Password:</label>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span
              className="absolute right-0 top-0 mt-2 mr-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
        </div>
        <div>
          <label className="block mb-2">Confirm Password:</label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span
              className="absolute right-0 top-0 mt-2 mr-4 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="text-center">
          <button
            onClick={() => setIsModalVisible(true)}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3`}
          >
            Reset Password
          </button>
        </div>
        <Modal
          title="Confirmation"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ className: 'bg-sky-500 hover:bg-sky-700' }}
          cancelButtonProps={{ className: 'bg-red-500 hover:bg-red-700' }}
        >
          <p>Are you sure you want to reset the password?</p>
        </Modal>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
