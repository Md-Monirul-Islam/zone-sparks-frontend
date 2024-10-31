import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Variable';
import Sidenav from '../Sidenav';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        product_image: null,
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Fetch categories for the dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
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
        fetchCategories();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('price', formData.price);
        form.append('category', formData.category);
        if (formData.product_image) {
            form.append('product_image', formData.product_image);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${baseUrl}/products/`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setSuccess('Product added successfully!');
            setError('');
            navigate('/product/list/');
        } catch (err) {
            setError('Failed to add product. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="container-fluid">
            <Sidenav />
            <div className="main-content">
                <h2 className="text-center mb-4">Add New Product</h2>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                    <div className="form-group mb-3">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="category">Category</label>
                        <select
                            className="form-control"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="product_image">Product Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="product_image"
                            name="product_image"
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
