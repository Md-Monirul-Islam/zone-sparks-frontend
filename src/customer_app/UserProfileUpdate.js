import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../Variable';
import './UserProfileUpdate.css';

const UserProfileUpdate = () => {
    const [profileData, setProfileData] = useState({
        full_name: '',
        phone: '',
        profile_image: null,
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseUrl}/update-user-profile/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfileData(response.data);
            } catch {
                setMessage('Failed to load profile data.');
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
        const formData = new FormData();
        Object.keys(profileData).forEach((key) => {
            if (profileData[key] !== null) {
                formData.append(key, profileData[key]);
            }
        });

        try {
            const token = localStorage.getItem('token');
            await axios.put(`${baseUrl}/update-user-profile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div className="profile-container">
            <h2>Update Profile</h2>
            {message && <p>{message}</p>}
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
