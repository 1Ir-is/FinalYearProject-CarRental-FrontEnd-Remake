import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';

const PostListPage = () => {
    // const [posts, setPosts] = useState([]);
    // const [isApproved, setIsApproved] = useState(false);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get('https://your-api-url/posts');
    //             setPosts(response.data);
    //         } catch (error) {
    //             console.error('Error fetching posts:', error);
    //         }
    //     };

    //     const checkApprovalStatus = async () => {
    //         try {
    //             const response = await axios.get('https://your-api-url/check-approval');
    //             setIsApproved(response.data.isApproved);
    //         } catch (error) {
    //             console.error('Error checking approval status:', error);
    //         }
    //     };

    //     fetchPosts();
    //     checkApprovalStatus();
    // }, []);

    return (
        <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
            {/* Account page navigation */}
            <CustomNavLinks />
            <hr className="mt-0 mb-4" />

            <a href="/create-post" className="btn btn-info h3 mb-2">Create New Post</a>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Post List</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered display nowrap" id="dataTable" cellSpacing="0" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>No. of Renters</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Address</th>
                                    <th>Price</th>
                                    <th>Vehicle Type</th>
                                    <th>Rating</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div>
                                                <a className="btn btn-success mb-3">Edit</a>
                                                {/* <a href={`/edit-post/${post.Id}`} className="btn btn-success mb-3">Edit</a> */}
                                            </div>
                                            <div>
                                                <a className="btn btn-success">Registrations</a>
                                                {/* <a href={`/post-vehicles/registrations/${post.Id}`} className="btn btn-success">Registrations</a> */}
                                            </div>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostListPage;
