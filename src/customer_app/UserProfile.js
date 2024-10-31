import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { baseUrl } from '../Variable';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const apiUrl = `http://127.0.0.1:8000/api/user-profile/${userId}/`;

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!userId || !token) {
                setError("User ID or token not found in local storage.");
                return;
            }

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError("Failed to load profile. Please try again later.");
            }
        };
        fetchUserProfile();
    }, [userId, token, apiUrl]);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!profile) {
        return <p className="loading-message">Loading...</p>;
    }

    return (
        <div className="user-profile-container">
            <div className="profile-card">
                <div className="profile-image-container">
                    <img
                        src={profile.profile_image ? `http://127.0.0.1:8000${profile.profile_image}` : 'default-avatar.png'}
                        alt={profile.full_name}
                        className="profile-image"
                    />
                </div>
                <h2 className="profile-name">{profile.full_name}</h2>
                <p className="profile-info"><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
                <p className="profile-info"><strong>Email:</strong> {profile.email}</p>
            </div>
        </div>
    );
};

export default UserProfile;
