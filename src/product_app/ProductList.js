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

    // Fetch product list
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/products/`);
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products. Please try again.');
        }
    };

    // Handle delete product
    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await axios.delete(`${baseUrl}/products/${productId}/delete/`);
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
        <div className="container mt-3">
            <Sidenav />
            <div className="content">
                <div className="header">
                    <h2 className="text-center mb-4">Product List</h2>
                    <Link to="/add/product/" className="btn btn-primary add-product-button ms-4">
                        Add Product
                    </Link>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <table className="table table-bordered">
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
                                        <img src={product.product_image} alt={product.name} width="50" height="50" />
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
