// src/components/CategoryList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../Variable';
import { Link } from 'react-router-dom';
import Sidenav from '../Sidenav';


const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${baseUrl}/categories/`);
            setCategories(response.data);
        } catch (err) {
            setError('Failed to fetch categories. Please try again.');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                {/* Sidenav Column */}
                <div className="col-md-3">
                    <Sidenav />
                </div>

                {/* Categories Column */}
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Categories</h2>
                    <Link to="/add/category/" className="btn btn-primary mb-3">Add Category</Link>
                    {error && <p className="text-danger">{error}</p>}
                    {categories.length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            {category.category_image ? (
                                                <img
                                                    src={category.category_image}
                                                    alt={category.name}
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            ) : (
                                                'No Image'
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center">No categories found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
