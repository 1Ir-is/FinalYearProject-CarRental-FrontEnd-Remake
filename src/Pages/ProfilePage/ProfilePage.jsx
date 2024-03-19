import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import './ProfilePage.css';

const ProfilePage = ({ user }) => {
  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
      {/* Account page navigation */}
      <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="/thong-tin-tai-khoan/chi-tiet">Profile</a>
        <a className="nav-link" href="/xe-da-dat">Car have been rent</a>
        <a className="nav-link" href="/danh-sach-yeu-thich">Favorite list</a>
        {user?.approvalApplication?.isApprove && (
          <a className="nav-link" href="/bai-dang">Post</a>
        )}
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
              <form action="#" method="post" encType="multipart/form-data">
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="avatar">Avatar</label>
                  <input id="avatar" type="file" name="Image" />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="fullName">Name</label>
                    <input className="form-control" id="fullName" name="Name" type="text" placeholder="Enter your name" value={user?.name} required />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="userName">Role</label>
                    <p>{user?.role}</p>
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="mobile">Phone Number</label>
                    <input className="form-control" id="mobile" name="phone" type="text" placeholder="Enter your phone number" value={user?.phone} required />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="fullAddress">Address</label>
                    <input className="form-control" id="fullAddress" name="address" type="text" placeholder="Enter your address" value={user?.address} required />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="email">Email</label>
                    <input className="form-control" id="email" type="email" name="email" placeholder="Enter your email" value={user?.email} readOnly required />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="Facebook">Trust score</label>
                    <span>{user?.trustPoint}</span>
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
