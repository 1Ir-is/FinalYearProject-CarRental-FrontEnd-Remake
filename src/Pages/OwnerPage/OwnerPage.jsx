import React, { useState } from 'react';
import carImage from '../../assets/all-images/pexels-may-dayua-1545743.jpg';

const OwnerPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        title: '',
        description: '',
        identity: '',
        type: '0'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image">
                                    <img src={carImage} alt="Car" style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                            <form className="user" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label>Car Owner Name</label>
                                                    <input
                                                        style={{ width: '100%' }}
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="form-control form-control-user"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label>Phone Number</label>
                                                    <input
                                                        style={{ width: '100%' }}
                                                        type="text"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="form-control form-control-user"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label>Email</label>
                                                    <input
                                                        style={{ width: '100%' }}
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="form-control form-control-user"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label>Address</label>
                                                    <input
                                                        style={{ width: '100%' }}
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                        className="form-control form-control-user"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label>Description</label>
                                                    <input
                                                        style={{ width: '100%' }}
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                        className="form-control form-control-user"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label>Tax Code</label>
                                                    <input
                                                        style={{ width: '100%' }}
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                        className="form-control form-control-user"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label>Type</label>
                                                    <select
                                                        style={{ width: '100%' }}
                                                        name="type"
                                                        value={formData.type}
                                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                        className="form-control form-control-user"
                                                        required
                                                    >
                                                        <option value="0">Individual</option>
                                                        <option value="1">Company</option>
                                                    </select>
                                                </div>

                                                <button type="submit" className="btn btn-primary btn-user btn-block mt-3">
                                                    Register
                                                </button>
                                            </form>
                                        
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerPage;
