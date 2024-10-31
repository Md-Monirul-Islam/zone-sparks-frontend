import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidenav.css';

const Sidenav = () => {
    const location = useLocation();
    return (
        <div className="sidenav mt-5">
            <ul className="list-unstyled">
                <li>
                    <Link
                        to="/dashboard/"
                        className={`list-group-item list-group-item-action ${location.pathname === '/dashboard/' ? 'active' : ''}`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/categories/"
                        className={`list-group-item list-group-item-action ${location.pathname === '/categories/' ? 'active' : ''}`}
                    >
                        Categories
                    </Link>
                </li>
                <li>
                    <Link
                        to="/product/list/"
                        className={`list-group-item list-group-item-action ${location.pathname === '/product/list/' ? 'active' : ''}`}
                    >
                        Products
                    </Link>
                </li>
                <li>
                    <Link
                        to="/add/stock/"
                        className={`list-group-item list-group-item-action ${location.pathname === '/add/stock/' ? 'active' : ''}`}
                    >
                        Stock
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidenav;
