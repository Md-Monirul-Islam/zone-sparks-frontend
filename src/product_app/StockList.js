import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../Variable';
import Sidenav from '../Sidenav';
import { Link, useNavigate } from 'react-router-dom';

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStocks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if no token
                return;
            }

            try {
                const response = await axios.get(`${baseUrl}/stocks/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStocks(response.data);
            } catch (error) {
                console.error("Error fetching stock data:", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect if token is invalid/expired
                }
            }
        };

        fetchStocks();
    }, [navigate]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const confirmed = window.confirm("Are you sure you want to delete this stock?");
        if (confirmed && token) {
            try {
                await axios.delete(`${baseUrl}/update-delete-stocks/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStocks(stocks.filter(stock => stock.id !== id));
            } catch (error) {
                console.error("Error deleting stock:", error);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/stock/${id}/`);
    };

    return (
        <div className="d-flex">
            <Sidenav />
            <div className="main-content">
                <h2 className="text-center my-4">Stock List</h2>
                <Link to="/add/stock/" className="btn btn-primary add-product-button mb-3">
                    Add Product
                </Link>
                <table className="table table-bordered table-striped text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map(stock => (
                            <tr key={stock.id}>
                                <td>{stock.product_name}</td>
                                <td>TK. {stock.product_price}</td>
                                <td>{stock.quantity}</td>
                                <td>
                                    <button 
                                        onClick={() => handleEdit(stock.id)} 
                                        className="btn btn-warning btn-sm mr-2">
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(stock.id)} 
                                        className="btn btn-danger btn-sm ms-2">
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

export default StockList;
