import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../Variable';
import Sidenav from '../Sidenav';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch product list with authentication
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const response = await axios.get(`${baseUrl}/products/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products. Please try again.');
        }
    };

    // Handle delete product with authentication
    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${baseUrl}/products/${productId}/delete/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setProducts(products.filter(product => product.id !== productId));
                alert('Product deleted successfully');
            } catch (err) {
                setError('Failed to delete product. Please try again.');
            }
        }
    };

    // Redirect to edit page
    const handleEdit = (productId) => {
        navigate(`/edit/product/${productId}`);
    };

    return (
        <div className="container-fluid">
            <Sidenav />
            <div className="main-content">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Product List</h2>
                    <Link to="/add/product/" className="btn btn-primary add-product-button">
                        Add Product
                    </Link>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>TK. {product.price}</td>
                                <td>
                                    {product.product_image ? (
                                        <img src={product.product_image} alt={product.name} className="product-image" />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td className="d-flex">
                                    <button
                                        onClick={() => handleEdit(product.id)}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
