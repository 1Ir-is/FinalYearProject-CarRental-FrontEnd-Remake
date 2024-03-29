import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useAuth } from '../../Context/useAuth';
import { toast } from 'react-toastify'; 
import axios from 'axios';

import './ProfilePage.css';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    // Update formData state when user object changes
    setFormData({
      name: user.name,
      address: user.address,
      phone: user.phone
    });
  }, [user]); // Run this effect whenever user object changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        ...formData,
        userId: user.userId
      };
      const response = await axios.post(
        'https://localhost:7228/api/User/edit-info',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const editedUserData = {
        ...user,
        ...formData
      };
      setUser(editedUserData);

      console.log('Edit user response:', response.data);

       // Show toast notification for successful update
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
      <nav className="nav nav-borders">
        {/* Navigation links */}
      </nav>
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Avatar</div>
            <div className="card-body text-center">
              {/* Profile picture image */}
              <img className="img-account-profile rounded-circle mb-2" src={user?.avatar} alt="" />
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Personal Information</div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="fullName">Name</label>
                    <input className="form-control" id="fullName" name="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="userName">Role</label>
                    <p>{user?.role}</p>
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="mobile">Phone Number</label>
                    <input className="form-control" id="mobile" name="phone" type="text" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="fullAddress">Address</label>
                    <input className="form-control" id="fullAddress" name="address" type="text" placeholder="Enter your address" value={formData.address} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="email">Email</label>
                    <input className="form-control" id="email" type="email" name="email" placeholder="Enter your email" value={user.email} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="Facebook">Trust score</label>
                    <span>{user.trustPoint}</span>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
