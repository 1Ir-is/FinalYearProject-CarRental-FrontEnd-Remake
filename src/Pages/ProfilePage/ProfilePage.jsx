import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useAuth } from '../../Context/useAuth'; // Update the path to useAuth if necessary
import axios from 'axios'; // Import axios

import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth(); // Access the user data from the context
  console.log('User:', user);
  const [formData, setFormData] = useState({
    name: user.name,
    address: user.address,
    phone: user.phone
  });

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
        userId: user.userId // Include userId in the request data
      };
      console.log('Request data:', requestData);
      const response = await axios.post(
        'https://localhost:7228/api/User/edit-info',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Edit user response:', response.data);

      // Update local user state with the edited information
      const editedUserData = {
        ...user,
        ...formData
      };
      setUser(editedUserData);

      // Handle success
      toast.success("User information updated successfully!");
    } catch (error) {
      console.error('Error editing user:', error);
      // Handle error
    }
  };

  // Fetch the latest user data when the component mounts or when the user changes
  useEffect(() => {
    setFormData({
      name: user.name,
      address: user.address,
      phone: user.phone
    });
  }, [user]);

  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
      {/* Account page navigation */}
      <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="/thong-tin-tai-khoan/chi-tiet">Profile</a>
        <a className="nav-link" href="/xe-da-dat">Car have been rent</a>
        <a className="nav-link" href="/danh-sach-yeu-thich">Favorite list</a>
        {/* Render other navigation links */}
      </nav>
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          {/* Profile picture card */}
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Avatar</div>
            <div className="card-body text-center">
              {/* Profile picture image */}
              <img className="img-account-profile rounded-circle mb-2" src={user?.avatar} alt="" />
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          {/* Account details card */}
          <div className="card mb-4">
            <div className="card-header">Personal Information</div>
            <div className="card-body">
              {/* Render form with user data */}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="fullName">Name</label>
                    <input className="form-control" id="fullName" name="name" type="text" placeholder="Enter your name" value={user.name} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="userName">Role</label>
                    <p>{user?.role}</p>
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="mobile">Phone Number</label>
                  <input className="form-control" id="mobile" name="phone" type="text" placeholder="Enter your phone number" value={user.phone} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="fullAddress">Address</label>
                  <input className="form-control" id="fullAddress" name="address" type="text" placeholder="Enter your address" value={user.address} onChange={handleInputChange} />
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
