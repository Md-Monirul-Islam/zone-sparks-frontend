import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../Variable';
import Sidenav from '../Sidenav';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_image: null,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');  // Retrieve token from local storage or context
            const response = await axios.get(`${baseUrl}/categories/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setCategories(response.data);
        } catch (err) {
            setError('Failed to fetch categories. Please try again.');
        }
    };
    
    const deleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${baseUrl}/category/delete/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setSuccess('Category deleted successfully!');
                fetchCategories();
            } catch (err) {
                setError('Failed to delete category. Please try again.');
            }
        }
    };
    
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        if (formData.category_image) {
            form.append('category_image', formData.category_image);
        }
    
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${baseUrl}/category/update/${selectedCategory.id}/`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setSuccess('Category updated successfully!');
            setSelectedCategory(null);
            fetchCategories();
        } catch (err) {
            setError('Failed to update category. Please try again.');
        }
    };
    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const openUpdateForm = (category) => {
        setSelectedCategory(category);
        setFormData({
            name: category.name,
            description: category.description,
            category_image: null,
        });
    };

    return (
        <div className="d-flex">
            {/* Sidenav */}
            <div className="col-md-3 col-12">
                <Sidenav />
            </div>
            
            {/* Main Content */}
            <div className="col-md-9 col-12" style={{ paddingTop: 0 }}>
                <h2 className="text-center mt-3">Categories</h2>
                <button className="btn btn-primary mb-3">
                    <Link to="/add/category/" className="text-white text-decoration-none">
                        Add Category
                    </Link>
                </button>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    {category.category_image ? (
                                        <img src={category.category_image} alt={category.name} width="50" height="50" />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td className="d-flex">
                                    <button
                                        onClick={() => openUpdateForm(category)}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedCategory && (
                    <form onSubmit={handleUpdateSubmit} className="border p-4 rounded shadow mt-4">
                        <h4>Update Category</h4>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Category Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category_image" className="form-label">Category Image:</label>
                            <input
                                type="file"
                                id="category_image"
                                name="category_image"
                                className="form-control"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm">Update</button>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="btn btn-secondary ms-2 mt-3"
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CategoryList;
