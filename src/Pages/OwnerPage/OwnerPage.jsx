import React, { useState, useEffect } from 'react';
import axios from 'axios';
import carImage from '../../assets/all-images/pexels-may-dayua-1545743.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth'; // Import the useAuth hook
import Swal from 'sweetalert2';

const OwnerPage = () => {
    const { user } = useAuth();
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
    const [isApproving, setIsApproving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIsApproving = async () => {
            try {
                const userId = user ? user.userId : null;
                const response = await axios.get(`https://localhost:7228/api/User/is-approving/${userId}`);
                setIsApproving(response.data.isApproving);
                sessionStorage.setItem('isApproving', response.data.isApproving);
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        };

        const isApprovingStored = sessionStorage.getItem('isApproving');
        if (isApprovingStored !== null) {
            setIsApproving(isApprovingStored === 'true');
        } else {
            fetchIsApproving();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                title: 'You need to login before register to be our partner!',
                icon: 'warning',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }
        try {
            const userId = user ? user.userId : null;
            const response = await axios.post(`https://localhost:7228/api/User/create-approval-application/${userId}`, formData);
            setIsApproving(true);
            sessionStorage.setItem('isApproving', true);
            alert('Approval application created successfully');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data.errors) {
                const validationErrors = error.response.data.errors;
                console.log('Validation Errors:', validationErrors);
            }
        }
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
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">
                                                {isApproving ? "Pending Approval!" : "Register to be our partner!"}
                                            </h1>
                                        </div>
                                        {!isApproving && (
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
                                                 <label>Title</label>
                                                 <input
                                                     style={{ width: '100%' }}
                                                     type="text"
                                                     name="title"
                                                     value={formData.title}
                                                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                     className="form-control form-control-user"
                                                     required
                                                 />
                                             </div>
                                             <div className="form-group mt-3">
                                                 <label>Description</label>
                                                 <input
                                                     style={{ width: '100%' }}
                                                     type="text"
                                                     name="description"
                                                     value={formData.description}
                                                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                     className="form-control form-control-user"
                                                     required
                                                 />
                                             </div>
                                             <div className="form-group mt-3">
                                                 <label>Identity</label>
                                                 <input
                                                     style={{ width: '100%' }}
                                                     type="text"
                                                     name="identity"
                                                     value={formData.identity}
                                                     onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
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
                                        )}
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
