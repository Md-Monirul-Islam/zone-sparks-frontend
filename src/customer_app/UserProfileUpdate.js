import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../Variable';

const UserProfileUpdate = () => {
    const [profileData, setProfileData] = useState({
        full_name: '',
        phone: '',
        profile_image: null,
        email: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');  // `user_id` is stored in local storage
                const response = await axios.get(`${baseUrl}/user-profile/${user_id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfileData({
                    full_name: response.data.full_name || '',
                    phone: response.data.phone || '',
                    email: response.data.email || '',
                    profile_image: null,
                });
                setMessage('');  // Clear any previous messages
            } catch (error) {
                setError('Failed to load profile data.');
                console.error('Error loading profile data:', error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Log profile data for debugging
        console.log("Profile data:", profileData);
    
        const formData = new FormData();
        Object.keys(profileData).forEach((key) => {
            if (profileData[key] !== null) {
                formData.append(key, profileData[key]);
            }
        });
    
        try {
            const token = localStorage.getItem('token');
            console.log("Token:", token);  // Check if the token is valid
    
            const response = await axios.put(`${baseUrl}/update-user-profile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // Success message
            setMessage('Profile updated successfully!');
            setError('');
            console.log("Update response:", response.data); // Log response data
    
        } catch (error) {
            setMessage('');
            setError('Failed to update profile. Please try again.');
            console.error("Error updating profile:", error.response || error.message); // Log detailed error
        }
    };
    

    return (
        <div className="profile-container">
            <h2>Update Profile</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="full_name"
                        value={profileData.full_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        readOnly
                    />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input
                        type="file"
                        name="profile_image"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfileUpdate;
