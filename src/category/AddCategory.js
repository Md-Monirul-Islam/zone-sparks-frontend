// src/components/AddCategory.js
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../Variable';
import './AddCategory.css'; // Optional: Import your custom CSS file

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('description', description);
        if (categoryImage) {
            formData.append('category_image', categoryImage);
        }

        try {
            const response = await axios.post(`${baseUrl}/categories/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('Category added successfully!');
            setCategoryName('');
            setDescription('');
            setCategoryImage(null);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.name[0]); // Show specific error message
            } else {
                setError('An error occurred while adding the category.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        className="form-control"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryImage" className="form-label">Category Image:</label>
                    <input
                        type="file"
                        id="categoryImage"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setCategoryImage(e.target.files[0])}
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;