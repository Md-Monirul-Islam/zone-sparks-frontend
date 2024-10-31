import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { baseUrl } from '../Variable';

const HomePage = ({ updateCartCount }) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/products-show-in-hoem-page/`);
                setProducts(response.data);
            } catch (err) {
                setError('Failed to load products.');
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        let updatedCartItems;
        if (cartItems.some(item => item.id === product.id)) {
            // Remove item from cart
            updatedCartItems = cartItems.filter(item => item.id !== product.id);
        } else {
            // Add item to cart
            updatedCartItems = [...cartItems, { id: product.id, name: product.name }];
        }
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        updateCartCount(updatedCartItems.length);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">All Products</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-3 mb-4">
                        <ProductCard
                            product={product}
                            isInCart={cartItems.some(item => item.id === product.id)}
                            handleAddToCart={() => handleAddToCart(product)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
