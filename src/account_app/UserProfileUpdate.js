import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../Variable'; 

const UserProfileUpdate = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        profile_image: null,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Check if user is authenticated
    const isAuthenticated = () => {
        return localStorage.getItem('token') !== null;
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!isAuthenticated()) {
                setError('You are not authorized to view this page.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${baseUrl}/user/profile/update/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setFormData({
                    full_name: response.data.full_name,
                    phone: response.data.phone,
                    profile_image: response.data.profile_image,
                });
            } catch (err) {
                setError('Failed to fetch user profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('full_name', formData.full_name);
        form.append('phone', formData.phone);
        if (formData.profile_image) {
            form.append('profile_image', formData.profile_image);
        }

        try {
            await axios.put(`${baseUrl}/user/profile/update/`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Profile updated successfully');
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Profile Image</label>
                    <input
                        type="file"
                        name="profile_image"
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UserProfileUpdate;
