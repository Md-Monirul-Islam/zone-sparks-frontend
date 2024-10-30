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

    // Fetch categories for the dropdown menu
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${baseUrl}/categories/`);
                setCategories(response.data);
            } catch (err) {
                setError('Failed to fetch categories. Please try again.');
            }
        };
        fetchCategories();
    }, []);

    // Handle form field changes
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
            await axios.post(`${baseUrl}/products/`, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccess('Product added successfully!');
            navigate('/product/list/');
        } catch (err) {
            setError('Failed to add product. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <Sidenav />
            <h2 className="text-center mb-4">Add New Product</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name:</label>
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
                    <label htmlFor="price" className="form-label">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <select
                        id="category"
                        name="category"
                        className="form-control"
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
                <div className="mb-3">
                    <label htmlFor="product_image" className="form-label">Product Image:</label>
                    <input
                        type="file"
                        id="product_image"
                        name="product_image"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
