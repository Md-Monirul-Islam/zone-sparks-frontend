import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { baseUrl } from '../Variable';
import Sidenav from '../Sidenav';
import './EditStock.css';

const EditStock = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stock, setStock] = useState({
        product_name: '',
        product_price: '',
        quantity: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStock = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login/');
                return;
            }

            try {
                const response = await axios.get(`${baseUrl}/update-delete-stocks/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStock(response.data);
            } catch (error) {
                console.error("Error fetching stock data:", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login/');
                }
            }
        };

        fetchStock();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStock((prevStock) => ({
            ...prevStock,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login/');
            return;
        }

        try {
            await axios.put(`${baseUrl}/update-delete-stocks/${id}/`, stock, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/stock-list/');
        } catch (error) {
            console.error("Error updating stock data:", error);
            setError("Failed to update stock data. Please try again.");
        }
    };

    return (
        <div className="edit-stock-layout">
            <Sidenav />
            <div className="edit-stock-container">
                <h2 className="text-center my-4">Edit Stock</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="form-group edit-stock-form">
                    <div className="mb-3">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="product_name"
                            value={stock.product_name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Product Price (TK)</label>
                        <input
                            type="number"
                            name="product_price"
                            value={stock.product_price}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={stock.quantity}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update Stock
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/stock/list/')}
                        className="btn btn-secondary ms-3"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditStock;
