import { useState, useEffect } from 'react';
import axios from 'axios';
import carImage from '../../assets/all-images/pexels-may-dayua-1545743.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth'; 
import Swal from 'sweetalert2';
import { Modal, Button } from 'antd'; 

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
    const [requestStatus, setRequestStatus] = useState('');
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequestStatus = async () => {
            try {
                const userId = user ? user.userId : null;
                if (!userId) return; // Exit if user ID is not available
                const response = await axios.get(`https://localhost:7228/api/User/check-approval/${userId}`);
                const status = response.data.isApproving;
                setRequestStatus(status);
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        };
    
        fetchRequestStatus();
    }, [user]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                title: 'You need to login before registering to be our partner!',
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
            console.log('Response:', response.data);
            sessionStorage.setItem('isApproving', true); // Store in sessionStorage
            setModalVisible(true); // Show success modal
            // Fetch the updated request status
            const statusResponse = await axios.get(`https://localhost:7228/api/User/check-approval/${userId}`);
            const status = statusResponse.data.isApproving;
            setRequestStatus(status);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data.errors) {
                const validationErrors = error.response.data.errors;
                console.log('Validation Errors:', validationErrors);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    let statusMessage;
    switch (requestStatus) {
        case 'Approved':
            statusMessage = "Request Approved!";
            break;
        case 'Pending':
            statusMessage = "Pending Approval!";
            break;
        case 'Rejected':
            statusMessage = "Request Rejected!";
            break;
        default:
            statusMessage = "Register to be our partner!";
    }

    const showForm = requestStatus !== 'Approved' && requestStatus !== 'Pending' && requestStatus !== 'Rejected';

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
                                                {statusMessage}
                                            </h1>
                                        </div>
                                        {showForm && (
                                            <form className="user" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label>Car Owner Name</label>
                                                    <input
                                                        style={{ width: '100%' }}
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
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
                                                        onChange={handleInputChange}
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
                                                        onChange={handleInputChange}
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
                                                        onChange={handleInputChange}
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
                                                        onChange={handleInputChange}
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
                                                        onChange={handleInputChange}
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
                                                        onChange={handleInputChange}
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
                                                        onChange={handleInputChange}
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
            <Modal
                title="Success"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button
                        key="ok"
                        type="primary"
                        onClick={() => setModalVisible(false)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
                    >
                        OK
                    </Button>
                ]}
            >
                <p>Your registration request has been submitted successfully.</p>
            </Modal>
        </div>
    );
};

export default OwnerPage;
