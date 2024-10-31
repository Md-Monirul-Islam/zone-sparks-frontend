import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { baseUrl } from '../Variable';
import Sidenav from '../Sidenav';

const Dashboard = () => {
    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch product count
                const productResponse = await axios.get(`${baseUrl}/product-count/`);
                // Fetch category count
                const categoryResponse = await axios.get(`${baseUrl}/category-count/`);
                
                // Set state with the fetched data
                setProductCount(productResponse.data.product);
                setCategoryCount(categoryResponse.data.count);
            } catch (err) {
                console.error("Error fetching data:", err); // Log the error for debugging
                setError('Failed to fetch counts. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div>
        <Sidenav />
            <div className="dashboard-container">
            <div className="card bg-warning">
                <h3>Total Products</h3>
                <div className="count text-black">
                    <Link to={'/product/list/'}>
                        <div className='text-black text-decoration-none'>{productCount}</div>
                    </Link>
                </div>
            </div>
            <div className="card bg-success">
                <h3>Total Categories</h3>
                <div className="count text-black">
                    <Link to='/categories/'>
                        <div className='text-black text-decoration-none'>{categoryCount}</div>
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
