// src/Sidenav.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidenav = () => {
    return (
        <div className="sidenav">
            <h4>Navigation</h4>
            <ul className="list-unstyled">
                <li>
                    <Link to="/categories">Categories</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                {/* Add other links as needed */}
            </ul>
        </div>
    );
};

export default Sidenav;
