import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../Variable';
import Sidenav from '../Sidenav';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        product_image: null,
    });
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            await fetchProduct();
            await fetchCategories();
            setLoading(false);
        };
        fetchData();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${baseUrl}/products/${productId}/`);
            setFormData({
                name: response.data.name,
                description: response.data.description,
                price: response.data.price,
                category: response.data.category,
                product_image: response.data.product_image,
            });
        } catch (err) {
            setError('Failed to fetch product details. Please try again.');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${baseUrl}/categories/`);
            setCategories(response.data);
        } catch (err) {
            setError('Failed to fetch categories. Please try again.');
        }
    };

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
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('price', formData.price);
        form.append('category', formData.category);
        if (formData.product_image && typeof formData.product_image === 'object') {
            form.append('product_image', formData.product_image);
        }

        try {
            await axios.put(`${baseUrl}/products/${productId}/`, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Product updated successfully');
            navigate('/product/list/');
        } catch (err) {
            setError('Failed to update product. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>; // Loading state handling

    return (
        <div><br></br><br></br>
            <Sidenav />
            <div className="container mt-5">
            <h2>Edit Product</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="form-group mb-3">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-control"
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
                    <label>Product Image</label>
                    {formData.product_image && (
                        <img
                            src={formData.product_image}
                            alt="Current Product"
                            style={{ width: '100px', height: 'auto' }}
                        />
                    )}
                    <input
                        type="file"
                        name="product_image"
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Product
                </button>
            </form>
        </div><br></br>
        </div>
    );
};

export default EditProduct;
