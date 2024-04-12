import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth'; // Import the useAuth hook

const CustomNavLinks = () => {
    const { user } = useAuth(); // Get user information from context

    // Function to get user role based on role code
    const getUserRole = (role) => {
        switch (role) {
            case 0:
                return 'Admin';
            case 1:
                return 'User';
            case 2:
                return 'Owner';
            default:
                return 'Unknown';
        }
    };

    // Check if the user is an owner
    const isOwner = user && getUserRole(user.role) === 'Owner';

    return (
        <nav className="nav nav-borders">
            <NavLink exact to={`/profile/${user.userId}`} className="nav-link">
                Profile
            </NavLink>
            <NavLink to="/rented-car" className="nav-link">
                Car have been rented
            </NavLink>
            <NavLink to="/favorite-list" className="nav-link">
                Favorite List
            </NavLink>
            {/* Conditional rendering for owner */}
            {isOwner && (
                <NavLink to="/vehicle-post" className="nav-link">
                    Vehicle Post
                </NavLink>
            )}
        </nav>
    );
};

export default CustomNavLinks;
